import { Link } from 'react-router-dom'
import { hasSupabaseEnv } from '../lib/supabase'

export default function HomePage() {
  return (
    <div className="container page">
      <section className="hero card hero-card">
        <div>
          <p className="eyebrow">منصة تجارة إلكترونية احترافية</p>
          <h1>مشروع حقيقي جاهز للنشر والعمل</h1>
          <p>
            هذه النسخة مبنية لتعمل مباشرة، وتدعم ربط قاعدة بيانات حقيقية عبر Supabase.
            يوجد تسجيل دخول، منتجات، سلة، طلبات، ولوحة إدارة مبدئية.
          </p>
          <div className="actions">
            <Link className="btn primary" to="/products">ابدأ التصفح</Link>
            <Link className="btn secondary" to="/admin">لوحة الإدارة</Link>
          </div>
        </div>
        <div className="status-panel">
          <div className="status-item">
            <span>وضع الربط</span>
            <strong>{hasSupabaseEnv ? 'Supabase مفعل' : 'Demo Mode'}</strong>
          </div>
          <div className="status-item">
            <span>التشغيل</span>
            <strong>جاهز للنشر على Vercel</strong>
          </div>
          <div className="status-item">
            <span>المزايا</span>
            <strong>Auth + Cart + Orders + Admin</strong>
          </div>
        </div>
      </section>

      <section className="grid three stats">
        <div className="card stat-card"><strong>قاعدة بيانات</strong><p>ملف SQL جاهز في مجلد supabase</p></div>
        <div className="card stat-card"><strong>دخول وتسجيل</strong><p>عبر Supabase Auth أو وضع تجريبي فوري</p></div>
        <div className="card stat-card"><strong>نشر سريع</strong><p>Vite + React + ملفات إعداد واضحة</p></div>
      </section>
    </div>
  )
}
