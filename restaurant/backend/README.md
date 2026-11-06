# مطعم الذوق — Backend (Flask + SQLite)

خادم **Flask** بسيط بقاعدة بيانات **SQL خام (SQLite)** لإدارة قائمة الطعام والحجوزات ورسائل التواصل لمطعم الذوق في اللاذقية.

> **التقنيات:** Flask 3.x فقط (بدون أطر عمل إضافية) + `sqlite3` من المكتبة القياسية (SQL خام بدون ORM).  
> **التزامًا للطلب:** لا Django ولا FastAPI ولا SQLAlchemy — فقط Flask + SQL.

---

## 📁 بنية المجلد

```
restaurant/backend/
├── app.py             ← خادم Flask (نقاط API + خدمة الـFrontend)
├── db.py              ← وحدة الاتصال بقاعدة البيانات (SQL خام)
├── schema.sql         ← مخطط قاعدة البيانات (CREATE TABLE)
├── seed.py            ← بيانات أولية (6 تصنيفات + 15 طبقًا)
├── config.py          ← الإعدادات (المنفذ، المسارات)
├── requirements.txt   ← التبعيات (Flask فقط)
├── README.md          ← هذا الملف (توثيق شامل)
├── SETUP.txt          ← دليل التشغيل السريع (نص عادي)
├── API.txt            ← مرجع نقاط API (نص عادي)
├── restaurant.db      ← قاعدة البيانات (تُنشأ تلقائيًا عند أول تشغيل)
└── flask.log          ← سجل الخادم (يُنشأ عند التشغيل)
```

---

## 🚀 التشغيل السريع

### المتطلبات
- Python 3.10 أو أحدث.
- تثبيت Flask:

```bash
cd restaurant/backend
python3 -m pip install -r requirements.txt
```

### الخطوات

```bash
# 1) تهيئة قاعدة البيانات + تعبئة البيانات الأولية
python3 seed.py

# 2) تشغيل الخادم
python3 app.py
```

افتح المتصفح على: **http://localhost:5000**

- الصفحة الرئيسية تخدم موقع الـFrontend (من مجلد `../frontend/`).
- الـAPI على: `http://localhost:5000/api/...`

---

## 🗄️ قاعدة البيانات

قاعدة بيانات SQLite (ملف واحد `restaurant.db`) — لا تحتاج تثبيت خادم قواعد بيانات.

### الجداول

| الجدول        | الوصف                                  |
|---------------|----------------------------------------|
| `categories`  | تصنيفات قائمة الطعام (6 صفوف)          |
| `dishes`      | الأطباق (15 صفًا) — اسم، سعر، صورة، تصنيف |
| `reservations`| الحجوزات — اسم، هاتف، عدد، تاريخ، وقت، حالة |
| `messages`    | رسائل التواصل من الزوّار                |

لعرض البيانات يدويًا:

```bash
python3 -c "
import sqlite3
c = sqlite3.connect('restaurant.db')
for r in c.execute('SELECT * FROM reservations ORDER BY id'):
    print(r)
"
```

أو بأي أداة SQLite مثل **DB Browser for SQLite** (واجهة رسومية مجانية).

---

## 🔌 ربط الـFrontend

الـFrontend جاهز للتكامل مع الباك إند. في ملف `../frontend/script.js`:

```js
const API_ENDPOINT = "/api/reservations?XTransformPort=5000";

async function submitReservation(values) {
  const resp = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  // ...
}
```

- عند تشغيل Flask محليًا وفتح `http://localhost:5000` → نفس الأصل، يعمل مباشرةً.
- في بيئة المعاينة (بوابة على المنفذ 81) يُمرّر الطلب إلى Flask عبر `XTransformPort=5000`.
- عند فتح `standalone.html` عبر `file://` (بدون خادم) → تُلتقط أخطاء الشبكة ويعرض المستخدم رسالة واضحة.

---

## 🌐 نطاق المنفذ

| الخدمة    | المنفذ | الوصف                      |
|-----------|--------|-----------------------------|
| Flask API | 5000   | خادم الـBackend (هذا المشروع) |
| Next.js   | 3000   | خادم الـFrontend في المعاينة |
| Caddy     | 81     | البوابة (توجيه الطلبات)     |

---

## 📚 توثيق إضافي

- **SETUP.txt** — دليل تشغيل سريع بنص عادي (قابل للعرض في أي محرّر).
- **API.txt** — مرجع كامل لنقاط الـAPI (نص عادي).

---

## 🔒 ملاحظات الإنتاج

هذا الخادم يستخدم خادم تطوير Flask (`app.run`). للنشر الإنتاجي استخدم خادم WSGI حقيقيًا:

```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

كما يُستحسَن:
- تغيير `DEBUG = False` في `config.py`.
- إضافة تحقق أقوى للمدخلات.
- تقييد CORS بدل `*`.
- نسخ احتياطي دوري لملف `restaurant.db`.

---

© مطعم الذوق — اللاذقية
