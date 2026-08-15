import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../lib/api'

export default function Carrinho() {
  const [carrinho, setCarrinho] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [processando, setProcessando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    carregar()
  }, [])

  function carregar() {
    setCarregando(true)
    api.get('/carrinhos/meu')
      .then((response) => setCarrinho(response.data))
      .finally(() => setCarregando(false))
  }

  async function remover(produtoId) {
    await api.post(`/carrinhos/${carrinho.id}/remover/${produtoId}`)
    carregar()
  }

  async function finalizarCompra() {
    setProcessando(true)
    try {
      const { data: pedido } = await api.post('/pedidos/checkout')
      navigate(`/pedidos/${pedido.id}`)
    } catch (err) {
      alert('Não foi possível finalizar a compra.')
    } finally {
      setProcessando(false)
    }
  }

  if (carregando) return <p className="p-10 font-mono text-graphite">Carregando...</p>

  const itens = carrinho?.itens || []

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl mb-8">SEU CARRINHO</h1>

      {itens.length === 0 ? (
        <div>
          <p className="font-body text-graphite mb-4">Seu carrinho está vazio.</p>
          <Link to="/" className="font-mono text-sm text-thread hover:underline">
            Ver vitrine →
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            {itens.map((produto) => (
              <div
                key={produto.id}
                className="flex items-center gap-4 border border-graphite/15 rounded-sm p-4 bg-white"
              >
                <div className="w-20 h-24 bg-canvas border border-graphite/15 shrink-0 flex items-center justify-center">
                  <span className="font-mono text-[10px] text-graphite/40">SEM FOTO</span>
                </div>

                <div className="flex-1">
                  <p className="font-mono text-xs text-graphite">{produto.marca}</p>
                  <p className="font-body text-sm">{produto.titulo}</p>
                  <p className="font-mono text-sm text-thread">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <button
                  onClick={() => remover(produto.id)}
                  className="font-mono text-xs text-graphite hover:text-thread transition-colors"
                >
                  REMOVER
                </button>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between border-t border-graphite/20 pt-6">
            <p className="font-display text-xl">
              TOTAL: R$ {carrinho.valorTotal.toFixed(2).replace('.', ',')}
            </p>
            <button
              onClick={finalizarCompra}
              disabled={processando}
              className="bg-ink text-canvas font-display text-sm px-8 py-4 rounded-sm hover:bg-thread transition-colors disabled:opacity-50"
            >
              {processando ? 'PROCESSANDO...' : 'FINALIZAR COMPRA'}
            </button>
          </div>
        </>
      )}
    </div>
  )
}