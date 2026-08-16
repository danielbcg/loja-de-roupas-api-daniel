import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../lib/api'
import RoupaForm from '../components/RoupaForm'

export default function EditarProduto() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [produto, setProduto] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [enviando, setEnviando] = useState(false)
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.get(`/roupas/${id}`)
      .then((response) => setProduto(response.data))
      .finally(() => setCarregando(false))
  }, [id])

  async function salvar(dados) {
    setErro('')
    setEnviando(true)
    try {
      await api.put(`/roupas/${id}`, dados)
      navigate('/meus-produtos')
    } catch (err) {
      setErro('Não foi possível salvar. Confira os dados e tente de novo.')
    } finally {
      setEnviando(false)
    }
  }

  if (carregando) return <p className="p-10 font-mono text-graphite">Carregando...</p>
  if (!produto) return <p className="p-10 font-mono text-graphite">Produto não encontrado.</p>

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <Link to="/meus-produtos" className="font-mono text-xs text-graphite hover:text-thread transition-colors">
        ← MEUS PRODUTOS
      </Link>

      <h1 className="font-display text-3xl mt-4 mb-8">EDITAR PRODUTO</h1>
      {erro && <p className="text-thread text-sm font-mono mb-4">{erro}</p>}
      <RoupaForm dadosIniciais={produto} onSubmit={salvar} enviando={enviando} textoBotao="SALVAR ALTERAÇÕES" />
    </div>
  )
}