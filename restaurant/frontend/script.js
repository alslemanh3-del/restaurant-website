/* =========================================================
   مطعم الذوق - script.js
   تطبيق React كامل (JSX يُترجم داخل المتصفح بواسطة Babel)
   React + ReactDOM من CDN — بدون Vite / بدون Node
   ========================================================= */

const { useState, useEffect, useRef, useMemo } = React;

/* =========================================================
   أيقونات SVG (Feather-style) — بدون مكتبات خارجية
   ========================================================= */
const Icon = {
  Utensils: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 2v7c0 1.1.9 2 2 2h0a2 2 0 0 0 2-2V2M5 2v20M21 15V2a4 4 0 0 0-4 4v9c0 1.1.9 2 2 2h2v6"/></svg>),
  Menu: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>),
  X: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>),
  Phone: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.69 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.26a2 2 0 0 1 2.11-.45c.74.33 1.53.56 2.34.69A2 2 0 0 1 22 16.92z"/></svg>),
  Mail: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></svg>),
  MapPin: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>),
  Clock: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>),
  Star: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>),
  ArrowLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>),
  ChevronRight: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="9 18 15 12 9 6"/></svg>),
  ChevronLeft: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><polyline points="15 18 9 12 15 6"/></svg>),
  ArrowUp: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>),
  Calendar: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>),
  Users: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>),
  CheckCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>),
  AlertCircle: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>),
  Leaf: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>),
  Award: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>),
  Heart: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>),
  Sparkles: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3z"/></svg>),
  Plus: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>),
  Zoom: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>),
  Facebook: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>),
  Instagram: (p) => (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>),
  WhatsApp: (p) => (<svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.6-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12.02 21.5h-.01a9.46 9.46 0 0 1-4.82-1.32l-.35-.2-3.58.94.96-3.49-.23-.36a9.45 9.45 0 0 1-1.45-5.05c0-5.22 4.25-9.47 9.48-9.47 2.53 0 4.9.99 6.69 2.78a9.4 9.4 0 0 1 2.77 6.7c0 5.22-4.25 9.47-9.47 9.47zM20.45 3.55A11.2 11.2 0 0 0 12.02.13C5.8.13.74 5.19.74 11.41c0 1.98.52 3.91 1.5 5.62L.64 21.4l4.5-1.18a11.18 11.18 0 0 0 5.36 1.37h.01c6.22 0 11.28-5.06 11.28-11.28 0-3.01-1.17-5.84-3.3-7.97z"/></svg>),
};

/* =========================================================
   بيانات المطعم
   ========================================================= */
const RESTAURANT = {
  name: "مطعم الذوق",
  tagline: "Al-Thawq",
  city: "اللاذقية",
  phone: "+963 41 552 3344",
  phoneHref: "+963415523344",
  whatsapp: "+963 944 221 889",
  whatsappHref: "https://wa.me/963944221889",
  email: "info@al-thawq.com",
  address: "اللاذقية - شارع الكورنيش البحري - مقابل ميناء اليخت",
  hours: "السبت - الخميس: 12:00 ظهراً - 12:00 منتصف الليل",
  hoursFri: "الجمعة: 2:00 عصراً - 1:00 صباحاً",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
  },
};

const NAV_LINKS = [
  { id: "home", label: "الرئيسية" },
  { id: "menu", label: "قائمة الطعام" },
  { id: "about", label: "من نحن" },
  { id: "gallery", label: "معرض الصور" },
  { id: "reservation", label: "الحجز" },
  { id: "contact", label: "التواصل" },
];

const CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "appetizers", label: "المقبلات" },
  { id: "mains", label: "الأطباق الرئيسية" },
  { id: "grills", label: "المشاوي" },
  { id: "salads", label: "السلطات" },
  { id: "desserts", label: "الحلويات" },
  { id: "drinks", label: "المشروبات" },
];

