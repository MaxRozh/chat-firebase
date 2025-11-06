import {
  ref,
  onDisconnect,
  set,
  serverTimestamp,
  onValue,
} from 'firebase/database'
import { User } from 'firebase/auth'
import { rtdb } from '../firebase'

export const initializePresence = async (user: User): Promise<void> => {
  const userStatusRef = ref(rtdb, `presence/${user.uid}`)

  await set(userStatusRef, {
    online: true,
    lastSeen: serverTimestamp(),
  })

  await onDisconnect(userStatusRef).set({
    online: false,
    lastSeen: serverTimestamp(),
  })
}

export const cleanupPresence = async (uid: string): Promise<void> => {
  const userStatusRef = ref(rtdb, `presence/${uid}`)
  await set(userStatusRef, {
    online: false,
    lastSeen: serverTimestamp(),
  })
}

export const subscribeToPresence = (
  uid: string,
  callback: (isOnline: boolean) => void,
): (() => void) => {
  const userStatusRef = ref(rtdb, `presence/${uid}`)

  const unsubscribe = onValue(userStatusRef, (snapshot) => {
    const data = snapshot.val()
    callback(data?.online ?? false)
  })

  return unsubscribe
}
