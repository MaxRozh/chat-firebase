import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import AddIcon from '@mui/icons-material/Add'
import { Room } from '../types'
import { useRooms } from '../hooks/useRooms'
import { useAuthState } from '../hooks/useAuthState'
import { CreateRoomDialog } from './CreateRoomDialog'

export const RoomList = () => {
  const [user] = useAuthState()
  const [rooms, loading] = useRooms(user?.uid)
  const navigate = useNavigate()
  const { roomId } = useParams()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleRoomClick = (room: Room) => {
    navigate(`/r/${room.id}`)
  }

  return (
    <Box>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          Rooms
        </Typography>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={() => setDialogOpen(true)}
          disabled={loading}
        >
          New
        </Button>
      </Box>
      <Divider />
      {loading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            p: 4,
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {!loading && rooms.length === 0 && (
        <Box sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            No rooms yet. Create one to get started!
          </Typography>
        </Box>
      )}
      {!loading && rooms.length > 0 && (
        <List sx={{ p: 0 }}>
          {rooms.map((room) => (
            <ListItemButton
              key={room.id}
              selected={roomId === room.id}
              onClick={() => handleRoomClick(room)}
              sx={{
                borderLeft: roomId === room.id ? 3 : 0,
                borderColor: 'primary.main',
              }}
            >
              <ListItemIcon>
                <ChatIcon />
              </ListItemIcon>
              <ListItemText
                primary={room.name}
                secondary={room.lastMessage || room.description}
                primaryTypographyProps={{
                  fontWeight: roomId === room.id ? 'bold' : 'normal',
                }}
                secondaryTypographyProps={{
                  noWrap: true,
                }}
              />
            </ListItemButton>
          ))}
        </List>
      )}

      <CreateRoomDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </Box>
  )
}
