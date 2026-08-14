import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function Catalogo() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    api.get('/roupas')
      .then((response) => setProdutos(response.data))
      .finally(() => setCarregando(false))
  }, [])

  if (carregando) {
    return <p className="p-10 font-mono text-graphite">Carregando...</p>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl mb-8">VITRINE</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <Link
            key={produto.id}
            to={`/produtos/${produto.id}`}
            className="group"
          >
            <div className="aspect-3/4 bg-white border border-graphite/15 rounded-sm mb-3 flex items-center justify-center overflow-hidden group-hover:border-thread transition-colors">
              <span className="font-mono text-xs text-graphite/40">SEM FOTO</span>
            </div>
            <p className="font-mono text-xs text-graphite tracking-wide">{produto.marca}</p>
            <p className="font-body text-sm text-ink mb-1 truncate">{produto.titulo}</p>
            <p className="font-mono text-sm text-thread">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </p>
          </Link>
        ))}
      </div>

      {produtos.length === 0 && (
        <p className="font-mono text-graphite text-sm">Nenhum produto disponível no momento.</p>
      )}
    </div>
  )
}