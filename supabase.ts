import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const hasSupabaseEnv = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = hasSupabaseEnv
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Product = {
  id: string
  title: string
  description: string
  price: number
  image_url: string
  category: string
  stock: number
  created_at?: string
}

export type Order = {
  id: string
  user_id: string
  total_amount: number
  status: 'pending' | 'paid' | 'shipped' | 'cancelled'
  created_at?: string
}

export type CartItem = Product & { quantity: number }
