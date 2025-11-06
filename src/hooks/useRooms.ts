import { useState, useEffect } from 'react'
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from 'firebase/firestore'
import { db } from '../firebase'
import { Room } from '../types'

export const useRooms = (uid: string | undefined): [Room[], boolean] => {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!uid) {
      setRooms([])
      setLoading(false)
      return
    }

    const roomsRef = collection(db, 'rooms')
    const q = query(
      roomsRef,
      where('participants', 'array-contains', uid),
      orderBy('updatedAt', 'desc'),
    )

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const roomsData: Room[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Room[]

        setRooms(roomsData)
        setLoading(false)
      },
      (error) => {
        console.error('Error fetching rooms:', error)
        setLoading(false)
      },
    )

    return () => unsubscribe()
  }, [uid])

  return [rooms, loading]
}
