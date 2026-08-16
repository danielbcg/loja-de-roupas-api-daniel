import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import Auth from './pages/Auth'
import Catalogo from './pages/Catalogo'
import Produto from './pages/Produto'
import Carrinho from './pages/Carrinho'
import Pedido from './pages/Pedido'
import Pedidos from './pages/Pedidos'
import Conta from './pages/Conta'
import PostarProduto from './pages/PostarProduto'
import MeusProdutos from './pages/MeusProdutos'
import EditarProduto from './pages/EditarProduto'

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
        <Route
          path="/conta"
          element={
            <>
              <Header />
              <Conta />
            </>
          }
        />
        <Route path="/postar-produto" element={<> <Header /> <PostarProduto /> </>} />
        <Route path="/meus-produtos" element={<> <Header /> <MeusProdutos /> </>} />
        <Route path="/produtos/:id/editar" element={<> <Header /> <EditarProduto /> </>} /> 
      </Routes>
    </AuthProvider>
  )
}

export default App