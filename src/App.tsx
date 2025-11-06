import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import { SnackbarProvider } from './contexts/SnackbarContext'
import { AuthGate } from './components/AuthGate'
import { ChatLayout } from './components/ChatLayout'
import { Home } from './pages/Home'
import { ChatRoom } from './pages/ChatRoom'

function App() {
  return (
    <ErrorBoundary>
      <SnackbarProvider>
        <BrowserRouter>
          <AuthGate>
            <Routes>
              <Route path="/" element={<ChatLayout />}>
                <Route index element={<Home />} />
                <Route path="r/:roomId" element={<ChatRoom />} />
              </Route>
            </Routes>
          </AuthGate>
        </BrowserRouter>
      </SnackbarProvider>
    </ErrorBoundary>
  )
}

export default App
