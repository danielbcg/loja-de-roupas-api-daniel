import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Auth from './pages/Auth'
import Catalogo from './pages/Catalogo'
import Produto from './pages/Produto'
import Carrinho from './pages/Carrinho'
import Pedido from './pages/Pedido'
import Pedidos from './pages/Pedidos'

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
        <Route
          path="/produtos/:id"
          element={
            <>
              <Header />
              <Produto />
            </>
          }
        />
        <Route
         path="/carrinho"
         element={
          <>
            <Header />
            <Carrinho />
          </>
         }
        />
        <Route
          path="/pedidos"
          element={
            <>
              <Header />
              <Pedidos />
            </>
          }
        />
        <Route
          path="/pedidos/:id"
          element={
            <>
              <Header />
              <Pedido />
            </>
          }
        />
      </Routes>
    </AuthProvider>
  )
}

export default App