const DISHES = [
  { id: 1, name: "حمص بطحينة", cat: "appetizers", price: 25, rating: 4.9, img: "img/hummus.png", desc: "حمص شامي أصيل مع زيت الزيتون البكر والكمون والصنوبر المحمّص، يقدّم مع الخبز العربي الطازج." },
  { id: 2, name: "متبّل باذنجان", cat: "appetizers", price: 22, rating: 4.7, img: "img/mutabbal.png", desc: "باذنجان مشوي على الفحم مهروس مع الطحينة واللبن والرمان، نكهة مدخّنة أصيلة لا تُقاوم." },
  { id: 3, name: "فلافل بالطحينة", cat: "appetizers", price: 20, rating: 4.8, img: "img/falafel.png", desc: "أقراص الفلافل الذهبية المقرمشة محضّرة من الحمّص البلدي، مع صلصة الطحينة والمخللات البيتية." },
  { id: 4, name: "منسف أردني", cat: "mains", price: 85, rating: 5.0, img: "img/mansaf.png", desc: "المنسف الملكي، لحم الغنم الطري على أرز الجميد مع اللوز والصنوبر، طبق المناسبات الأصيل." },
  { id: 5, name: "كبسة دجاج", cat: "mains", price: 65, rating: 4.9, img: "img/kabsa.png", desc: "كبسة الأرز البسمتي المتوّبل مع الدجاج المشوي والمكسرات والزبيب على الطريقة الخليجية." },
  { id: 6, name: "مقلوبة بالخضار", cat: "mains", price: 70, rating: 4.8, img: "img/maqluba.png", desc: "المقلوبة الفلسطينية، أرز بالزعفران مع الباذنجان والقرنبيط ولحم الغنم، تُقلب على المائدة." },
  { id: 7, name: "شيش طاووق", cat: "grills", price: 55, rating: 4.9, img: "img/shish-tawook.png", desc: "أصابع الدجاج المتبّلة باللبن والثوم والليمون مشوية على الفحم، مع صلصة الثوم الكثيفة." },
  { id: 8, name: "كباب حلبي", cat: "grills", price: 60, rating: 5.0, img: "img/kebab.png", desc: "كباب حلب الأصيل من اللحم المفروم المتبّل بالفلفل الحلبي والبهارات الشرقية، مع الخضار المشوية." },
  { id: 9, name: "مشاوي مشكّلة", cat: "grills", price: 95, rating: 5.0, img: "img/mixed-grill.png", desc: "تشكيلة فاخرة من الكباب والشيش طاووق وأضلاع الغنم مع الأرز والخضار المشوية، تكفي لشخصين." },
  { id: 10, name: "تبولة", cat: "salads", price: 25, rating: 4.8, img: "img/tabbouleh.png", desc: "بقدونس طازج مفروم ناعم مع البرغل والطماطم والنعناع وعصير الليمون وزيت الزيتون." },
  { id: 11, name: "فتّوش", cat: "salads", price: 28, rating: 4.7, img: "img/fattoush.png", desc: "خضار موسمية طازجة مع رقائق الخبز المقلية والدبس الرمان والسماق، نكهة لبنانية أصيلة." },
  { id: 12, name: "كنافة بالجبنة", cat: "desserts", price: 35, rating: 4.9, img: "img/kunafa.png", desc: "كنافة عصاجنية ذهبية محشوة بالجبنة العكاوي مع القطر والفستق الحلبي المطحون." },
  { id: 13, name: "بقلاوة مشكّلة", cat: "desserts", price: 30, rating: 4.7, img: "img/baklava.png", desc: "تشكيلة بقلاوة بالفستق والجوز مع العسل والسمن البلدي، تحلية شرقية فاخرة." },
  { id: 14, name: "عصير ليمون بالنعناع", cat: "drinks", price: 18, rating: 4.8, img: "img/lemon-mint.png", desc: "عصير ليمون طازج مع النعناع البلدي والثلج المجروش، كوب منعش يروي العطش." },
  { id: 15, name: "قهوة عربية", cat: "drinks", price: 15, rating: 4.9, img: "img/arabic-coffee.png", desc: "قهوة عربية محمّصة على الطريقة الشامية مع الهيل والزعفران، تقدّم مع التمر الفاخر." },
];

const FEATURES = [
  { icon: "Leaf", title: "مكوّنات طازجة يومياً", text: "نختار أجود الخضار واللحوم الطازجة من مصادر موثوقة كل صباح لنضمن لك أفضل نكهة." },
  { icon: "Award", title: "طهاة بخبرة 20 عاماً", text: "فريق من أمهر الطهاة العرب المتخصصين في المطبخ الشرقي الأصيل بخبرة تتجاوز العقدين." },
  { icon: "Heart", title: "أجواء عائلية دافئة", text: "تصميم أنيق يجمع بين الأصالة والحداثة، يليق بالعائلات والمناسبات الخاصة والجلسات المريحة." },
  { icon: "Sparkles", title: "خدمة مميّزة وسريعة", text: "نعتني بأدق التفاصيل لنقدّم لك تجربة طعام متكاملة مع خدمة سريعة ومهنية وابتسامة دائمة." },
];

