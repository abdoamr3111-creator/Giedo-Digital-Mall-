import { useState } from 'react'
import { hasSupabaseEnv, supabase } from '../lib/supabase'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const signup = async () => {
    if (!email || !password) return setMessage('أدخل البريد الإلكتروني وكلمة المرور')
    if (hasSupabaseEnv && supabase) {
      const { error } = await supabase.auth.signUp({ email, password })
      setMessage(error?.message || 'تم إنشاء الحساب. تحقق من بريدك الإلكتروني إن لزم.')
    } else {
      localStorage.setItem('giedo_demo_user', JSON.stringify({ email }))
      setMessage('تم إنشاء حساب تجريبي محلي.')
    }
  }

  const signin = async () => {
    if (!email || !password) return setMessage('أدخل البريد الإلكتروني وكلمة المرور')
    if (hasSupabaseEnv && supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      setMessage(error?.message || 'تم تسجيل الدخول بنجاح')
    } else {
      localStorage.setItem('giedo_demo_user', JSON.stringify({ email }))
      setMessage('تم تسجيل الدخول في الوضع التجريبي.')
    }
  }

  const signout = async () => {
    if (hasSupabaseEnv && supabase) {
      await supabase.auth.signOut()
      setMessage('تم تسجيل الخروج')
    } else {
      localStorage.removeItem('giedo_demo_user')
      setMessage('تم تسجيل الخروج من الوضع التجريبي')
    }
  }

  return (
    <div className="container page narrow">
      <div className="card auth-card">
        <h2>تسجيل الدخول والحسابات</h2>
        <input className="input" type="email" placeholder="البريد الإلكتروني" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" type="password" placeholder="كلمة المرور" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className="actions wrap">
          <button className="btn primary" onClick={signin}>تسجيل الدخول</button>
          <button className="btn secondary" onClick={signup}>إنشاء حساب</button>
          <button className="btn ghost" onClick={signout}>تسجيل الخروج</button>
        </div>
        <p className="muted">{hasSupabaseEnv ? 'Supabase Auth مفعل' : 'الوضع التجريبي يعمل بدون مفاتيح بيئة'}</p>
        {message && <p className="success">{message}</p>}
      </div>
    </div>
  )
}
