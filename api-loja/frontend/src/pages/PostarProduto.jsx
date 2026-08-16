import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'
import RoupaForm from '../components/RoupaForm'

export default function PostarProduto() {
  const navigate = useNavigate()

  const [cliente, setCliente] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.get('/clientes/me')
      .then((response) => setCliente(response.data))
      .finally(() => setCarregando(false))
  }, [])

  async function criar(dados) {
    setErro('')
    setEnviando(true)
    try {
      await api.post('/roupas', dados)
      navigate('/meus-produtos')
    } catch (err) {
      setErro('Não foi possível criar o produto. Confira os dados e tente de novo.')
    } finally {
      setEnviando(false)
    }
  }

  if (carregando) return <p className="p-10 font-mono text-graphite">Carregando...</p>

  if (!cliente?.vendedor) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <h1 className="font-display text-2xl mb-4">SÓ VENDEDORES PODEM POSTAR</h1>
        <p className="font-body text-graphite mb-6">
          Sua conta ainda está marcada como "só comprar". Ative o modo vendedor na sua conta pra anunciar peças.
        </p>
        <Link
          to="/conta"
          className="inline-block bg-ink text-canvas font-display text-sm px-8 py-4 rounded-sm hover:bg-thread transition-colors"
        >
          IR PARA MINHA CONTA
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="font-display text-3xl mb-8">POSTAR PRODUTO</h1>
      {erro && <p className="text-thread text-sm font-mono mb-4">{erro}</p>}
      <RoupaForm onSubmit={criar} enviando={enviando} textoBotao="PUBLICAR" />
    </div>
  )
}