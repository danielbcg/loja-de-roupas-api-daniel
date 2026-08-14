import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Auth() {
  const [modo, setModo] = useState('login')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [endereco, setEndereco] = useState('')
  const [vendedor, setVendedor] = useState(false)
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const { login, cadastrar } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setErro('')
    setCarregando(true)

    try {
      if (modo === 'login') {
        await login(email, senha)
      } else {
        await cadastrar({ nome, email, senha, cpf, endereco, vendedor })
      }
      navigate('/')
    } catch (err) {
      setErro(modo === 'login' ? 'Email ou senha incorretos.' : 'Não foi possível criar a conta.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Painel esquerdo — identidade da marca */}
      <div className="hidden md:flex md:w-1/2 bg-ink flex-col justify-center px-16">
        <p className="font-mono text-thread text-sm mb-4 tracking-widest">BONYWEAR.COM</p>
        <h1 className="font-display text-canvas text-6xl leading-none mb-6">
          VISTA<br />O QUE<br />VOCÊ É
        </h1>
        <p className="text-graphite font-body max-w-sm">
          Compre e venda peças únicas. Sem intermediário, sem complicação.
        </p>
      </div>

      {/* Painel direito — formulário */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-12 bg-canvas">
        <div className="w-full max-w-sm">

          {/* Toggle estilo etiqueta */}
          <div className="flex items-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => setModo('login')}
              className={`relative px-6 py-2 font-mono text-sm tracking-wide border-2 rounded-sm transition-colors ${
                modo === 'login' ? 'border-thread text-thread bg-thread/5' : 'border-graphite/30 text-graphite'
              }`}
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-canvas border border-current" />
              ENTRAR
            </button>

            <div className="flex-1 border-t border-dashed border-graphite/30" />

            <button
              type="button"
              onClick={() => setModo('cadastro')}
              className={`relative px-6 py-2 font-mono text-sm tracking-wide border-2 rounded-sm transition-colors ${
                modo === 'cadastro' ? 'border-thread text-thread bg-thread/5' : 'border-graphite/30 text-graphite'
              }`}
            >
              CRIAR CONTA
              <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-canvas border border-current" />
            </button>
          </div>

          <h2 className="font-display text-2xl mb-8">
            {modo === 'login' ? 'Bem-vindo de volta' : 'Criar sua conta'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {modo === 'cadastro' && (
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
            )}

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
              <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">SENHA</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
              />
            </div>

            {modo === 'cadastro' && (
              <>
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

                {/* Cards de escolha: comprar vs comprar+vender */}
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
              </>
            )}

            {erro && <p className="text-thread text-sm font-mono">{erro}</p>}

            <button
              type="submit"
              disabled={carregando}
              className="w-full bg-ink text-canvas font-display text-sm py-4 rounded-sm hover:bg-thread transition-colors disabled:opacity-50"
            >
              {carregando ? 'AGUARDE...' : modo === 'login' ? 'ENTRAR' : 'CRIAR CONTA'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}