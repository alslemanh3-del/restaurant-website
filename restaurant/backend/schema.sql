-- =========================================================
-- مطعم الذوق - قاعدة البيانات (SQLite - SQL خام)
-- =========================================================

-- التصنيفات
CREATE TABLE IF NOT EXISTS categories (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    key         TEXT    NOT NULL UNIQUE,        -- appetizers, mains, grills, salads, desserts, drinks
    label       TEXT    NOT NULL,               -- الاسم العربي المعروض
    sort_order INTEGER  DEFAULT 0
);

-- الأطباق
CREATE TABLE IF NOT EXISTS dishes (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    name         TEXT    NOT NULL,
    category_key TEXT    NOT NULL,
    description  TEXT,
    price        REAL    NOT NULL,
    rating       REAL    DEFAULT 4.5,
    image        TEXT,                            -- مسار الصورة (مثال: img/hummus.png)
    available    INTEGER DEFAULT 1,               -- 1 = متوفر، 0 = غير متوفر
    created_at   TEXT    DEFAULT (datetime('now')),
    FOREIGN KEY (category_key) REFERENCES categories(key)
);

-- الحجوزات
CREATE TABLE IF NOT EXISTS reservations (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    phone      TEXT    NOT NULL,
    people     TEXT    NOT NULL,                 -- نص (قد يكون "أكثر من 8")
    date       TEXT    NOT NULL,                 -- YYYY-MM-DD
    time       TEXT    NOT NULL,                 -- HH:MM
    notes      TEXT,
    status     TEXT    DEFAULT 'pending',        -- pending | confirmed | cancelled
    created_at TEXT    DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- رسائل التواصل
CREATE TABLE IF NOT EXISTS messages (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    email      TEXT    NOT NULL,
    message    TEXT    NOT NULL,
    created_at TEXT    DEFAULT (datetime('now'))
);
