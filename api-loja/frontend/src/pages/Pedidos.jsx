import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../lib/api'

const statusLabel = {
  PENDENTE: 'Aguardando pagamento',
  PAGO: 'Pago',
  ENVIADO: 'Enviado',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
}

export default function Pedidos() {
  const [pedidos, setPedidos] = useState([])
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    api.get('/pedidos/meus')
      .then((response) => setPedidos(response.data))
      .finally(() => setCarregando(false))
  }, [])

  if (carregando) return <p className="p-10 font-mono text-graphite">Carregando...</p>

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="font-display text-3xl mb-8">MEUS PEDIDOS</h1>

      {pedidos.length === 0 ? (
        <div>
          <p className="font-body text-graphite mb-4">Você ainda não fez nenhum pedido.</p>
          <Link to="/" className="font-mono text-sm text-thread hover:underline">
            Ver vitrine →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {pedidos.map((pedido) => (
            <Link
              key={pedido.id}
              to={`/pedidos/${pedido.id}`}
              className="flex items-center justify-between border border-graphite/15 rounded-sm p-4 bg-white hover:border-thread transition-colors"
            >
              <div>
                <p className="font-body text-sm">Pedido #{pedido.id}</p>
                <p className="font-mono text-xs text-graphite">
                  {pedido.dataCriacao} · {statusLabel[pedido.status]}
                </p>
              </div>
              <p className="font-mono text-sm text-thread">
                R$ {pedido.valorTotal.toFixed(2).replace('.', ',')}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}