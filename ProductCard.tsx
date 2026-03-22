import type { Product } from '../lib/supabase'
import { addToCart } from '../lib/store'

export default function ProductCard({ product }: { product: Product }) {
  const onAdd = () => {
    addToCart(product)
    window.dispatchEvent(new Event('cart-updated'))
    alert('تمت إضافة المنتج إلى السلة')
  }

  return (
    <article className="card product-card">
      <img src={product.image_url} alt={product.title} className="product-image" />
      <div className="product-body">
        <span className="pill">{product.category}</span>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <div className="product-meta">
          <strong>{product.price.toLocaleString('ar-EG')} ج.م</strong>
          <span>المخزون: {product.stock}</span>
        </div>
        <button className="btn primary" onClick={onAdd}>أضف للسلة</button>
      </div>
    </article>
  )
}
