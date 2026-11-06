# =========================================================
# مطعم الذوق - خادم Flask (API + خدمة الـFrontend)
# Flask فقط + sqlite3 (SQL خام) — بدون مكتبات إضافية
# =========================================================
import os
from flask import Flask, request, jsonify, send_from_directory
from db import get_db, init_db
from config import FRONTEND_DIR, PORT, DEBUG, HOST, RESTAURANT

# إنشاء التطبيق بدون مجلد static افتراضي (نخدم الـfrontend يدويًا)
app = Flask(__name__, static_folder=None)
app.config["JSON_AS_ASCII"] = False  # دعم العربية في استجابات JSON


# ---------------------------------------------------------
# CORS يدوي (بدون Flask-CORS — التزامًا بطلب "Flask فقط")
# ---------------------------------------------------------
@app.after_request
def add_cors_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return resp


# =========================================================
# نقاط الـAPI
# =========================================================

@app.route("/api/health")
def health():
    """فحص صحة الخادم."""
    return jsonify({"status": "ok", "service": RESTAURANT["name"] + " API"})


@app.route("/api/info")
def info():
    """معلومات المطعم."""
    return jsonify(RESTAURANT)


# ----- التصنيفات -----
@app.route("/api/categories")
def get_categories():
    db = get_db()
    rows = db.execute(
        "SELECT key, label FROM categories ORDER BY sort_order"
    ).fetchall()
    return jsonify([dict(r) for r in rows])


# ----- قائمة الطعام -----
@app.route("/api/menu")
def get_menu():
    category = request.args.get("category", "all")
    db = get_db()
    if category and category != "all":
        rows = db.execute(
            "SELECT id, name, category_key, description, price, rating, image "
            "FROM dishes WHERE available = 1 AND category_key = ? ORDER BY id",
            (category,),
        ).fetchall()
    else:
        rows = db.execute(
            "SELECT id, name, category_key, description, price, rating, image "
            "FROM dishes WHERE available = 1 ORDER BY id"
        ).fetchall()
    return jsonify([dict(r) for r in rows])


# ----- الحجوزات -----
@app.route("/api/reservations", methods=["GET", "POST", "OPTIONS"])
def reservations():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})

    if request.method == "GET":
        db = get_db()
        rows = db.execute(
            "SELECT * FROM reservations ORDER BY created_at DESC"
        ).fetchall()
        return jsonify([dict(r) for r in rows])

    # POST: إنشاء حجز جديد
    data = request.get_json(silent=True) or {}
    errors = validate_reservation(data)
    if errors:
        return jsonify({"ok": False, "errors": errors}), 400

    db = get_db()
    try:
        cur = db.execute(
            "INSERT INTO reservations (name, phone, people, date, time, notes, status) "
            "VALUES (?, ?, ?, ?, ?, ?, 'pending')",
            (
                data["name"].strip(),
                data["phone"].strip(),
                str(data["people"]),
                data["date"],
                data["time"],
                (data.get("notes") or "").strip(),
            ),
        )
        db.commit()
        rid = cur.lastrowid
        ref = "R-" + str(rid).zfill(6)
        return jsonify({"ok": True, "ref": ref, "id": rid}), 201
    finally:
        db.close()


@app.route("/api/reservations/<int:rid>", methods=["GET"])
def get_reservation(rid):
    db = get_db()
    row = db.execute(
        "SELECT * FROM reservations WHERE id = ?", (rid,)
    ).fetchone()
    db.close()
    if not row:
        return jsonify({"ok": False, "error": "الحجز غير موجود"}), 404
    return jsonify(dict(row))


@app.route("/api/reservations/<int:rid>/status", methods=["POST", "OPTIONS"])
def update_status(rid):
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    data = request.get_json(silent=True) or {}
    new_status = (data.get("status") or "").strip()
    if new_status not in ("pending", "confirmed", "cancelled"):
        return jsonify({"ok": False, "error": "حالة غير صالحة"}), 400
    db = get_db()
    try:
        cur = db.execute(
            "UPDATE reservations SET status = ? WHERE id = ?",
            (new_status, rid),
        )
        db.commit()
        if cur.rowcount == 0:
            return jsonify({"ok": False, "error": "الحجز غير موجود"}), 404
        return jsonify({"ok": True, "id": rid, "status": new_status})
    finally:
        db.close()


# ----- التواصل -----
@app.route("/api/contact", methods=["POST", "OPTIONS"])
def contact():
    if request.method == "OPTIONS":
        return jsonify({"ok": True})
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    errors = {}
    if len(name) < 2:
        errors["name"] = "الاسم مطلوب"
    if not message:
        errors["message"] = "الرسالة مطلوبة"
    if errors:
        return jsonify({"ok": False, "errors": errors}), 400

    db = get_db()
    try:
        cur = db.execute(
            "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)",
            (name, email, message),
        )
        db.commit()
        return jsonify({"ok": True, "id": cur.lastrowid}), 201
    finally:
        db.close()


# =========================================================
# دوال مساعدة
# =========================================================
def validate_reservation(d):
    """التحقق من بيانات الحجز — إرجاع dict بالأخطاء (فارغ = صحيح)."""
    errors = {}
    name = (d.get("name") or "").strip()
    phone = (d.get("phone") or "").strip()
    people = d.get("people")
    date = d.get("date")
    time = d.get("time")

    if len(name) < 2:
        errors["name"] = "الاسم مطلوب (حرفان على الأقل)"
    digits = "".join(c for c in phone if c.isdigit())
    if len(digits) < 8 or len(digits) > 13:
        errors["phone"] = "رقم هاتف غير صحيح (8-13 رقمًا)"
    if not people:
        errors["people"] = "عدد الأشخاص مطلوب"
    if not date:
        errors["date"] = "التاريخ مطلوب"
    if not time:
        errors["time"] = "الوقت مطلوب"
    return errors


# =========================================================
# خدمة الـFrontend (ملفات ثابتة + index.html)
# =========================================================
@app.route("/")
def index():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/<path:filename>")
def static_files(filename):
    # لا تخدم مسارات /api عبر هذا المُلتقط
    if filename.startswith("api/"):
        return jsonify({"ok": False, "error": "المسار غير موجود"}), 404
    return send_from_directory(FRONTEND_DIR, filename)


# =========================================================
# نقطة الإقلاع
# =========================================================
if __name__ == "__main__":
    init_db()  # أنشئ الجداول إن لم تكن موجودة
    print(f"🍽️  خادم مطعم الذوق يعمل على http://localhost:{PORT}")
    print(f"   • الـAPI:       http://localhost:{PORT}/api/health")
    print(f"   • الموقع:      http://localhost:{PORT}/")
    app.run(host=HOST, port=PORT, debug=DEBUG, use_reloader=False)
