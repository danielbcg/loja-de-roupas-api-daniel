import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Auth from './pages/Auth'
import Catalogo from './pages/Catalogo'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <Catalogo />
            </>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App