import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'
import { MessageList } from '../components/MessageList'
import { MessageComposer } from '../components/MessageComposer'
import { useMessages } from '../hooks/useMessages'

export const ChatRoom = () => {
  const { roomId } = useParams()
  const [messages, loading] = useMessages(roomId)

  if (!roomId) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <MessageList messages={messages} loading={loading} />
      <MessageComposer roomId={roomId} />
    </Box>
  )
}
