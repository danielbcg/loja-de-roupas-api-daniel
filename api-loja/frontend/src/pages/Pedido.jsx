import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import api from '../lib/api'

const statusLabel = {
  PENDENTE: 'Aguardando pagamento',
  PAGO: 'Pago',
  ENVIADO: 'Enviado',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
}

export default function Pedido() {
  const { id } = useParams()
  const [pedido, setPedido] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [pagando, setPagando] = useState(false)
  const [resultadoPagamento, setResultadoPagamento] = useState(null)

  useEffect(() => {
    carregar()
  }, [id])

  function carregar() {
    setCarregando(true)
    api.get(`/pedidos/${id}`)
      .then((response) => setPedido(response.data))
      .finally(() => setCarregando(false))
  }

  async function pagar() {
    setPagando(true)
    try {
      const { data } = await api.post(`/payments/${id}`)
      setResultadoPagamento(data.status)
      carregar()
    } catch (err) {
      setResultadoPagamento('ERRO')
    } finally {
      setPagando(false)
    }
  }

  if (carregando) return <p className="p-10 font-mono text-graphite">Carregando...</p>
  if (!pedido) return <p className="p-10 font-mono text-graphite">Pedido não encontrado.</p>

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <Link to="/pedidos" className="font-mono text-xs text-graphite hover:text-thread transition-colors">
        ← MEUS PEDIDOS
      </Link>

      <h1 className="font-display text-3xl mt-4 mb-2">PEDIDO #{pedido.id}</h1>
      <p className="font-mono text-sm text-graphite mb-8">
        Status: <span className="text-thread">{statusLabel[pedido.status]}</span>
      </p>

      <div className="space-y-3 mb-8">
        {pedido.itens.map((item) => (
          <div key={item.id} className="flex justify-between border-b border-graphite/15 pb-3">
            <p className="font-body text-sm">
              {item.produto.titulo} <span className="text-graphite">x{item.quantidade}</span>
            </p>
            <p className="font-mono text-sm">
              R$ {item.subtotal.toFixed(2).replace('.', ',')}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-8">
        <p className="font-display text-xl">TOTAL</p>
        <p className="font-mono text-xl text-thread">
          R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}
        </p>
      </div>

      {pedido.status === 'PENDENTE' && (
        <button
          onClick={pagar}
          disabled={pagando}
          className="w-full bg-ink text-canvas font-display text-sm py-4 rounded-sm hover:bg-thread transition-colors disabled:opacity-50"
        >
          {pagando ? 'PROCESSANDO...' : 'PAGAR AGORA'}
        </button>
      )}

      {resultadoPagamento && (
        <p className="font-mono text-sm mt-4 text-center">
          Resultado do pagamento: <span className="text-thread">{resultadoPagamento}</span>
        </p>
      )}
    </div>
  )
}