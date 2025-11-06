import { Timestamp } from 'firebase/firestore'

export interface UserDoc {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
  createdAt: Timestamp
  lastSeen: Timestamp
}

export interface Room {
  id: string
  name: string
  description?: string
  participants: string[]
  createdBy: string
  createdAt: Timestamp
  updatedAt: Timestamp
  lastMessageAt?: Timestamp
  lastMessage?: string
}

export interface Message {
  id: string
  roomId: string
  uid: string
  displayName: string
  photoURL: string | null
  text: string
  createdAt: Timestamp
  edited?: boolean
  editedAt?: Timestamp
}

export interface MessageInput {
  text: string
  roomId: string
}

export interface RoomInput {
  name: string
  description?: string
}
