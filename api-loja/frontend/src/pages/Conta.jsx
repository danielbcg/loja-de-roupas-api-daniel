import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Conta() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [cliente, setCliente] = useState(null)
  const [carregando, setCarregando] = useState(true)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [endereco, setEndereco] = useState('')
  const [vendedor, setVendedor] = useState(false)

  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    api.get('/clientes/me')
      .then((response) => {
        const dados = response.data
        setCliente(dados)
        setNome(dados.nome)
        setEmail(dados.email)
        setCpf(dados.cpf)
        setEndereco(dados.endereco)
        setVendedor(dados.vendedor)
      })
      .finally(() => setCarregando(false))
  }, [])

  async function salvar(e) {
    e.preventDefault()
    setErro('')
    setMensagem('')
    setSalvando(true)

    try {
      const { data } = await api.put(`/clientes/${cliente.id}`, {
        nome,
        email,
        cpf,
        endereco,
        vendedor,
      })
      setCliente(data)
      setMensagem('Dados atualizados com sucesso!')
    } catch (err) {
      setErro('Não foi possível salvar. Verifique se o email já não está em uso.')
    } finally {
      setSalvando(false)
    }
  }

  function sair() {
    logout()
    navigate('/')
  }

  if (carregando) return <p className="p-10 font-mono text-graphite">Carregando...</p>
  if (!cliente) return <p className="p-10 font-mono text-graphite">Não foi possível carregar sua conta.</p>

  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <h1 className="font-display text-3xl mb-8">MINHA CONTA</h1>

      <form onSubmit={salvar} className="space-y-5">
        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">NOME</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">EMAIL</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">CPF</label>
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">ENDEREÇO</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-graphite mb-2 tracking-wide">TIPO DE CONTA</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setVendedor(false)}
              className={`text-left p-4 border-2 rounded-sm transition-colors ${
                !vendedor ? 'border-thread bg-thread/5' : 'border-graphite/20'
              }`}
            >
              <p className="font-display text-sm mb-1">SÓ COMPRAR</p>
              <p className="text-xs text-graphite font-body">Navegue e compre peças</p>
            </button>

            <button
              type="button"
              onClick={() => setVendedor(true)}
              className={`text-left p-4 border-2 rounded-sm transition-colors ${
                vendedor ? 'border-thread bg-thread/5' : 'border-graphite/20'
              }`}
            >
              <p className="font-display text-sm mb-1">COMPRAR E VENDER</p>
              <p className="text-xs text-graphite font-body">Anuncie suas próprias peças</p>
            </button>
          </div>
        </div>

        {erro && <p className="text-thread text-sm font-mono">{erro}</p>}
        {mensagem && <p className="text-denim text-sm font-mono">{mensagem}</p>}

        <button
          type="submit"
          disabled={salvando}
          className="w-full bg-ink text-canvas font-display text-sm py-4 rounded-sm hover:bg-thread transition-colors disabled:opacity-50"
        >
          {salvando ? 'SALVANDO...' : 'SALVAR ALTERAÇÕES'}
        </button>
      </form>

      <button
        onClick={sair}
        className="w-full font-mono text-xs text-graphite hover:text-thread transition-colors tracking-wide mt-6"
      >
        SAIR DA CONTA
      </button>
    </div>
  )
}