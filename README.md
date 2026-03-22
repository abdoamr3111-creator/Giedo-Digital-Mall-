# Giedo Digital Mall Pro

مشروع متجر إلكتروني احترافي مبني بـ React + Vite + TypeScript مع دعم Supabase.

## التشغيل المحلي

```bash
npm install
npm run dev
```

## ربط Supabase

1. انسخ `.env.example` إلى `.env`
2. ضع:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. طبّق ملف التهيئة الأولي الموجود في:
   - `supabase/migrations/20260322_init_giedo_digital_mall.sql`
   أو نفّذه يدويًا من `supabase/schema.sql`

## النشر التلقائي

المشروع الآن يحتوي على إعدادين تلقائيين:

- `.github/workflows/vercel-deploy.yml` لنشر الواجهة تلقائيًا على Vercel
- `.github/workflows/supabase-db.yml` لتطبيق Migrations على Supabase عند أي Push إلى `main` داخل مجلد `supabase/`

### GitHub Secrets المطلوبة

#### لـ Vercel
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

#### لـ Supabase
- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_ID`

## أسرع مسار تشغيل فعلي

1. أنشئ مشروعًا جديدًا في Supabase
2. خذ `Project URL` و `anon key`
3. أضف القيم إلى `.env` وإلى GitHub Secrets
4. ارفع هذا المشروع إلى GitHub
5. اربطه بمشروع Vercel أو املأ Secrets الخاصة بـ Vercel Actions
6. أي Push جديد إلى `main` سيبني الواجهة وينشرها، وأي تعديل داخل `supabase/` سيدفع Migrations لقاعدة البيانات

## الصفحات

- `/` الرئيسية
- `/products` المنتجات
- `/cart` السلة
- `/auth` تسجيل الدخول وإنشاء الحساب
- `/admin` لوحة الإدارة

## ملاحظات مهمة

- لا يمكن تنفيذ نشر فعلي على حساب Supabase أو Vercel من داخل هذه الجلسة بدون مفاتيح الوصول الخاصة بك.
- لذلك تم تجهيز المشروع ليكون جاهزًا للنشر التلقائي الحقيقي بمجرد وضع Secrets في GitHub.

## استخدام Manus

هذه النسخة مناسبة للتسليم إلى Manus لأن Manus يوفّر بناء تطبيقات ويب كاملة من المحادثة، مع قاعدة بيانات وخلفية ومصادقة، كما يتيح تصدير الكود وربط نطاق مخصص. كما يدعم تكاملات/Connectors مع خدمات خارجية مثل GitHub وقواعد البيانات. راجع ملفات مجلد `../manus` لاستخدام البرومبتات الجاهزة.

خطوات العمل المقترحة مع Manus:
1. ارفع هذا المشروع إلى GitHub.
2. افتح Manus والصق محتوى `manus/MASTER_PROMPT_AR.md` بعد تزويده برابط المستودع أو برفع الملفات.
3. زوده بأي Secrets/Access من حسابك داخل Manus أو GitHub/Vercel/Supabase.
4. اطلب منه إكمال الربط والنشر النهائي.
