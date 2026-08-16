import { Link } from 'react-router-dom'
import { ShoppingBag, User, Search, Package } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { autenticado, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 bg-canvas border-b border-graphite/15">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-6">

        <Link to="/" className="font-mono text-thread text-sm tracking-widest shrink-0">
          BONYWEAR
        </Link>

        <div className="hidden md:flex flex-1 max-w-md items-center gap-2 px-4 py-2 bg-white border border-graphite/20 rounded-sm">
          <Search size={16} className="text-graphite" />
          <input
            type="text"
            placeholder="Buscar peças..."
            className="w-full bg-transparent text-sm focus:outline-none"
          />
        </div>

        <nav className="flex items-center gap-5">
          <Link to="/carrinho" className="text-ink hover:text-thread transition-colors">
            <ShoppingBag size={20} />
          </Link>

          {autenticado ? (
            <div className="flex items-center gap-4">
              <Link to="/pedidos" className="text-ink hover:text-thread transition-colors" title="Meus pedidos">
                <Package size={20} />
              </Link>
              <button
                onClick={logout}
                className="font-mono text-xs text-graphite hover:text-thread transition-colors tracking-wide"
              >
                SAIR
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="font-mono text-xs bg-ink text-canvas px-4 py-2 rounded-sm hover:bg-thread transition-colors tracking-wide"
            >
              ENTRAR
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}