import { useState } from 'react'
import { Button, CircularProgress, Stack, Typography } from '@mui/material'
import GoogleIcon from '@mui/icons-material/Google'
import LogoutIcon from '@mui/icons-material/Logout'
import { signInWithPopup, signOut, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase'
import { useAuthState } from '../hooks/useAuthState'

export const SignInButton = () => {
  const [user, loading] = useAuthState()
  const [isSigningIn, setIsSigningIn] = useState(false)

  const handleSignIn = async () => {
    setIsSigningIn(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (loading) {
    return <CircularProgress />
  }

  if (user) {
    return (
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography variant="body1">
          Hello, {user.displayName || 'User'}!
        </Typography>
        <Button
          variant="outlined"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Stack>
    )
  }

  return (
    <Button
      variant="contained"
      color="primary"
      size="large"
      startIcon={isSigningIn ? <CircularProgress size={20} /> : <GoogleIcon />}
      onClick={handleSignIn}
      disabled={isSigningIn}
    >
      {isSigningIn ? 'Signing in...' : 'Sign in with Google'}
    </Button>
  )
}