const GALLERY = [
  { img: "img/hero.png", caption: "صالة المطعم الأنيقة", span: "wide" },
  { img: "img/mixed-grill.png", caption: "مشاوي مشكّلة فاخرة", span: "" },
  { img: "img/kunafa.png", caption: "كنافة بالفستق الحلبي", span: "" },
  { img: "img/about.png", caption: "مطبخنا المفتوح", span: "tall" },
  { img: "img/fattoush.png", caption: "سلطات شرقية طازجة", span: "" },
  { img: "img/kabsa.png", caption: "كبسة دجاج متبّلة", span: "" },
  { img: "img/maqluba.png", caption: "مقلوبة على الطريقة الفلسطينية", span: "wide" },
  { img: "img/kebab.png", caption: "كباب حلبي على الفحم", span: "" },
];

const STATS = [
  { value: "+20", label: "سنة من الخبرة" },
  { value: "+50", label: "طبقاً أصيلاً" },
  { value: "+30k", label: "زبون سعيد" },
  { value: "4.9", label: "تقييم الزوّار" },
];

/* =========================================================
   خطّاف مساعد
   ========================================================= */
function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join(",")]);
  return active;
}

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/* التمرير السلس إلى قسم */
function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* =========================================================
   شريط التنقل
   ========================================================= */
function Navbar({ activeId, onNavClick }) {
  const scrolled = useScrolled(40);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleNav = (id) => {
    onNavClick(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header className={`navbar${scrolled ? " navbar--scrolled" : ""}`} role="banner">
        <div className="navbar__inner">
          <a className="brand" href="#home" onClick={(e) => { e.preventDefault(); handleNav("home"); }} aria-label={RESTAURANT.name}>
            <span className="brand__mark"><Icon.Utensils /></span>
            <span className="brand__name">
              <strong>مطعم الذوق</strong>
              <span>Al-Thawq · Latakia</span>
            </span>
          </a>

          <nav className="nav-links" aria-label="التنقل الرئيسي">
            {NAV_LINKS.map((link) => (
              <a key={link.id} href={`#${link.id}`}
                 className={activeId === link.id ? "active" : ""}
                 onClick={(e) => { e.preventDefault(); handleNav(link.id); }}>
                {link.label}
              </a>
            ))}
          </nav>

          <div className="nav-cta">
            <a href="#reservation" className="btn btn--accent"
               onClick={(e) => { e.preventDefault(); handleNav("reservation"); }}>
              احجز طاولة
            </a>
            <button className="nav-toggle" aria-label="فتح القائمة" aria-expanded={mobileOpen}
                    onClick={() => setMobileOpen(true)}>
              <Icon.Menu />
            </button>
          </div>
        </div>
      </header>

      {/* قائمة الجوال */}
      <div className={`overlay${mobileOpen ? " overlay--show" : ""}`} onClick={() => setMobileOpen(false)} />
      <aside className={`mobile-menu${mobileOpen ? " mobile-menu--open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu__head">
          <strong>القائمة</strong>
          <button className="mobile-menu__close" aria-label="إغلاق" onClick={() => setMobileOpen(false)}>
            <Icon.X />
          </button>
        </div>
        {NAV_LINKS.map((link) => (
          <a key={link.id} href={`#${link.id}`}
             className={activeId === link.id ? "active" : ""}
             onClick={(e) => { e.preventDefault(); handleNav(link.id); }}>
            {link.label}
          </a>
        ))}
        <a href="#reservation" className="btn btn--accent btn--block"
           onClick={(e) => { e.preventDefault(); handleNav("reservation"); }}>
          احجز طاولة الآن
        </a>
      </aside>
    </>
  );
}

/* =========================================================
   قسم الـ Hero
   ========================================================= */
