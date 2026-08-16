import { useState } from 'react'

const CATEGORIAS = ['BLUSA', 'BERMUDA', 'CALCA', 'VESTIDO', 'JAQUETA']

export default function RoupaForm({ dadosIniciais, onSubmit, enviando, textoBotao }) {
  const [titulo, setTitulo] = useState(dadosIniciais?.titulo || '')
  const [marca, setMarca] = useState(dadosIniciais?.marca || '')
  const [categoria, setCategoria] = useState(dadosIniciais?.categoria || CATEGORIAS[0])
  const [cor, setCor] = useState(dadosIniciais?.cor || '')
  const [tamanho, setTamanho] = useState(dadosIniciais?.tamanho || '')
  const [preco, setPreco] = useState(dadosIniciais?.preco ?? '')
  const [quantidade, setQuantidade] = useState(dadosIniciais?.quantidade ?? '')
  const [dataChegada, setDataChegada] = useState(
    dadosIniciais?.dataChegada || new Date().toISOString().slice(0, 10)
  )
  const [disponivel, setDisponivel] = useState(dadosIniciais?.disponivel ?? true)
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setErro('')

    if (!titulo || !marca || !cor || !tamanho || preco === '' || quantidade === '') {
      setErro('Preenche todos os campos antes de continuar.')
      return
    }

    onSubmit({
      titulo,
      marca,
      categoria,
      cor,
      tamanho,
      preco: Number(preco),
      quantidade: Number(quantidade),
      dataChegada,
      disponivel,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">TÍTULO</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          placeholder="Ex: Camiseta Oversized Preta"
          className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
        />
      </div>

      <div>
        <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">MARCA</label>
        <input
          type="text"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
          placeholder="Ex: BonyWear"
          className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">COR</label>
          <input
            type="text"
            value={cor}
            onChange={(e) => setCor(e.target.value)}
            placeholder="Ex: Preto"
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">TAMANHO</label>
          <input
            type="text"
            value={tamanho}
            onChange={(e) => setTamanho(e.target.value)}
            placeholder="Ex: M"
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">CATEGORIA</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">PREÇO (R$)</label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            placeholder="0.00"
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>

        <div>
          <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">ESTOQUE</label>
          <input
            type="number"
            min="0"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            placeholder="0"
            className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">DATA DE CHEGADA</label>
        <input
          type="date"
          value={dataChegada}
          onChange={(e) => setDataChegada(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors"
        />
      </div>

      <label className="flex items-center gap-2 font-mono text-xs text-graphite tracking-wide cursor-pointer">
        <input
          type="checkbox"
          checked={disponivel}
          onChange={(e) => setDisponivel(e.target.checked)}
          className="w-4 h-4"
        />
        DISPONÍVEL PARA VENDA
      </label>

      {erro && <p className="text-thread text-sm font-mono">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-ink text-canvas font-display text-sm py-4 rounded-sm hover:bg-thread transition-colors disabled:opacity-50"
      >
        {enviando ? 'ENVIANDO...' : textoBotao}
      </button>
    </form>
  )
}