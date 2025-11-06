import { useState, useEffect } from 'react'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Message } from '../types'

export const useMessages = (
  roomId: string | undefined,
): [Message[], boolean] => {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!roomId) {
      setMessages([])
      setLoading(false)
      return
    }

    const messagesRef = collection(db, 'rooms', roomId, 'messages')
    const q = query(messagesRef, orderBy('createdAt', 'asc'), limit(100))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const messagesData: Message[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Message[]

        setMessages(messagesData)
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching messages:', error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [roomId])

  return [messages, loading]
}
