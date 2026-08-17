import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useAuth } from '../context/AuthContext'

export default function Conta() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const [cliente, setCliente] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erroCarregar, setErroCarregar] = useState(false)
  const [editando, setEditando] = useState(false)

  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [endereco, setEndereco] = useState('')
  const [vendedor, setVendedor] = useState(false)

  const [salvando, setSalvando] = useState(false)
  const [mensagem, setMensagem] = useState('')
  const [erro, setErro] = useState('')

  useEffect(() => {
    carregar()
  }, [])

  function carregar() {
    setCarregando(true)
    setErroCarregar(false)
    api.get('/clientes/me')
      .then((response) => {
        preencherFormulario(response.data)
      })
      .catch(() => setErroCarregar(true))
      .finally(() => setCarregando(false))
  }

  function preencherFormulario(dados) {
    setCliente(dados)
    setNome(dados.nome)
    setEmail(dados.email)
    setCpf(dados.cpf)
    setEndereco(dados.endereco)
    setVendedor(dados.vendedor)
  }

  function iniciarEdicao() {
    setErro('')
    setMensagem('')
    setEditando(true)
  }

  function cancelarEdicao() {
    preencherFormulario(cliente) // desfaz qualquer alteração não salva
    setErro('')
    setEditando(false)
  }
  
  

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
      setEditando(false)
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
  
  if (erroCarregar) {
    return (
      <div className="max-w-md mx-auto px-6 py-16 text-center">
        <p className="font-body text-graphite mb-4">Não foi possível carregar sua conta.</p>
        <button
          onClick={carregar}
          className="font-mono text-xs border border-graphite/30 px-4 py-2 rounded-sm hover:border-thread hover:text-thread transition-colors"
        >
          TENTAR DE NOVO
        </button>
      </div>
    )
  }

  if (!cliente) return null


  return (
    <div className="max-w-md mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl">MINHA CONTA</h1>
        {!editando && (
          <button
            onClick={iniciarEdicao}
            className="font-mono text-xs border border-graphite/30 text-ink px-3 py-2 rounded-sm hover:border-thread hover:text-thread transition-colors tracking-wide"
          >
            EDITAR
          </button>
        )}
      </div>

      {mensagem && <p className="text-denim text-sm font-mono mb-6">{mensagem}</p>}

      {!editando ? (
        // ---------- MODO VISUALIZAÇÃO ----------
        <div className="space-y-5">
          <Campo label="NOME" valor={cliente.nome} />
          <Campo label="EMAIL" valor={cliente.email} />
          <Campo label="CPF" valor={cliente.cpf} />
          <Campo label="ENDEREÇO" valor={cliente.endereco} />
          <Campo label="TIPO DE CONTA" valor={cliente.vendedor ? 'Comprar e vender' : 'Só comprar'} />

          <button
            onClick={sair}
            className="w-full font-mono text-xs text-graphite hover:text-thread transition-colors tracking-wide mt-6"
          >
            SAIR DA CONTA
          </button>
        </div>
      ) : (
        // ---------- MODO EDIÇÃO ----------
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

          <div className="flex gap-3">
            <button
              type="button"
              onClick={cancelarEdicao}
              className="flex-1 font-mono text-xs border border-graphite/30 text-graphite py-4 rounded-sm hover:border-thread hover:text-thread transition-colors"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              disabled={salvando}
              className="flex-1 bg-ink text-canvas font-display text-sm py-4 rounded-sm hover:bg-thread transition-colors disabled:opacity-50"
            >
              {salvando ? 'SALVANDO...' : 'SALVAR'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

function Campo({ label, valor }) {
  return (
    <div>
      <p className="font-mono text-xs text-graphite mb-1 tracking-wide">{label}</p>
      <p className="font-body text-ink px-4 py-3 bg-white border border-graphite/15 rounded-sm">{valor}</p>
    </div>
  )
}