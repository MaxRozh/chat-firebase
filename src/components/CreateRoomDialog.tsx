import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from '@mui/material'
import { createRoom } from '../services/firestore'
import { useAuthState } from '../hooks/useAuthState'

interface CreateRoomDialogProps {
  open: boolean
  onClose: () => void
}

export const CreateRoomDialog = ({ open, onClose }: CreateRoomDialogProps) => {
  const [user] = useAuthState()
  const [roomName, setRoomName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    const trimmedName = roomName.trim()
    if (!trimmedName) {
      setError('Room name is required')
      return
    }

    if (!user) return

    setLoading(true)
    setError('')

    try {
      await createRoom(
        {
          name: trimmedName,
          description: description.trim() || undefined,
        },
        user.uid,
      )

      setRoomName('')
      setDescription('')
      onClose()
    } catch (err) {
      console.error('Error creating room:', err)
      setError('Failed to create room. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setRoomName('')
      setDescription('')
      setError('')
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Room</DialogTitle>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            error={!!error}
            helperText={error}
            fullWidth
            autoFocus
            disabled={loading}
            inputProps={{ maxLength: 100 }}
          />
          <TextField
            label="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
            disabled={loading}
            inputProps={{ maxLength: 200 }}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={loading || !roomName.trim()}
        >
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
