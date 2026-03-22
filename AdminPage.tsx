import { useEffect, useState } from 'react'
import { demoProducts } from '../lib/demoData'
import { hasSupabaseEnv, supabase, type Product } from '../lib/supabase'

const emptyProduct = {
  title: '',
  description: '',
  price: 0,
  image_url: '',
  category: '',
  stock: 0,
}

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [form, setForm] = useState(emptyProduct)
  const [message, setMessage] = useState('')

  const loadProducts = async () => {
    if (hasSupabaseEnv && supabase) {
      const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
      setProducts((data as Product[]) || [])
      return
    }
    setProducts(demoProducts)
  }

  useEffect(() => {
    loadProducts()
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title || !form.image_url) {
      setMessage('أدخل عنوان المنتج وصورته على الأقل')
      return
    }
    if (hasSupabaseEnv && supabase) {
      const { error } = await supabase.from('products').insert(form)
      setMessage(error?.message || 'تمت إضافة المنتج إلى قاعدة البيانات')
      if (!error) {
        setForm(emptyProduct)
        loadProducts()
      }
    } else {
      setProducts([{ id: crypto.randomUUID(), ...form }, ...products])
      setForm(emptyProduct)
      setMessage('تمت إضافة المنتج محليًا في الوضع التجريبي')
    }
  }

  return (
    <div className="container page admin-layout">
      <section className="card">
        <h2>لوحة الإدارة</h2>
        <p className="muted">أضف منتجات جديدة وأدر المخزون. في وضع Supabase ستُحفَظ البيانات فعليًا في القاعدة.</p>
        <form className="stack" onSubmit={onSubmit}>
          <input className="input" placeholder="اسم المنتج" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <textarea className="input textarea" placeholder="وصف المنتج" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <input className="input" placeholder="رابط الصورة" value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
          <div className="grid two">
            <input className="input" placeholder="الفئة" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="input" type="number" placeholder="السعر" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          </div>
          <input className="input" type="number" placeholder="المخزون" value={form.stock} onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })} />
          <button className="btn primary" type="submit">حفظ المنتج</button>
          {message && <p className="success">{message}</p>}
        </form>
      </section>

      <section className="card">
        <h3>المنتجات الحالية</h3>
        <div className="stack compact">
          {products.map((product) => (
            <div className="list-row" key={product.id}>
              <div>
                <strong>{product.title}</strong>
                <p>{product.category} • {product.price.toLocaleString('ar-EG')} ج.م</p>
              </div>
              <span className="pill">مخزون {product.stock}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
