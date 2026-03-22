import { useEffect, useMemo, useState } from 'react'
import { clearCart, getCart, updateCartQuantity } from '../lib/store'
import { hasSupabaseEnv, supabase, type CartItem } from '../lib/supabase'

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    setItems(getCart())
  }, [])

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items])

  const changeQty = (id: string, qty: number) => {
    const next = updateCartQuantity(id, qty)
    setItems(next)
    window.dispatchEvent(new Event('cart-updated'))
  }

  const checkout = async () => {
    if (!items.length) return
    if (hasSupabaseEnv && supabase) {
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id
      if (userId) {
        await supabase.from('orders').insert({ user_id: userId, total_amount: total, status: 'pending' })
        setMessage('تم إنشاء الطلب في قاعدة البيانات بنجاح')
      } else {
        setMessage('تم حفظ الطلب محليًا. سجّل الدخول لربطه بقاعدة البيانات.')
      }
    } else {
      setMessage('تم إنشاء الطلب محليًا في الوضع التجريبي.')
    }
    clearCart()
    setItems([])
    window.dispatchEvent(new Event('cart-updated'))
  }

  return (
    <div className="container page">
      <h2>سلة المشتريات</h2>
      <div className="stack">
        {items.length === 0 && <div className="card">السلة فارغة حالياً.</div>}
        {items.map((item) => (
          <div className="card cart-row" key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.price.toLocaleString('ar-EG')} ج.م</p>
            </div>
            <div className="qty-controls">
              <button className="btn small" onClick={() => changeQty(item.id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button className="btn small" onClick={() => changeQty(item.id, item.quantity + 1)}>+</button>
            </div>
          </div>
        ))}
        <div className="card checkout-box">
          <strong>الإجمالي: {total.toLocaleString('ar-EG')} ج.م</strong>
          <button className="btn primary" onClick={checkout}>تنفيذ الطلب</button>
          {message && <p className="success">{message}</p>}
        </div>
      </div>
    </div>
  )
}