function Hero({ onNavClick }) {
  return (
    <section id="home" className="hero">
      <div className="container">
        <div className="hero__inner">
          <span className="hero__eyebrow">
            <Icon.Sparkles /> مطعم عربي أصيل · منذ 2003
          </span>
          <h1 className="hero__title">
            نكهة الشرق الأصيلة <br /> في قلب <span>اللاذقية</span>
          </h1>
          <p className="hero__desc">
            في مطعم الذوق نُعيد إحياء وصفات المطبخ العربي العريق بأجود المكوّنات الطازجة وأيدٍ ماهرة.
            أطباق مشاوي على الفحم، مقبلات شامية، وحلويات شرقية فاخرة، في أجواء عائلية أنيقة تليق بك.
          </p>
          <div className="hero__actions">
            <button className="btn btn--accent" onClick={() => onNavClick("menu")}>
              <Icon.Menu /> شاهد قائمة الطعام
            </button>
            <button className="btn btn--ghost" onClick={() => onNavClick("reservation")}>
              <Icon.Calendar /> احجز طاولة
            </button>
          </div>
          <div className="hero__meta">
            <span className="hero__meta-item"><Icon.MapPin /> <b>اللاذقية - الكورنيش البحري</b></span>
            <span className="hero__meta-item"><Icon.Clock /> <b>يومياً 12 ظهراً - 12 منتصف الليل</b></span>
            <span className="hero__meta-item"><Icon.Star /> <b>4.9/5 تقييم الزوّار</b></span>
          </div>
        </div>
      </div>
      <div className="scroll-cue" aria-hidden="true"><span className="scroll-cue__dot"></span></div>
    </section>
  );
}

/* =========================================================
   قائمة الطعام
   ========================================================= */
function DishCard({ dish }) {
  return (
    <article className="dish-card">
      <div className="dish-card__media">
        <img src={dish.img} alt={dish.name} loading="lazy" />
        <span className="dish-card__tag">{CATEGORIES.find((c) => c.id === dish.cat).label}</span>
      </div>
      <div className="dish-card__body">
        <div className="dish-card__head">
          <h3 className="dish-card__name">{dish.name}</h3>
          <div className="dish-card__price">{dish.price} <small>ألف ل.س</small></div>
        </div>
        <p className="dish-card__desc">{dish.desc}</p>
        <div className="dish-card__foot">
          <span className="dish-card__rating">
            <Icon.Star /> {dish.rating.toFixed(1)}
          </span>
          <a href="#reservation" className="dish-card__order" onClick={(e) => { e.preventDefault(); scrollToId("reservation"); }}>
            اطلبه الآن <Icon.ArrowLeft />
          </a>
        </div>
      </div>
    </article>
  );
}

