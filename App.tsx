import { Link, NavLink, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'
import { getCart } from './lib/store'
import { useEffect, useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const sync = () => setCount(getCart().reduce((s, i) => s + i.quantity, 0))
    sync()
    window.addEventListener('storage', sync)
    window.addEventListener('cart-updated', sync as EventListener)
    return () => {
      window.removeEventListener('storage', sync)
      window.removeEventListener('cart-updated', sync as EventListener)
    }
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <Link to="/" className="brand">Giedo Digital Mall Pro</Link>
          <nav className="nav">
            <NavLink to="/">الرئيسية</NavLink>
            <NavLink to="/products">المنتجات</NavLink>
            <NavLink to="/cart">السلة <span className="badge">{count}</span></NavLink>
            <NavLink to="/auth">الدخول</NavLink>
            <NavLink to="/admin">الإدارة</NavLink>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>Giedo Digital Mall Pro</strong>
            <p>متجر إلكتروني احترافي جاهز للنشر، مع دعم Supabase وقاعدة بيانات حقيقية.</p>
          </div>
          <div>
            <p>نسخة تشغيل مباشر + نسخة جاهزة للربط السحابي.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
