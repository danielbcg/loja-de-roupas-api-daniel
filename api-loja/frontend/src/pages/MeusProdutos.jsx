import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

export default function MeusProdutos() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [excluindoId, setExcluindoId] = useState(null)

  function carregar() {
    setCarregando(true)
    api.get('/roupas/minhas')
      .then((response) => setProdutos(response.data))
      .finally(() => setCarregando(false))
  }

  useEffect(() => {
    carregar()
  }, [])

  async function excluir(id) {
    if (!confirm('Tem certeza que quer excluir esse produto? Essa ação não pode ser desfeita.')) {
      return
    }

    setExcluindoId(id)
    try {
      await api.delete(`/roupas/${id}`)
      setProdutos((atual) => atual.filter((p) => p.id !== id))
    } catch (err) {
      alert('Não foi possível excluir o produto.')
    } finally {
      setExcluindoId(null)
    }
  }

  if (carregando) return <p className="p-10 font-mono text-graphite">Carregando...</p>

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">MEUS PRODUTOS</h1>
        <Link
          to="/postar-produto"
          className="font-mono text-xs bg-ink text-canvas px-4 py-3 rounded-sm hover:bg-thread transition-colors tracking-wide"
        >
          + POSTAR PRODUTO
        </Link>
      </div>

      {produtos.length === 0 ? (
        <p className="font-body text-graphite">
          Você ainda não postou nenhum produto.
        </p>
      ) : (
        <div className="space-y-3">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              className="flex items-center gap-4 border border-graphite/15 rounded-sm p-4 bg-white"
            >
              <div className="w-16 h-20 bg-canvas border border-graphite/15 shrink-0 flex items-center justify-center overflow-hidden">
                {produto.imagemUrl ? (
                  <img src={produto.imagemUrl} alt={produto.titulo} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-mono text-[10px] text-graphite/40">SEM FOTO</span>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-body text-sm">{produto.titulo}</p>
                  {!produto.ativo && (
                    <span className="font-mono text-[10px] bg-graphite/10 text-graphite px-2 py-0.5 rounded-sm">
                      REMOVIDO PELA ADMINISTRAÇÃO
                    </span>
                  )}
                </div>
                <p className="font-mono text-xs text-graphite">{produto.marca}</p>
                <p className="font-mono text-sm text-thread">
                  R$ {produto.preco.toFixed(2).replace('.', ',')} · estoque: {produto.quantidade}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Link
                  to={`/produtos/${produto.id}/editar`}
                  className="font-mono text-xs text-graphite hover:text-thread transition-colors"
                >
                  EDITAR
                </Link>
                <button
                  onClick={() => excluir(produto.id)}
                  disabled={excluindoId === produto.id}
                  className="font-mono text-xs text-graphite hover:text-thread transition-colors disabled:opacity-50"
                >
                  {excluindoId === produto.id ? 'EXCLUINDO...' : 'EXCLUIR'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}