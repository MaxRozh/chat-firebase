import { useState, KeyboardEvent } from 'react'
import { Box, TextField, IconButton, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { sendMessage } from '../services/firestore'
import { useAuthState } from '../hooks/useAuthState'
import { useTyping } from '../hooks/useTyping'
import { useTypingIndicator } from '../hooks/useTypingIndicator'

interface MessageComposerProps {
  roomId: string
}

const MAX_MESSAGE_LENGTH = 500

export const MessageComposer = ({ roomId }: MessageComposerProps) => {
  const [user] = useAuthState()
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const setTyping = useTyping(roomId)
  const typingUsers = useTypingIndicator(roomId)

  const handleSend = async () => {
    if (!user) return

    const trimmedText = text.trim()
    if (!trimmedText) {
      setError('Message cannot be empty')
      return
    }

    if (trimmedText.length > MAX_MESSAGE_LENGTH) {
      setError(`Message is too long (max ${MAX_MESSAGE_LENGTH} characters)`)
      return
    }

    setSending(true)
    setError('')

    try {
      await sendMessage({ roomId, text: trimmedText }, user)
      setText('') // Clear input on success
    } catch (err) {
      console.error('Error sending message:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const charCount = text.length
  const isOverLimit = charCount > MAX_MESSAGE_LENGTH
  const isEmpty = !text.trim()

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
    setTyping()
  }

  return (
    <Box
      sx={{
        p: 2,
        borderTop: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      {typingUsers.length > 0 && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 1, display: 'block', fontStyle: 'italic' }}
        >
          {typingUsers.length === 1
            ? 'Someone is typing...'
            : `${typingUsers.length} people are typing...`}
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Type a message..."
          value={text}
          onChange={handleTextChange}
          onKeyDown={handleKeyPress}
          disabled={sending}
          error={!!error || isOverLimit}
          helperText={
            error || (
              <Box
                component="span"
                sx={{ color: isOverLimit ? 'error.main' : 'text.secondary' }}
              >
                {charCount}/{MAX_MESSAGE_LENGTH}
              </Box>
            )
          }
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          color="primary"
          onClick={handleSend}
          disabled={sending || isEmpty || isOverLimit}
          size="large"
        >
          <SendIcon />
        </IconButton>
      </Box>
      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}
