import { Box, Typography, Paper, Stack } from '@mui/material'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        p: 3,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 6,
          textAlign: 'center',
          bgcolor: 'background.default',
        }}
      >
        <Stack spacing={3} alignItems="center">
          <ChatBubbleOutlineIcon
            sx={{ fontSize: 80, color: 'text.secondary' }}
          />
          <Typography variant="h5" color="text.secondary">
            Select a room to start chatting
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Choose a room from the sidebar to view and send messages
          </Typography>
        </Stack>
      </Paper>
    </Box>
  )
}