function Menu() {
  const [active, setActive] = useState("all");

  const filtered = useMemo(
    () => (active === "all" ? DISHES : DISHES.filter((d) => d.cat === active)),
    [active]
  );

  return (
    <section id="menu" className="section section--alt">
      <div className="container">
        <div className="section-head">
          <span className="section-head__eyebrow">قائمتنا</span>
          <h2 className="section-head__title">قائمة الطعام</h2>
          <div className="section-head__divider"></div>
          <p className="section-head__desc">
            تشكيلة أصيلة من ألذ الأطباق العربية المحضّرة بحبّ وبمكوّنات طازجة. اختر تصنيفًا لاستكشاف أطباقنا.
          </p>
        </div>

        <div className="menu__filters" role="tablist" aria-label="تصنيفات قائمة الطعام">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} className={`filter-btn${active === cat.id ? " active" : ""}`}
                    role="tab" aria-selected={active === cat.id}
                    onClick={() => setActive(cat.id)}>
              {cat.label}
            </button>
          ))}
        </div>

        <div className="menu__grid">
          {filtered.length === 0 ? (
            <p className="menu__empty">لا توجد أطباق في هذا التصنيف حاليًا.</p>
          ) : (
            filtered.map((dish) => <DishCard key={dish.id} dish={dish} />)
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   من نحن
   ========================================================= */
function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about__grid">
          <div className="about__media">
            <img src="img/about.png" alt="مطبخ مطعم الذوق" loading="lazy" />
            <div className="about__media-badge">
              <b>+20</b>
              <span>سنة خبرة</span>
            </div>
          </div>
          <div className="about__content">
            <span className="about__eyebrow">قصّتنا</span>
            <h2 className="about__title">حكاية ذوقٍ عريق منذ عام 2003</h2>
            <p className="about__text">
              بدأت حكاية مطعم الذوق من مطبخ بيتي صغير في حيّ اللاذقية القديم، حيث كانت الجدة أمينة تُعدّ
              المنسف والمشاوي في المناسبات. حمل الشباب تلك الوصفات الأصيلة وافتتحوا أوّل فرع عام 2003
              على الكورنيش البحري، ليُصبح اليوم وجهةً لعشّاق الطعام العربي الأصيل.
            </p>
            <p className="about__text">
              نحرص على الحفاظ على النكهة البيتية في كل طبق، فلا نستخدم مكوّنات مجمدة ولا بهارات جاهزة،
              بل نطحن توابلنا يدوياً ونحضّر عجيننا يومياً، لنقدّم لك تجربة طعام تليق بذوقك الرفيع.
            </p>
            <p className="about__signature">
              "كل طبقٍ نقدّمه هو رسالة حبٍّ من مطبخنا إلى مائدتك"
              <small>— الشيف سامر العلي، رئيس مطبخ المطعم</small>
            </p>
          </div>
        </div>

        <div className="features">
          {FEATURES.map((f, i) => {
            const I = Icon[f.icon];
            return (
              <div key={i} className="feature">
                <div className="feature__icon"><I /></div>
                <h3 className="feature__title">{f.title}</h3>
                <p className="feature__text">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   معرض الصور + اللايت بوكس
   ========================================================= */
function Lightbox({ items, index, onClose, onPrev, onNext }) {
  useEffect(() => {
    // لا تُقفل التمرير إلا عند فتح المعرض فعليًا (index !== null)
    if (index === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNext(); // RTL: السهم الأيسر = التالي
      if (e.key === "ArrowRight") onPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [index, onClose, onPrev, onNext]);

  if (index === null) return null;
  const item = items[index];

  return (
    <div className="lightbox" onClick={onClose} role="dialog" aria-modal="true" aria-label="معرض الصور">
      <button className="lightbox__btn lightbox__close" onClick={onClose} aria-label="إغلاق"><Icon.X /></button>
      <div className="lightbox__inner" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox__btn lightbox__prev" onClick={onPrev} aria-label="السابق"><Icon.ChevronRight /></button>
        <img className="lightbox__img" src={item.img} alt={item.caption} />
        <button className="lightbox__btn lightbox__next" onClick={onNext} aria-label="التالي"><Icon.ChevronLeft /></button>
        <p className="lightbox__caption">{index + 1} / {items.length} — {item.caption}</p>
      </div>
    </div>
  );
}

function Gallery() {
  const [index, setIndex] = useState(null);

  const open = (i) => setIndex(i);
  const close = () => setIndex(null);
  const prev = () => setIndex((i) => (i === null ? 0 : (i - 1 + GALLERY.length) % GALLERY.length));
  const next = () => setIndex((i) => (i === null ? 0 : (i + 1) % GALLERY.length));

  return (
    <section id="gallery" className="section section--dark">
      <div className="container">
        <div className="section-head">
          <span className="section-head__eyebrow">معرض الصور</span>
          <h2 className="section-head__title">لمحات من عالمنا</h2>
          <div className="section-head__divider"></div>
          <p className="section-head__desc">جلساتنا الأنيقة وأطباقنا الشهية بكل تفاصيلها. اضغط على أي صورة لمشاهدتها بحجم أكبر.</p>
        </div>

        <div className="gallery__grid">
          {GALLERY.map((g, i) => (
            <figure key={i} className={`gallery__item${g.span === "wide" ? " gallery__item--wide" : ""}${g.span === "tall" ? " gallery__item--tall" : ""}`}
                    onClick={() => open(i)} tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") open(i); }}
                    role="button" aria-label={`عرض صورة: ${g.caption}`}>
              <img src={g.img} alt={g.caption} loading="lazy" />
              <figcaption className="gallery__item-caption"><Icon.Zoom /> {g.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <Lightbox items={GALLERY} index={index} onClose={close} onPrev={prev} onNext={next} />
    </section>
  );
}

/* =========================================================
   الحجز — نموذج مع React state وتحقّق
   (منظّم ليُربط لاحقًا بـ Backend API)
   ========================================================= */
const PEOPLE_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, "أكثر من 8"];

function getTodayISO() {
  const d = new Date();
  const tz = d.getTimezoneOffset() * 60000;
  return new Date(d - tz).toISOString().split("T")[0];
}

function validateForm(values) {
  const errors = {};
  if (!values.name || values.name.trim().length < 2)
    errors.name = "الرجاء إدخال الاسم كاملاً (حرفان على الأقل).";
  if (!values.phone)
    errors.phone = "الرجاء إدخال رقم الهاتف.";
  else {
    const digits = values.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 13)
      errors.phone = "الرجاء إدخال رقم هاتف صحيح (8-13 رقماً).";
  }
  if (!values.people) errors.people = "الرجاء اختيار عدد الأشخاص.";
  if (!values.date) errors.date = "الرجاء اختيار التاريخ.";
  else if (values.date < getTodayISO()) errors.date = "لا يمكن الحجز لتاريخ سابق.";
  if (!values.time) errors.time = "الرجاء اختيار الوقت.";
  return errors;
}

/*
  ▶ الـAPI الحقيقي (Flask + SQLite على المنفذ 5000).
  - عند تشغيل Flask محليًا وفتح http://localhost:5000 → نفس الأصل، يعمل مباشرةً.
  - في بيئة المعاينة (Next.js على المنفذ 3000) تعمل البوابة (Caddy) على تمرير الطلب
    إلى المنفذ 5000 عبر معامل الاستعلام XTransformPort.
  - إن تعذّر الاتصال (مثال: فتح الموقع عبر file:// أو Flask غير مُشغّل)، يُلتقط الخطأ
    ويُعرض للمستخدم رسالة واضحة بدل انهيار التطبيق.
*/
const API_ENDPOINT = "/api/reservations?XTransformPort=5000";

async function submitReservation(values) {
  const resp = await fetch(API_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  let data = {};
  try { data = await resp.json(); } catch (_) { /* قد يكون الجسم فارغًا */ }
  if (!resp.ok || !data.ok) {
    // أخطاء تحقق من الحقول تأتي في data.errors
    const err = new Error(data.error || "فشل الإرسال");
    err.errors = data.errors || null;
    err.status = resp.status;
    throw err;
  }
  return { ok: true, ref: data.ref };
}

function Reservation() {
  const initial = { name: "", phone: "", people: "", date: "", time: "", notes: "" };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [refNo, setRefNo] = useState("");
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (touched[name]) setErrors(validateForm({ ...values, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateForm(values));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = { ...values };
    const allTouched = Object.keys(v).reduce((acc, k) => { acc[k] = true; return acc; }, {});
    setTouched(allTouched);
    const errs = validateForm(v);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setServerError("");
    try {
      const res = await submitReservation(v);
      setRefNo(res.ref);
      setStatus("success");
      setValues(initial);
      setTouched({});
    } catch (err) {
      // أخطاء تحقق قادمة من الخادم (HTTP 400) → اعرضها على الحقول
      if (err.errors) {
        setErrors(err.errors);
        setTouched(Object.keys(err.errors).reduce((a, k) => { a[k] = true; return a; }, {}));
      }
      // رسالة عامة لخطأ الشبكة أو الخادم
      const isNetwork = err.message === "Failed to fetch" || err.status === undefined;
      setServerError(
        isNetwork
          ? "تعذّر الاتصال بالخادم. تأكد من تشغيل الباك إند (Flask على المنفذ 5000) ثم أعد المحاولة."
          : (err.message || "حدث خطأ غير متوقع. حاول مرة أخرى.")
      );
      setStatus("error");
    }
  };

  const fieldError = (name) => (touched[name] && errors[name] ? errors[name] : null);

  return (
    <section id="reservation" className="section section--alt">
      <div className="container">
        <div className="section-head">
          <span className="section-head__eyebrow">احجز مكانك</span>
          <h2 className="section-head__title">احجز طاولتك</h2>
          <div className="section-head__divider"></div>
          <p className="section-head__desc">املأ النموذج وسيتواصل معك فريقنا لتأكيد الحجز خلال دقائق.</p>
        </div>

        <div className="reservation__grid">
          <form className="reservation-form" onSubmit={handleSubmit} noValidate>
            {status === "success" && (
              <div className="form-alert form-alert--success">
                <Icon.CheckCircle />
                <div>
                  <strong>تمّ استلام طلب حجزك بنجاح!</strong><br />
                  رقم المرجع: <b>{refNo}</b> — سيتواصل معك فريقنا قريبًا لتأكيد الموعد.
                </div>
              </div>
            )}
            {status === "error" && (serverError || Object.keys(errors).length > 0) && (
              <div className="form-alert form-alert--error">
                <Icon.AlertCircle />
                <div>
                  {serverError || "الرجاء تصحيح الحقول المظلّلة بالأحمر قبل الإرسال."}
                  {Object.keys(errors).length > 0 && !serverError && ""}
                </div>
              </div>
            )}

            <div className="form-row">
              <div className={`field${fieldError("name") ? " field--error" : ""}`}>
                <label htmlFor="r-name">الاسم الكامل <span className="req">*</span></label>
                <input id="r-name" name="name" type="text" value={values.name}
                       placeholder="مثال: أحمد العلي"
                       onChange={handleChange} onBlur={handleBlur} />
                {fieldError("name") && <span className="field__error"><Icon.AlertCircle /> {fieldError("name")}</span>}
              </div>
              <div className={`field${fieldError("phone") ? " field--error" : ""}`}>
                <label htmlFor="r-phone">رقم الهاتف <span className="req">*</span></label>
                <input id="r-phone" name="phone" type="tel" value={values.phone}
                       placeholder="مثال: 0944221889"
                       onChange={handleChange} onBlur={handleBlur} dir="ltr" />
                {fieldError("phone") && <span className="field__error"><Icon.AlertCircle /> {fieldError("phone")}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className={`field${fieldError("people") ? " field--error" : ""}`}>
                <label htmlFor="r-people">عدد الأشخاص <span className="req">*</span></label>
                <select id="r-people" name="people" value={values.people}
                        onChange={handleChange} onBlur={handleBlur}>
                  <option value="" disabled>اختر العدد</option>
                  {PEOPLE_OPTIONS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                {fieldError("people") && <span className="field__error"><Icon.AlertCircle /> {fieldError("people")}</span>}
              </div>
              <div className={`field${fieldError("date") ? " field--error" : ""}`}>
                <label htmlFor="r-date">التاريخ <span className="req">*</span></label>
                <input id="r-date" name="date" type="date" value={values.date} min={getTodayISO()}
                       onChange={handleChange} onBlur={handleBlur} />
                {fieldError("date") && <span className="field__error"><Icon.AlertCircle /> {fieldError("date")}</span>}
              </div>
            </div>

            <div className={`field${fieldError("time") ? " field--error" : ""}`}>
              <label htmlFor="r-time">الوقت <span className="req">*</span></label>
              <input id="r-time" name="time" type="time" value={values.time} min="11:00" max="23:30"
                     onChange={handleChange} onBlur={handleBlur} />
              {fieldError("time") && <span className="field__error"><Icon.AlertCircle /> {fieldError("time")}</span>}
            </div>

            <div className="field">
              <label htmlFor="r-notes">ملاحظات إضافية (اختياري)</label>
              <textarea id="r-notes" name="notes" rows="3" value={values.notes}
                        placeholder="أي طلب خاص، منطقة معيّنة، أو مناسبة..."
                        onChange={handleChange} />
            </div>

            <button type="submit" className="btn btn--primary btn--block" disabled={status === "submitting"}>
              {status === "submitting" ? "جارٍ الإرسال..." : "إرسال طلب الحجز"}
            </button>
          </form>

          <aside className="reservation__aside">
            <div className="reservation__banner">
              <img src="img/mansaf.png" alt="منسف" />
              <div className="reservation__banner-text">
                <b>مناسبة خاصة؟</b>
                <span>نوفّر قاعات خاصة للمناسبات والأفراح بسعة تصل إلى 80 شخصًا.</span>
              </div>
            </div>
            <div className="info-card">
              <h4>تفاصيل التواصل</h4>
              <ul className="info-card__list">
                <li><Icon.Phone /> <span><b>اتصال:</b> {RESTAURANT.phone}</span></li>
                <li><Icon.WhatsApp /> <span><b>واتساب:</b> {RESTAURANT.whatsapp}</span></li>
                <li><Icon.Clock /> <span><b>أوقات العمل:</b> {RESTAURANT.hours}</span></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   التواصل
   ========================================================= */
function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-head__eyebrow">تواصل معنا</span>
          <h2 className="section-head__title">نسعد بزيارتك</h2>
          <div className="section-head__divider"></div>
          <p className="section-head__desc">نحن هنا لخدمتك. تواصل معنا عبر أي وسيلة تناسبك.</p>
        </div>

        <div className="contact__grid">
          <div className="contact-card">
            <div className="contact-card__icon"><Icon.Phone /></div>
            <h4>الهاتف</h4>
            <p><a href={`tel:${RESTAURANT.phoneHref}`}>{RESTAURANT.phone}</a></p>
          </div>
          <div className="contact-card">
            <div className="contact-card__icon"><Icon.Mail /></div>
            <h4>البريد الإلكتروني</h4>
            <p><a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></p>
          </div>
          <div className="contact-card">
            <div className="contact-card__icon"><Icon.MapPin /></div>
            <h4>العنوان</h4>
            <p>{RESTAURANT.address}</p>
          </div>
          <div className="contact-card">
            <div className="contact-card__icon"><Icon.Clock /></div>
            <h4>أوقات العمل</h4>
            <p>{RESTAURANT.hours}<br />{RESTAURANT.hoursFri}</p>
          </div>
        </div>

        <div className="social">
          <a href={RESTAURANT.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك"><Icon.Facebook /></a>
          <a href={RESTAURANT.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="إنستغرام"><Icon.Instagram /></a>
          <a href={RESTAURANT.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="واتساب"><Icon.WhatsApp /></a>
        </div>

        <div className="map-wrap">
          <iframe
            title="موقع مطعم الذوق على الخريطة"
            src="https://www.openstreetmap.org/export/embed.html?bbox=35.747%2C35.498%2C35.837%2C35.558&layer=mapnik&marker=35.528%2C35.792"
            loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   التذييل
   ========================================================= */
function Footer({ onNavClick }) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__col">
            <div className="footer__brand">
              <span className="brand__mark"><Icon.Utensils /></span>
              <strong>مطعم الذوق</strong>
            </div>
            <p className="footer__about">
              مطعم عربي أصيل في قلب اللاذقية، نقدّم نكهات الشرق العريقة منذ عام 2003 بمكوّنات طازجة
              وأيدٍ ماهرة وأجواء عائلية دافئة.
            </p>
            <div className="footer__social">
              <a href={RESTAURANT.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="فيسبوك"><Icon.Facebook /></a>
              <a href={RESTAURANT.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="إنستغرام"><Icon.Instagram /></a>
              <a href={RESTAURANT.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="واتساب"><Icon.WhatsApp /></a>
            </div>
          </div>

          <div className="footer__col">
            <h5>روابط سريعة</h5>
            <ul>
              {NAV_LINKS.map((l) => (
                <li key={l.id}><a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); onNavClick(l.id); }}><Icon.ChevronRight /> {l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h5>قائمتنا</h5>
            <ul>
              {CATEGORIES.slice(1).map((c) => (
                <li key={c.id}><a href="#menu" onClick={(e) => { e.preventDefault(); onNavClick("menu"); }}><Icon.ChevronRight /> {c.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h5>تواصل معنا</h5>
            <ul className="footer__contact">
              <li><Icon.MapPin /> <span>{RESTAURANT.address}</span></li>
              <li><Icon.Phone /> <span><a href={`tel:${RESTAURANT.phoneHref}`}>{RESTAURANT.phone}</a></span></li>
              <li><Icon.Mail /> <span><a href={`mailto:${RESTAURANT.email}`}>{RESTAURANT.email}</a></span></li>
              <li><Icon.Clock /> <span>{RESTAURANT.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} مطعم الذوق — جميع الحقوق محفوظة.</span>
          <div className="footer__bottom-links">
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavClick("home"); }}>سياسة الخصوصية</a>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavClick("home"); }}>الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   زر العودة للأعلى
   ========================================================= */
function ToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button className={`to-top${show ? " to-top--show" : ""}`} aria-label="العودة للأعلى"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <Icon.ArrowUp />
    </button>
  );
}

/* =========================================================
   التطبيق الرئيسي
   ========================================================= */
function App() {
  const activeId = useScrollSpy(NAV_LINKS.map((l) => l.id));
  const handleNav = (id) => scrollToId(id);

  return (
    <>
      <Navbar activeId={activeId} onNavClick={handleNav} />
      <main>
        <Hero onNavClick={handleNav} />
        <Menu />
        <About />
        <Gallery />
        <Reservation />
        <Contact />
      </main>
      <Footer onNavClick={handleNav} />
      <ToTop />
    </>
  );
}

/* نقطة الإقلاع */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
