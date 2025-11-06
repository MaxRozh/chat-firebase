import { ReactNode, useEffect, useState } from 'react'
import {
  Container,
  Box,
  Paper,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material'
import ChatIcon from '@mui/icons-material/Chat'
import { useAuthState } from '../hooks/useAuthState'
import { SignInButton } from './SignInButton'
import { initializeNewUser } from '../services/firestore'
import { initializePresence, cleanupPresence } from '../services/presence'

interface AuthGateProps {
  children: ReactNode
}

export const AuthGate = ({ children }: AuthGateProps) => {
  const [user, loading] = useAuthState()
  const [initializing, setInitializing] = useState(false)

  useEffect(() => {
    if (user && !loading) {
      setInitializing(true)

      Promise.all([initializeNewUser(user), initializePresence(user)])
        .then(() => {
          console.log('User initialized successfully')
        })
        .catch((error) => {
          console.error('Error initializing user:', error)
        })
        .finally(() => {
          setInitializing(false)
        })
    }

    return () => {
      if (user) {
        cleanupPresence(user.uid).catch((error) => {
          console.error('Error cleaning up presence:', error)
        })
      }
    }
  }, [user, loading])

  if (loading || initializing) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    )
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Paper elevation={3} sx={{ p: 6, textAlign: 'center' }}>
            <Stack spacing={4} alignItems="center">
              <ChatIcon color="primary" sx={{ fontSize: 80 }} />
              <Typography variant="h3" component="h1" color="primary">
                Firebase Chat
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Sign in to start chatting with others
              </Typography>
              <SignInButton />
            </Stack>
          </Paper>
        </Box>
      </Container>
    )
  }

  return <>{children}</>
}
