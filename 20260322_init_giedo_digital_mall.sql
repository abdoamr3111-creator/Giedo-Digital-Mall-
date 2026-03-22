-- Giedo Digital Mall Pro schema for Supabase
create extension if not exists pgcrypto;

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  price numeric(12,2) not null default 0,
  image_url text not null default '',
  category text not null default 'عام',
  stock integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  total_amount numeric(12,2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'paid', 'shipped', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
alter table public.orders enable row level security;

create policy "products are readable by everyone"
  on public.products for select using (true);

create policy "authenticated users can insert products"
  on public.products for insert to authenticated with check (true);

create policy "users can view own orders"
  on public.orders for select to authenticated using ((select auth.uid()) = user_id);

create policy "users can create own orders"
  on public.orders for insert to authenticated with check ((select auth.uid()) = user_id);

insert into public.products (title, description, price, image_url, category, stock)
values
('Giedo Smart Watch X1', 'ساعة ذكية بتصميم أنيق، تتبع الصحة، وإشعارات فورية.', 2499, 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80', 'إلكترونيات', 18),
('حقيبة أعمال جلدية', 'حقيبة عملية للمكتب والسفر بخامات ممتازة.', 1899, 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80', 'أزياء', 11),
('سماعة لاسلكية ProSound', 'صوت نقي، عزل ضوضاء، وبطارية تدوم طويلاً.', 1399, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80', 'إلكترونيات', 30),
('كرسي مكتب مريح', 'دعم ظهر ممتاز مناسب لساعات العمل الطويلة.', 3299, 'https://images.unsplash.com/photo-1505843513577-22bb7d21e455?auto=format&fit=crop&w=1200&q=80', 'مكتب', 8)
on conflict do nothing;
