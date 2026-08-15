import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Produto() {
  const { id } = useParams()
  const { autenticado } = useAuth()

  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [adicionando, setAdicionando] = useState(false)
  const [mensagem, setMensagem] = useState('')

  useEffect(() => {
    api.get(`/roupas/${id}`)
      .then((response) => setProduto(response.data))
      .finally(() => setCarregando(false))
  }, [id])

  async function adicionarAoCarrinho() {
    if (!autenticado) {
      setMensagem('Você precisa entrar na sua conta primeiro.')
      return
    }

    setAdicionando(true)
    setMensagem('')

    try {
      const { data: carrinho } = await api.get('/carrinhos/meu')
      await api.post(`/carrinhos/${carrinho.id}/adicionar/${produto.id}`)
      setMensagem('Adicionado ao carrinho!')
    } catch (err) {
      setMensagem('Não foi possível adicionar ao carrinho.')
    } finally {
      setAdicionando(false)
    }
  }

  if (carregando) {
    return <p className="p-10 font-mono text-graphite">Carregando...</p>
  }

  if (!produto) {
    return <p className="p-10 font-mono text-graphite">Produto não encontrado.</p>
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-12">

      <div className="aspect-[3/4] max-h-[560px] bg-white border border-graphite/15 rounded-sm flex items-center justify-center">
        <span className="font-mono text-xs text-graphite/40">SEM FOTO</span>
      </div>

      <div>
        <p className="font-mono text-xs text-graphite tracking-widest mb-2">{produto.marca}</p>
        <h1 className="font-display text-3xl mb-4">{produto.titulo}</h1>
        <p className="font-mono text-2xl text-thread mb-6">
          R$ {produto.preco.toFixed(2).replace('.', ',')}
        </p>

        <div className="space-y-2 mb-8 font-body text-sm text-graphite">
          <p><span className="text-ink">Cor:</span> {produto.cor}</p>
          <p><span className="text-ink">Tamanho:</span> {produto.tamanho}</p>
          <p><span className="text-ink">Categoria:</span> {produto.categoria}</p>
          <p><span className="text-ink">Estoque:</span> {produto.quantidade} unidade(s)</p>
        </div>

        <button
          onClick={adicionarAoCarrinho}
          disabled={adicionando || produto.quantidade < 1}
          className="w-full bg-ink text-canvas font-display text-sm py-4 rounded-sm hover:bg-thread transition-colors disabled:opacity-50"
        >
          {produto.quantidade < 1 ? 'SEM ESTOQUE' : adicionando ? 'ADICIONANDO...' : 'ADICIONAR AO CARRINHO'}
        </button>

        {mensagem && <p className="text-thread text-sm font-mono mt-3">{mensagem}</p>}
      </div>
    </div>
  )
}