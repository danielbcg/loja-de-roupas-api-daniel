import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { erro: null }
  }

  static getDerivedStateFromError(erro) {
    return { erro }
  }

  componentDidCatch(erro, info) {
    // fica no console pra você (ou eu) conseguir ver o stack trace completo
    console.error('Erro capturado pelo ErrorBoundary:', erro, info)
  }

  render() {
    if (this.state.erro) {
      return (
        <div className="max-w-lg mx-auto px-6 py-16 text-center">
          <h1 className="font-display text-2xl mb-4">ALGO DEU ERRADO NESSA TELA</h1>
          <p className="font-body text-graphite mb-2">
            {this.state.erro.message || 'Erro desconhecido.'}
          </p>
          <p className="font-mono text-xs text-graphite/60 mb-6">
            Abre o console do navegador (F12) pra ver o detalhe técnico.
          </p>
          <button
            onClick={() => window.location.assign('/')}
            className="bg-ink text-canvas font-display text-sm px-8 py-4 rounded-sm hover:bg-thread transition-colors"
          >
            VOLTAR PARA O INÍCIO
          </button>
        </div>
      )
    }

    return this.props.children
  }
}