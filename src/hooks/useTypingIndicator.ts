import { useState, useEffect } from 'react'
import { subscribeToTyping } from '../services/typing'
import { useAuthState } from './useAuthState'

export const useTypingIndicator = (roomId: string | undefined): string[] => {
  const [user] = useAuthState()
  const [typingUsers, setTypingUsers] = useState<string[]>([])

  useEffect(() => {
    if (!roomId) {
      setTypingUsers([])
      return
    }

    const unsubscribe = subscribeToTyping(roomId, (typingData) => {
      const typing = Object.entries(typingData)
        .filter(([uid, isTyping]) => isTyping && uid !== user?.uid)
        .map(([uid]) => uid)

      setTypingUsers(typing)
    })

    return unsubscribe
  }, [roomId, user?.uid])

  return typingUsers
}
