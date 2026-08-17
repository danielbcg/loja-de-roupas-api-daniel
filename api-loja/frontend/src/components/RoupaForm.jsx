import { useState } from 'react'
import { CATEGORIAS } from '../lib/categorias'
import api from '../lib/api'

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
  const [imagemUrl, setImagemUrl] = useState(dadosIniciais?.imagemUrl || '')
  const [enviandoImagem, setEnviandoImagem] = useState(false)
  const [erroImagem, setErroImagem] = useState('')
  const [erro, setErro] = useState('')

  async function selecionarArquivo(e) {
    const arquivo = e.target.files[0]
    if (!arquivo) return

    setErroImagem('')
    setEnviandoImagem(true)

    const formData = new FormData()
    formData.append('arquivo', arquivo)

    try {
      const { data } = await api.post('/uploads/imagem', formData)
      setImagemUrl(data.url)
    } catch (err) {
      setErroImagem('Não foi possível enviar a imagem. Confere se ela tem no máximo 5MB.')
    } finally {
      setEnviandoImagem(false)
      e.target.value = '' // permite selecionar o mesmo arquivo de novo se precisar
    }
  }

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
      imagemUrl,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block font-mono text-xs text-graphite mb-1.5 tracking-wide">FOTO DO PRODUTO</label>

        <div className="aspect-[3/4] max-h-64 bg-white border border-graphite/20 rounded-sm mb-3 flex items-center justify-center overflow-hidden">
          {imagemUrl ? (
            <img src={imagemUrl} alt="Prévia do produto" className="w-full h-full object-cover" />
          ) : (
            <span className="font-mono text-xs text-graphite/40">SEM FOTO</span>
          )}
        </div>

        <input
          type="text"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          placeholder="Cola o link de uma imagem..."
          className="w-full px-4 py-3 bg-white border border-graphite/20 rounded-sm focus:outline-none focus:border-thread transition-colors mb-2"
        />

        <label className="block">
          <span className="font-mono text-xs border border-graphite/30 text-ink px-3 py-2 rounded-sm hover:border-thread hover:text-thread transition-colors tracking-wide inline-block cursor-pointer">
            {enviandoImagem ? 'ENVIANDO...' : 'OU ENVIAR DO COMPUTADOR'}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={selecionarArquivo}
            disabled={enviandoImagem}
            className="hidden"
          />
        </label>

        {erroImagem && <p className="text-thread text-sm font-mono mt-2">{erroImagem}</p>}
      </div>

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