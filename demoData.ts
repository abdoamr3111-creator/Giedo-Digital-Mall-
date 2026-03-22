import type { Product } from './supabase'

export const demoProducts: Product[] = [
  {
    id: '1',
    title: 'Giedo Smart Watch X1',
    description: 'ساعة ذكية بتصميم أنيق، تتبع الصحة، وإشعارات فورية.',
    price: 2499,
    image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    category: 'إلكترونيات',
    stock: 18,
  },
  {
    id: '2',
    title: 'حقيبة أعمال جلدية',
    description: 'حقيبة عملية للمكتب والسفر بخامات ممتازة.',
    price: 1899,
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    category: 'أزياء',
    stock: 11,
  },
  {
    id: '3',
    title: 'سماعة لاسلكية ProSound',
    description: 'صوت نقي، عزل ضوضاء، وبطارية تدوم طويلاً.',
    price: 1399,
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    category: 'إلكترونيات',
    stock: 30,
  },
  {
    id: '4',
    title: 'كرسي مكتب مريح',
    description: 'دعم ظهر ممتاز مناسب لساعات العمل الطويلة.',
    price: 3299,
    image_url: 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80',
    category: 'مكتب',
    stock: 8,
  }
]
