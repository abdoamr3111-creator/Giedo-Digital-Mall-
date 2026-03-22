import { demoProducts } from './demoData'
import type { CartItem, Product } from './supabase'

const CART_KEY = 'giedo_pro_cart'

export function getCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function setCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
}

export function addToCart(product: Product) {
  const current = getCart()
  const found = current.find((i) => i.id === product.id)
  if (found) {
    found.quantity += 1
  } else {
    current.push({ ...product, quantity: 1 })
  }
  setCart(current)
  return current
}

export function updateCartQuantity(productId: string, quantity: number) {
  const current = getCart()
    .map((item) => (item.id === productId ? { ...item, quantity } : item))
    .filter((item) => item.quantity > 0)
  setCart(current)
  return current
}

export function clearCart() {
  setCart([])
}

export async function getProductsFallback(): Promise<Product[]> {
  return demoProducts
}
