================================================================
  مطعم الذوق — مشروع كامل في ملف مضغوط واحد
================================================================

الملف الوحيد في هذا المجلد:

    مطعم-الذوق-ملفات-الموقع.zip

يحتوي على كل شيء (Frontend + Backend + الصور + التوثيق):
    restaurant/
    ├── frontend/  (index.html, style.css, script.js, standalone.html, img/)
    └── backend/   (app.py, db.py, schema.sql, seed.py, ... + start.bat)

للتشغيل بعد فك الضغط:
    cd restaurant\backend
    python -m pip install -r requirements.txt
    python seed.py
    python app.py      (أو انقر مرتين على start.bat)

ثم افتح المتصفّح على:  http://localhost:5000
================================================================
