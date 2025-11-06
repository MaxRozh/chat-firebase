import { useEffect, useRef, useCallback } from 'react'
import { setTypingStatus } from '../services/typing'
import { useAuthState } from './useAuthState'

const TYPING_DEBOUNCE_MS = 800

export const useTyping = (roomId: string | undefined) => {
  const [user] = useAuthState()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isTypingRef = useRef(false)

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
      if (user && roomId && isTypingRef.current) {
        setTypingStatus(roomId, user.uid, false).catch(console.error)
      }
    }
  }, [user, roomId])

  const setTyping = useCallback(() => {
    if (!user || !roomId) return

    if (!isTypingRef.current) {
      isTypingRef.current = true
      setTypingStatus(roomId, user.uid, true).catch(console.error)
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      isTypingRef.current = false
      if (user && roomId) {
        setTypingStatus(roomId, user.uid, false).catch(console.error)
      }
    }, TYPING_DEBOUNCE_MS)
  }, [user, roomId])

  return setTyping
}
