import { ref, set, onValue, off } from 'firebase/database'
import { rtdb } from '../firebase'

export const setTypingStatus = async (
  roomId: string,
  uid: string,
  isTyping: boolean,
): Promise<void> => {
  const typingRef = ref(rtdb, `typing/${roomId}/${uid}`)
  await set(typingRef, isTyping)
}

export const subscribeToTyping = (
  roomId: string,
  callback: (typingUsers: Record<string, boolean>) => void,
): (() => void) => {
  const typingRef = ref(rtdb, `typing/${roomId}`)

  const listener = onValue(typingRef, (snapshot) => {
    const data = snapshot.val() || {}
    callback(data)
  })

  return () => {
    off(typingRef, 'value', listener)
  }
}
