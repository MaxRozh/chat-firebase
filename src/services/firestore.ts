import {
  collection,
  doc,
  setDoc,
  getDoc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  updateDoc,
  FieldValue,
} from 'firebase/firestore'
import { User } from 'firebase/auth'
import { db } from '../firebase'
import { UserDoc, Room, RoomInput, Message, MessageInput } from '../types'

export const createOrUpdateUser = async (user: User): Promise<void> => {
  const userRef = doc(db, 'users', user.uid)
  const userSnap = await getDoc(userRef)

  if (!userSnap.exists()) {
    const userData: Omit<UserDoc, 'createdAt' | 'lastSeen'> = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    }

    await setDoc(userRef, {
      ...userData,
      createdAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
    })
  } else {
    await updateDoc(userRef, {
      lastSeen: serverTimestamp(),
    })
  }
}

export const getUserRoomsCount = async (uid: string): Promise<number> => {
  const roomsRef = collection(db, 'rooms')
  const q = query(roomsRef, where('participants', 'array-contains', uid))
  const snapshot = await getDocs(q)
  return snapshot.size
}

export const createRoom = async (
  roomData: RoomInput,
  creatorUid: string,
): Promise<string> => {
  const roomsRef = collection(db, 'rooms')

  const newRoom: Omit<Room, 'id' | 'createdAt' | 'updatedAt'> & {
    createdAt: FieldValue
    updatedAt: FieldValue
  } = {
    name: roomData.name,
    description: roomData.description,
    participants: [creatorUid],
    createdBy: creatorUid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  }

  const docRef = await addDoc(roomsRef, newRoom)
  return docRef.id
}

export const createDefaultRoom = async (uid: string): Promise<string> => {
  return createRoom(
    {
      name: 'General',
      description: 'Welcome to the general chat room!',
    },
    uid,
  )
}

export const initializeNewUser = async (user: User): Promise<void> => {
  await createOrUpdateUser(user)

  const roomCount = await getUserRoomsCount(user.uid)

  if (roomCount === 0) {
    await createDefaultRoom(user.uid)
  }
}

export const sendMessage = async (
  messageInput: MessageInput,
  user: User,
): Promise<string> => {
  const { roomId, text } = messageInput
  const trimmedText = text.trim()

  if (!trimmedText) {
    throw new Error('Message cannot be empty')
  }
  if (trimmedText.length > 500) {
    throw new Error('Message is too long (max 500 characters)')
  }

  const messagesRef = collection(db, 'rooms', roomId, 'messages')
  const newMessage: Omit<Message, 'id' | 'createdAt'> & {
    createdAt: FieldValue
  } = {
    roomId,
    uid: user.uid,
    displayName: user.displayName || 'Anonymous',
    photoURL: user.photoURL,
    text: trimmedText,
    createdAt: serverTimestamp(),
  }

  const docRef = await addDoc(messagesRef, newMessage)
  const roomRef = doc(db, 'rooms', roomId)

  await updateDoc(roomRef, {
    lastMessage: trimmedText,
    lastMessageAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })

  return docRef.id
}
