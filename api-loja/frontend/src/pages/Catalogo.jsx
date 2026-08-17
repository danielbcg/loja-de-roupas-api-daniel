import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../lib/api'
import { CATEGORIAS } from '../lib/categorias'

export default function Catalogo() {
  const [produtos, setProdutos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const busca = searchParams.get('busca') || ''
  const categoria = searchParams.get('categoria') || ''

  useEffect(() => {
    api.get('/roupas')
      .then((response) => setProdutos(response.data))
      .finally(() => setCarregando(false))
  }, [])

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((produto) => {
      const bateCategoria = !categoria || produto.categoria === categoria
      const termo = busca.trim().toLowerCase()
      const bateBusca =
        !termo ||
        produto.titulo.toLowerCase().includes(termo) ||
        produto.marca.toLowerCase().includes(termo)
      return bateCategoria && bateBusca
    })
  }, [produtos, categoria, busca])

  function selecionarCategoria(novaCategoria) {
    const params = new URLSearchParams(searchParams)
    if (novaCategoria) {
      params.set('categoria', novaCategoria)
    } else {
      params.delete('categoria')
    }
    setSearchParams(params)
  }

  return (
    <div>
      <section className="bg-ink text-canvas">
        <div className="max-w-6xl mx-auto px-6 py-20 md:py-28 text-center">
          <p className="font-mono text-xs tracking-[0.3em] text-thread mb-4">NOVA COLEÇÃO</p>
          <h1 className="font-display text-4xl md:text-6xl leading-tight mb-6">
            ROUPA QUE VESTE
            <br />
            SUA IDENTIDADE
          </h1>
          <p className="font-body text-canvas/70 max-w-md mx-auto mb-8">
            Peças selecionadas, estoque de verdade, entrega rápida. Bem-vindo à Bonywear.
          </p>
          <a
            href="#vitrine"
            className="inline-block bg-thread text-ink font-display text-sm px-8 py-4 rounded-sm hover:bg-canvas transition-colors"
          >
            VER VITRINE
          </a>
        </div>
      </section>

      <div id="vitrine" className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <h2 className="font-display text-3xl">
            {busca ? `RESULTADOS PARA "${busca.toUpperCase()}"` : 'VITRINE'}
          </h2>
          {busca && (
            <button
              onClick={() => {
                const params = new URLSearchParams(searchParams)
                params.delete('busca')
                setSearchParams(params)
              }}
              className="font-mono text-xs text-graphite hover:text-thread transition-colors"
            >
              LIMPAR BUSCA ×
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
          <button
            onClick={() => selecionarCategoria('')}
            className={`font-mono text-xs px-4 py-2 rounded-sm border whitespace-nowrap transition-colors ${
              !categoria
                ? 'border-thread bg-thread/10 text-thread'
                : 'border-graphite/20 text-graphite hover:border-thread hover:text-thread'
            }`}
          >
            TODOS
          </button>
          {CATEGORIAS.map((c) => (
            <button
              key={c}
              onClick={() => selecionarCategoria(c)}
              className={`font-mono text-xs px-4 py-2 rounded-sm border whitespace-nowrap transition-colors ${
                categoria === c
                  ? 'border-thread bg-thread/10 text-thread'
                  : 'border-graphite/20 text-graphite hover:border-thread hover:text-thread'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {carregando ? (
          <p className="font-mono text-graphite">Carregando...</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtosFiltrados.map((produto) => (
                <Link key={produto.id} to={`/produtos/${produto.id}`} className="group">
                  <div className="aspect-[3/4] bg-white border border-graphite/15 rounded-sm mb-3 flex items-center justify-center overflow-hidden group-hover:border-thread transition-colors">
                  {produto.imagemUrl ? (
                    <img src={produto.imagemUrl} alt={produto.titulo} className="w-full h-full object-cover" />
                  ) : (
                    <span className="font-mono text-xs text-graphite/40">SEM FOTO</span>
                  )}
                </div>
                  <p className="font-mono text-xs text-graphite tracking-wide">{produto.marca}</p>
                  <p className="font-body text-sm text-ink mb-1 truncate">{produto.titulo}</p>
                  <p className="font-mono text-sm text-thread">
                    R$ {produto.preco.toFixed(2).replace('.', ',')}
                  </p>
                </Link>
              ))}
            </div>

            {produtosFiltrados.length === 0 && produtos.length > 0 && (
              <p className="font-mono text-graphite text-sm">
                Nenhum produto encontrado com esse filtro.
              </p>
            )}

            {produtos.length === 0 && (
              <p className="font-mono text-graphite text-sm">Nenhum produto disponível no momento.</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}