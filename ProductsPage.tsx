import { useEffect, useMemo, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProductsFallback } from '../lib/store'
import { hasSupabaseEnv, supabase, type Product } from '../lib/supabase'

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)
      if (hasSupabaseEnv && supabase) {
        const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
        if (data?.length) {
          setProducts(data as Product[])
          setLoading(false)
          return
        }
      }
      setProducts(await getProductsFallback())
      setLoading(false)
    }
    load()
  }, [])

  const filtered = useMemo(() => products.filter((p) =>
    `${p.title} ${p.description} ${p.category}`.toLowerCase().includes(search.toLowerCase())
  ), [products, search])

  return (
    <div className="container page">
      <div className="page-head">
        <h2>المنتجات</h2>
        <input className="input" placeholder="ابحث عن منتج" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      {loading ? <div className="card">جار تحميل المنتجات...</div> : (
        <div className="grid products-grid">
          {filtered.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      )}
    </div>
  )
}
