import { useEffect, useRef } from 'react'
import { Box, Paper, Typography, Avatar, Stack, Skeleton } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import { Message } from '../types'
import { useAuthState } from '../hooks/useAuthState'

interface MessageListProps {
  messages: Message[]
  loading: boolean
}

const shouldGroupMessages = (
  currentMsg: Message,
  prevMsg: Message | null,
): boolean => {
  if (!prevMsg) return false
  if (currentMsg.uid !== prevMsg.uid) return false

  if (currentMsg.createdAt && prevMsg.createdAt) {
    const currentTime = currentMsg.createdAt.seconds * 1000
    const prevTime = prevMsg.createdAt.seconds * 1000
    const timeDiff = currentTime - prevTime
    return timeDiff < 3 * 60 * 1000 // 3 minutes in milliseconds
  }

  return false
}

export const MessageList = ({ messages, loading }: MessageListProps) => {
  const [user] = useAuthState()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (loading) {
    return (
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start',
            }}
          >
            <Stack
              direction={i % 2 === 0 ? 'row-reverse' : 'row'}
              spacing={1}
              sx={{ maxWidth: '70%' }}
            >
              <Skeleton variant="circular" width={36} height={36} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant="rounded" height={60} width={200} />
              </Box>
            </Stack>
          </Box>
        ))}
      </Box>
    )
  }

  if (messages.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 2,
          p: 4,
        }}
      >
        <ChatBubbleOutlineIcon sx={{ fontSize: 80, color: 'text.disabled' }} />
        <Typography variant="h6" color="text.secondary">
          No messages yet
        </Typography>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Be the first to break the ice! Send a message to start the
          conversation.
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 0.5,
      }}
    >
      {messages.map((message, index) => {
        const isOwnMessage = message.uid === user?.uid
        const prevMessage = index > 0 ? messages[index - 1] : null
        const isGrouped = shouldGroupMessages(message, prevMessage)
        const isFirstInGroup = !isGrouped

        const timestamp = message.createdAt
          ? new Date(message.createdAt.seconds * 1000).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })
          : ''

        return (
          <Box
            key={message.id}
            sx={{
              display: 'flex',
              justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
              mb: isFirstInGroup ? 1 : 0,
            }}
          >
            <Stack
              direction={isOwnMessage ? 'row-reverse' : 'row'}
              spacing={1}
              sx={{
                maxWidth: '70%',
                alignItems: 'flex-end',
              }}
            >
              {isFirstInGroup ? (
                <Avatar
                  src={message.photoURL || undefined}
                  alt={message.displayName}
                  sx={{ width: 32, height: 32 }}
                />
              ) : (
                <Box sx={{ width: 32 }} /> // Spacer to maintain alignment
              )}
              <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                {!isOwnMessage && isFirstInGroup && (
                  <Typography
                    variant="caption"
                    sx={{
                      ml: 1,
                      mb: 0.5,
                      fontWeight: 600,
                      color: 'text.secondary',
                    }}
                  >
                    {message.displayName}
                  </Typography>
                )}
                <Paper
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 1,
                    bgcolor: isOwnMessage ? 'primary.main' : 'grey.100',
                    color: isOwnMessage
                      ? 'primary.contrastText'
                      : 'text.primary',
                    borderRadius: isOwnMessage
                      ? '16px 16px 4px 16px'
                      : '16px 16px 16px 4px',
                    maxWidth: '100%',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                      fontSize: '0.95rem',
                    }}
                  >
                    {message.text}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: 'block',
                      mt: 0.5,
                      opacity: 0.7,
                      fontSize: '0.65rem',
                      textAlign: isOwnMessage ? 'right' : 'left',
                    }}
                  >
                    {timestamp}
                  </Typography>
                </Paper>
              </Box>
            </Stack>
          </Box>
        )
      })}
      <div ref={messagesEndRef} />
    </Box>
  )
}
