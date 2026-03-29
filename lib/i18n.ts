// lib/i18n.ts — all app translations

export const LANGUAGES = [
  { code: "en", name: "English",   flag: "🇬🇧" },
  { code: "id", name: "Indonesia", flag: "🇮🇩" },
  { code: "ru", name: "Русский",   flag: "🇷🇺" },
  { code: "zh", name: "中文",       flag: "🇨🇳" },
  { code: "ar", name: "العربية",   flag: "🇸🇦" },
] as const;

export type LangCode = typeof LANGUAGES[number]["code"];
export const DEFAULT_LANG: LangCode = "en";

export const translations = {
  // ── Nav ────────────────────────────────────────────────────────────────────
  nav: {
    home:    { en: "Home",     id: "Beranda", ru: "Главная",               zh: "首页",   ar: "الرئيسية" },
    faq:     { en: "FAQ",      id: "FAQ",     ru: "FAQ",                   zh: "常见问题", ar: "الأسئلة" },
    privacy: { en: "Privacy",  id: "Privasi", ru: "Конфиденциальность",    zh: "隐私",   ar: "الخصوصية" },
    terms:   { en: "Terms",    id: "Ketentuan",ru: "Условия",              zh: "条款",   ar: "الشروط" },
    guide:   { en: "Guide",    id: "Panduan", ru: "Руководство",           zh: "指南",   ar: "الدليل" },
    docs:    { en: "API Docs", id: "Docs API",ru: "API Документы",         zh: "API 文档", ar: "توثيق API" },
  },

  // ── Common UI ──────────────────────────────────────────────────────────────
  ui: {
    paste:            { en: "Paste from Clipboard",    id: "Tempel dari Clipboard",    ru: "Вставить из буфера",     zh: "从剪贴板粘贴",    ar: "لصق من الحافظة" },
    pasted:           { en: "Pasted!",                 id: "Berhasil Ditempel!",        ru: "Вставлено!",             zh: "已粘贴！",        ar: "تم اللصق!" },
    download_now:     { en: "Download Now",            id: "Unduh Sekarang",            ru: "Скачать",                zh: "立即下载",        ar: "تحميل الآن" },
    processing:       { en: "Processing...",           id: "Memproses...",              ru: "Обработка...",           zh: "处理中...",       ar: "جاري المعالجة..." },
    processing_video: { en: "Processing video...",     id: "Sedang memproses video...", ru: "Обработка видео...",     zh: "正在处理视频...", ar: "جاري معالجة الفيديو..." },
    result_title:     { en: "Download Result",         id: "Hasil Download",            ru: "Результат",              zh: "下载结果",        ar: "نتيجة التحميل" },
    example_link:     { en: "Example Link",            id: "Contoh Link",               ru: "Пример",                 zh: "示例链接",        ar: "رابط مثال" },
    how_it_works:     { en: "How It Works",            id: "Cara Kerja",                ru: "Как это работает",       zh: "使用方法",        ar: "كيف يعمل" },
    help:             { en: "Help",                    id: "Bantuan",                   ru: "Помощь",                 zh: "帮助",            ar: "المساعدة" },
    no_media:         { en: "No media available.",     id: "Tidak ada media tersedia.", ru: "Медиа недоступны.",      zh: "暂无可用媒体。",  ar: "لا توجد وسائط." },
  },

  // ── Download labels ────────────────────────────────────────────────────────
  dl: {
    hd_no_wm:    { en: "HD No Watermark",              id: "HD Tanpa Watermark",              ru: "HD без водяного знака",       zh: "HD 无水印",          ar: "HD بدون علامة مائية" },
    sd_no_wm:    { en: "SD No Watermark",              id: "SD Tanpa Watermark",              ru: "SD без водяного знака",       zh: "SD 无水印",          ar: "SD بدون علامة مائية" },
    with_wm:     { en: "Download with Watermark",      id: "Download dengan Watermark",       ru: "Скачать с водяным знаком",    zh: "下载含水印版",       ar: "تحميل مع علامة مائية" },
    audio:       { en: "Download Audio/Music",         id: "Download Audio/Musik",            ru: "Скачать аудио",              zh: "下载音频/音乐",      ar: "تحميل الصوت/الموسيقى" },
    video_no_wm: { en: "Download Video (No Watermark)",id: "Download Video Tanpa Watermark",  ru: "Скачать видео (без знака)",  zh: "下载视频（无水印）", ar: "تحميل الفيديو بلا علامة" },
    slideshow:   { en: "Slideshow detected",           id: "Slideshow terdeteksi",            ru: "Обнаружен слайдшоу",         zh: "检测到幻灯片",       ar: "تم اكتشاف عرض شرائح" },
    images:      { en: "images",                       id: "gambar",                          ru: "изображений",                zh: "张图片",             ar: "صور" },
  },

  // ── Search ─────────────────────────────────────────────────────────────────
  search: {
    tab_download: { en: "Download",              id: "Unduh",               ru: "Скачать",          zh: "下载",          ar: "تنزيل" },
    tab_search:   { en: "Search Videos",         id: "Cari Video",          ru: "Поиск видео",      zh: "搜索视频",      ar: "البحث عن مقاطع" },
    placeholder:  { en: "Search TikTok videos...",id: "Cari video TikTok...",ru: "Поиск видео TikTok...",zh: "搜索 TikTok 视频...",ar: "ابحث عن مقاطع TikTok..." },
    btn:          { en: "Search",                id: "Cari",                ru: "Искать",           zh: "搜索",          ar: "بحث" },
    searching:    { en: "Searching...",           id: "Mencari...",          ru: "Поиск...",         zh: "搜索中...",     ar: "جاري البحث..." },
    results:      { en: "results for",           id: "hasil untuk",         ru: "результатов для",  zh: "个结果，关键词：",ar: "نتيجة لـ" },
    no_results:   { en: "No videos found.",      id: "Tidak ada video.",    ru: "Видео не найдено.",zh: "未找到视频。",  ar: "لم يُعثر على مقاطع." },
    play_preview: { en: "Preview",               id: "Pratinjau",           ru: "Превью",           zh: "预览",          ar: "معاينة" },
    load_more:    { en: "Load More",             id: "Muat Lebih Banyak",   ru: "Загрузить ещё",   zh: "加载更多",      ar: "تحميل المزيد" },
    loading_more: { en: "Loading...",            id: "Memuat...",           ru: "Загрузка...",      zh: "加载中...",     ar: "جارٍ التحميل..." },
  },

  // ── Errors ─────────────────────────────────────────────────────────────────
  err: {
    enter_url:      { en: "Enter a TikTok URL",                         id: "Masukkan URL TikTok",                         ru: "Введите URL TikTok",                        zh: "请输入 TikTok 链接",    ar: "أدخل رابط TikTok" },
    enter_url_dy:   { en: "Enter a Douyin URL",                         id: "Masukkan URL Douyin",                         ru: "Введите URL Douyin",                        zh: "请输入抖音链接",          ar: "أدخل رابط Douyin" },
    invalid_url:    { en: "Invalid URL. Enter a valid TikTok link.",    id: "URL tidak valid. Masukkan URL TikTok yang benar.", ru: "Неверный URL TikTok.",                 zh: "链接无效，请输入正确的 TikTok 链接。", ar: "رابط غير صالح. أدخل رابط TikTok صحيح." },
    invalid_url_dy: { en: "Invalid URL. Enter a valid Douyin link.",    id: "URL tidak valid. Masukkan URL Douyin yang benar.", ru: "Неверный URL Douyin.",                 zh: "链接无效，请输入正确的抖音链接。",   ar: "رابط غير صالح. أدخل رابط Douyin صحيح." },
    fetch_failed:   { en: "Failed to fetch video. Try again.",          id: "Gagal mengambil data video. Coba lagi.",          ru: "Ошибка загрузки видео.",                zh: "获取视频失败，请重试。",              ar: "فشل جلب الفيديو. حاول مجدداً." },
    dl_failed:      { en: "Download failed. Try again.",                id: "Gagal mengunduh file. Coba lagi.",               ru: "Ошибка скачивания.",                    zh: "下载失败，请重试。",                  ar: "فشل التحميل. حاول مجدداً." },
    clipboard:      { en: "Cannot access clipboard.",                   id: "Tidak dapat mengakses clipboard.",               ru: "Нет доступа к буферу.",                 zh: "无法访问剪贴板。",                    ar: "لا يمكن الوصول إلى الحافظة." },
  },

  // ── TikTok home ────────────────────────────────────────────────────────────
  tiktok_home: {
    hero_title:  { en: "Download TikTok Without Watermark",    id: "Download TikTok Tanpa Watermark",    ru: "Скачать TikTok без водяного знака",    zh: "无水印下载 TikTok 视频",    ar: "تحميل TikTok بدون علامة مائية" },
    hero_grad:   { en: "Watermark",                             id: "Watermark",                          ru: "знака",                                zh: "水印",                       ar: "علامة مائية" },
    hero_sub:    { en: "Download TikTok HD videos, MP3 audio, and images without logo. Fast, Safe & Free with no registration.", id: "Unduh video TikTok HD, MP3 audio, dan gambar tanpa logo. Cepat, Aman, & Gratis tanpa registrasi.", ru: "Скачивайте HD видео TikTok, MP3 аудио и картинки без логотипа. Быстро, безопасно и бесплатно.", zh: "下载 TikTok HD 视频、MP3 音频和无 Logo 图片。快速、安全、免费，无需注册。", ar: "حمّل مقاطع TikTok HD وصوت MP3 وصوراً بدون شعار. سريع وآمن ومجاني." },
    placeholder: { en: "Paste TikTok video link here...",       id: "Tempelkan link video TikTok di sini...", ru: "Вставьте ссылку TikTok сюда...",   zh: "在此粘贴 TikTok 视频链接...", ar: "الصق رابط فيديو TikTok هنا..." },
  },

  // ── Douyin home ────────────────────────────────────────────────────────────
  douyin_home: {
    hero_title:  { en: "Download Douyin Without Watermark",    id: "Download Douyin Tanpa Watermark",    ru: "Скачать Douyin без водяного знака",    zh: "无水印下载抖音视频",          ar: "تحميل Douyin بدون علامة مائية" },
    hero_grad:   { en: "Watermark",                             id: "Watermark",                          ru: "знака",                                zh: "水印",                        ar: "علامة مائية" },
    hero_sub:    { en: "Download Douyin (抖音) HD videos without logo. Fast, Safe & Free with no registration.", id: "Unduh video Douyin (抖音) tanpa logo watermark. Cepat, Aman, & Gratis tanpa registrasi.", ru: "Скачивайте HD видео Douyin (抖音) без логотипа. Быстро и бесплатно.", zh: "下载抖音（抖音）高清视频，无水印。快速、安全、免费。", ar: "حمّل مقاطع Douyin (抖音) HD بدون علامة مائية. سريع وآمن ومجاني." },
    placeholder: { en: "Paste Douyin video link here...",       id: "Tempelkan link video Douyin di sini...", ru: "Вставьте ссылку Douyin сюда...",   zh: "在此粘贴抖音视频链接...",     ar: "الصق رابط فيديو Douyin هنا..." },
  },

  // ── Stats ───────────────────────────────────────────────────────────────────
  stats: {
    free:    { en: "Free",         id: "Gratis",   ru: "Бесплатно", zh: "免费",  ar: "مجاني" },
    no_wm:   { en: "No Watermark", id: "Tanpa WM", ru: "Без знака", zh: "无水印", ar: "بلا علامة" },
    quality: { en: "Quality",      id: "Kualitas", ru: "Качество",  zh: "高质量", ar: "جودة" },
    fast:    { en: "Fast",         id: "Cepat",    ru: "Быстро",    zh: "极速",   ar: "سريع" },
  },

  // ── Footer ─────────────────────────────────────────────────────────────────
  footer: {
    // Unified disclaimer — covers all platforms
    disclaimer: {
      en: "Snaptok is not affiliated with TikTok, Douyin, or ByteDance. We provide video download services for personal use only. Please respect creator copyrights and platform terms of service.",
      id: "Snaptok tidak berafiliasi dengan TikTok, Douyin, atau ByteDance. Kami menyediakan layanan unduh video untuk penggunaan pribadi. Harap hormati hak cipta kreator dan syarat layanan platform.",
      ru: "Snaptok не связан с TikTok, Douyin или ByteDance. Сервис предназначен только для личного использования. Уважайте авторские права.",
      zh: "Snaptok 与 TikTok、抖音或字节跳动无任何关联。我们仅提供个人使用的视频下载服务。请尊重创作者版权及平台服务条款。",
      ar: "Snaptok غير مرتبط بـ TikTok أو Douyin أو ByteDance. نقدم خدمات التنزيل للاستخدام الشخصي فقط. يرجى احترام حقوق المبدعين وشروط الخدمة.",
    },
    // Keep old keys for backward compat
    disclaimer_tiktok: {
      en: "Snaptok is not affiliated with TikTok or ByteDance. For personal use only. Respect creator copyrights.",
      id: "Snaptok tidak berafiliasi dengan TikTok atau ByteDance. Hanya untuk penggunaan pribadi. Hormati hak cipta kreator.",
      ru: "Snaptok не связан с TikTok или ByteDance. Только для личного использования.",
      zh: "Snaptok 与 TikTok 或字节跳动无关联。仅供个人使用，请尊重版权。",
      ar: "Snaptok غير مرتبط بـ TikTok أو ByteDance. للاستخدام الشخصي فقط.",
    },
    disclaimer_douyin: {
      en: "Snaptok is not affiliated with Douyin (抖音) or ByteDance. For personal use only. Respect creator copyrights.",
      id: "Snaptok tidak berafiliasi dengan Douyin (抖音) atau ByteDance. Hanya untuk penggunaan pribadi. Hormati hak cipta kreator.",
      ru: "Snaptok не связан с Douyin (抖音) или ByteDance. Только для личного использования.",
      zh: "Snaptok 与抖音或字节跳动无关联。仅供个人使用，请尊重版权。",
      ar: "Snaptok غير مرتبط بـ Douyin (抖音) أو ByteDance. للاستخدام الشخصي فقط.",
    },
    rights: {
      en: "All rights reserved.",
      id: "Semua hak dilindungi.",
      ru: "Все права защищены.",
      zh: "版权所有。",
      ar: "جميع الحقوق محفوظة.",
    },
  },

  // ── FAQ page ────────────────────────────────────────────────────────────────
  faq_page: {
    title:    { en: "Frequently Asked Questions", id: "Pertanyaan yang Sering Diajukan", ru: "Часто задаваемые вопросы", zh: "常见问题",   ar: "الأسئلة الشائعة" },
    subtitle: { en: "Find answers to common questions about our service", id: "Temukan jawaban untuk pertanyaan umum tentang layanan kami", ru: "Найдите ответы на частые вопросы", zh: "查找关于我们服务的常见问题解答", ar: "اعثر على إجابات للأسئلة الشائعة" },
    still_q:  { en: "Still have questions?", id: "Masih punya pertanyaan?", ru: "Остались вопросы?", zh: "还有问题？", ar: "لا تزال لديك أسئلة؟" },
    contact:  { en: "Feel free to contact our support team", id: "Jangan ragu untuk menghubungi tim support kami", ru: "Свяжитесь с нашей поддержкой", zh: "随时联系我们的支持团队", ar: "لا تتردد في التواصل مع فريق الدعم" },
  },

  // ── Guide page ──────────────────────────────────────────────────────────────
  guide_page: {
    title:           { en: "User Guide",              id: "Panduan Penggunaan",       ru: "Руководство пользователя", zh: "使用指南",    ar: "دليل المستخدم" },
    subtitle_tiktok: { en: "Follow these simple steps to download TikTok videos without watermark", id: "Ikuti langkah-langkah sederhana berikut untuk mengunduh video TikTok tanpa watermark", ru: "Следуйте простым шагам для скачивания видео TikTok", zh: "按照以下简单步骤下载无水印的 TikTok 视频", ar: "اتبع هذه الخطوات البسيطة لتنزيل مقاطع TikTok بدون علامة مائية" },
    subtitle_douyin: { en: "Follow these simple steps to download Douyin videos without watermark", id: "Ikuti langkah-langkah sederhana berikut untuk mengunduh video Douyin tanpa watermark", ru: "Следуйте простым шагам для скачивания видео Douyin", zh: "按照以下简单步骤下载无水印的抖音视频",   ar: "اتبع هذه الخطوات البسيطة لتنزيل مقاطع Douyin بدون علامة مائية" },
    devices:         { en: "Works on All Devices",    id: "Dapat Diakses dari Berbagai Perangkat", ru: "Работает на всех устройствах", zh: "支持所有设备", ar: "يعمل على جميع الأجهزة" },
    tips:            { en: "Tips for Best Results",   id: "Tips untuk Hasil Terbaik", ru: "Советы для лучшего результата", zh: "最佳使用技巧", ar: "نصائح للحصول على أفضل النتائج" },
    ready:           { en: "Ready to Try?",           id: "Siap Mencoba?",            ru: "Готовы попробовать?",        zh: "准备好了吗？", ar: "هل أنت مستعد؟" },
    start:           { en: "Start Downloading",       id: "Mulai Download",           ru: "Начать загрузку",           zh: "开始下载",    ar: "ابدأ التنزيل" },
  },

  // ── Unified Privacy & Terms page ────────────────────────────────────────────
  // Covers ALL platforms — used by both /privacy and /douyin/privacy
  privacy_page: {
    title:    { en: "Privacy Policy & Terms",  id: "Kebijakan Privasi & Ketentuan",  ru: "Политика и Условия",              zh: "隐私政策与条款",    ar: "سياسة الخصوصية والشروط" },
    subtitle: {
      en: "Snaptok is committed to protecting your privacy across all platforms (TikTok, Douyin, and all future services). This policy applies universally to every page and feature of this site.",
      id: "Snaptok berkomitmen untuk melindungi privasi Anda di semua platform (TikTok, Douyin, dan semua layanan mendatang). Kebijakan ini berlaku secara universal untuk setiap halaman dan fitur situs ini.",
      ru: "Snaptok обязуется защищать вашу конфиденциальность на всех платформах (TikTok, Douyin и все будущие сервисы). Эта политика применяется ко всем страницам и функциям сайта.",
      zh: "Snaptok 致力于在所有平台（TikTok、抖音及所有未来服务）上保护您的隐私。本政策普遍适用于本网站的每个页面和功能。",
      ar: "تلتزم Snaptok بحماية خصوصيتك عبر جميع المنصات (TikTok وDouyin وجميع الخدمات المستقبلية). تنطبق هذه السياسة عالمياً على كل صفحة وميزة في هذا الموقع.",
    },
    updated:  {
      en: "Last updated: March 2026",
      id: "Terakhir diperbarui: Maret 2026",
      ru: "Последнее обновление: март 2026",
      zh: "最后更新：2026年3月",
      ar: "آخر تحديث: مارس 2026",
    },
    contact:      { en: "Contact Us",       id: "Hubungi Kami",         ru: "Свяжитесь с нами",       zh: "联系我们",    ar: "اتصل بنا" },
    contact_sub:  {
      en: "Questions about our privacy policy or terms? Contact us at:",
      id: "Pertanyaan tentang kebijakan privasi atau ketentuan kami? Hubungi kami di:",
      ru: "Вопросы о конфиденциальности или условиях? Напишите нам:",
      zh: "对我们的隐私政策或条款有疑问？请联系：",
      ar: "أسئلة حول سياسة الخصوصية أو الشروط؟ تواصل معنا على:",
    },
    changes:      { en: "Policy Changes",   id: "Perubahan Kebijakan",  ru: "Изменения политики",     zh: "政策变更",    ar: "تغييرات السياسة" },
    changes_body: {
      en: "We may update this policy from time to time. Significant changes will be announced via a notice on our website. Continued use of the service after changes constitutes acceptance.",
      id: "Kami dapat memperbarui kebijakan ini dari waktu ke waktu. Perubahan signifikan akan diumumkan melalui pemberitahuan di website kami. Penggunaan layanan setelah perubahan berarti penerimaan.",
      ru: "Мы можем обновлять эту политику. Значительные изменения будут объявлены на сайте. Продолжение использования означает принятие изменений.",
      zh: "我们可能会不时更新本政策。重大变更将通过网站通知公告。变更后继续使用服务即视为接受。",
      ar: "قد نحدّث هذه السياسة من وقت لآخر. سيُعلَن عن التغييرات الجوهرية عبر إشعار على موقعنا. الاستمرار في استخدام الخدمة بعد التغييرات يُعدّ قبولاً.",
    },
    // Section titles
    sec_collect:    { en: "Information We Collect",   id: "Informasi yang Kami Kumpulkan", ru: "Информация, которую мы собираем", zh: "我们收集的信息", ar: "المعلومات التي نجمعها" },
    sec_security:   { en: "Data Security",            id: "Keamanan Data",                 ru: "Безопасность данных",             zh: "数据安全",      ar: "أمان البيانات" },
    sec_cookies:    { en: "Cookie Usage",             id: "Penggunaan Cookies",            ru: "Использование cookies",           zh: "Cookie 使用",   ar: "استخدام ملفات الكوكيز" },
    sec_copyright:  { en: "Copyright & Usage",        id: "Hak Cipta & Penggunaan",        ru: "Авторские права и использование", zh: "版权与使用",    ar: "حقوق النشر والاستخدام" },
    sec_platforms:  { en: "Supported Platforms",      id: "Platform yang Didukung",        ru: "Поддерживаемые платформы",       zh: "支持的平台",    ar: "المنصات المدعومة" },
    sec_account:    { en: "Account & API Terms",      id: "Ketentuan Akun & API",          ru: "Условия аккаунта и API",          zh: "账号与 API 条款", ar: "شروط الحساب و API" },
    // Section content
    collect_body: {
      en: "We collect minimal information across all our services:\n\n• The video URL you submit (TikTok, Douyin, or any supported platform)\n• Anonymous analytics (visitor counts, pages visited)\n• Technical info like browser type and device\n• Account data if you register (username, email — encrypted)\n\nWe do NOT collect:\n• Personal info beyond what you provide\n• Your TikTok, Douyin, or social media login credentials\n• Your browsing history outside our site\n• Payment information",
      id: "Kami mengumpulkan informasi minimal di semua layanan kami:\n\n• URL video yang Anda masukkan (TikTok, Douyin, atau platform yang didukung)\n• Data analitik anonim (jumlah pengunjung, halaman)\n• Informasi teknis seperti jenis browser dan perangkat\n• Data akun jika Anda mendaftar (username, email — terenkripsi)\n\nKami TIDAK mengumpulkan:\n• Informasi pribadi di luar yang Anda berikan\n• Kredensial login TikTok, Douyin, atau media sosial Anda\n• Riwayat browsing di luar situs kami\n• Informasi pembayaran",
      ru: "Мы собираем минимум информации по всем нашим сервисам:\n\n• URL видео (TikTok, Douyin или другая платформа)\n• Анонимная аналитика\n• Технические данные (браузер, устройство)\n• Данные аккаунта при регистрации (имя, email — зашифровано)\n\nМЫ НЕ собираем:\n• Личные данные сверх предоставленного\n• Данные входа в соцсети\n• Историю просмотров\n• Платёжные данные",
      zh: "我们在所有服务中收集最少量的信息：\n\n• 您提交的视频链接（TikTok、抖音或任何受支持平台）\n• 匿名分析数据（访客数量、浏览页面）\n• 技术信息（浏览器类型和设备）\n• 账号数据（如您注册：用户名、邮箱——已加密）\n\n我们不收集：\n• 超出您提供范围的个人信息\n• 您的 TikTok、抖音或社交媒体登录凭据\n• 您在我们网站以外的浏览记录\n• 支付信息",
      ar: "نجمع معلومات بالحد الأدنى عبر جميع خدماتنا:\n\n• رابط الفيديو الذي تُدخله (TikTok أو Douyin أو أي منصة مدعومة)\n• بيانات تحليلية مجهولة الهوية\n• معلومات تقنية (نوع المتصفح والجهاز)\n• بيانات الحساب عند التسجيل (اسم المستخدم، البريد — مشفر)\n\nلا نجمع:\n• معلومات شخصية تتجاوز ما تقدمه\n• بيانات تسجيل الدخول إلى منصاتك\n• سجل التصفح خارج موقعنا\n• معلومات مالية",
    },
    security_body: {
      en: "Your security is our priority across all platforms:\n\n• All connections encrypted with SSL/TLS (HTTPS)\n• We never permanently store downloaded videos\n• URLs are processed temporarily and discarded\n• Passwords are hashed with SHA-256 — never stored in plain text\n• Sessions use secure JWT tokens with 30-day expiry\n• API keys are unique per user with format snp-xxxxx\n• Rate limiting protects all endpoints from abuse",
      id: "Keamanan Anda adalah prioritas kami di semua platform:\n\n• Semua koneksi dienkripsi SSL/TLS (HTTPS)\n• Kami tidak pernah menyimpan video yang diunduh secara permanen\n• URL diproses sementara dan dibuang\n• Password di-hash dengan SHA-256 — tidak pernah disimpan teks biasa\n• Sesi menggunakan token JWT aman dengan masa berlaku 30 hari\n• API key unik per pengguna dengan format snp-xxxxx\n• Rate limiting melindungi semua endpoint dari penyalahgunaan",
      ru: "Безопасность — наш приоритет:\n\n• SSL/TLS шифрование\n• Видео не хранятся\n• Пароли хэшируются SHA-256\n• JWT сессии с истечением 30 дней\n• Уникальные API ключи формата snp-xxxxx\n• Rate limiting защищает от злоупотреблений",
      zh: "您的安全是我们在所有平台上的首要任务：\n\n• 所有连接均使用 SSL/TLS (HTTPS) 加密\n• 我们从不永久存储下载的视频\n• URL 仅被临时处理后丢弃\n• 密码使用 SHA-256 哈希——从不明文存储\n• 会话使用安全 JWT 令牌，有效期 30 天\n• API 密钥每用户唯一，格式为 snp-xxxxx\n• 速率限制保护所有端点免遭滥用",
      ar: "أمانك هو أولويتنا عبر جميع المنصات:\n\n• تشفير SSL/TLS لجميع الاتصالات\n• لا نخزن مقاطع الفيديو نهائياً\n• تُعالج الروابط مؤقتاً ثم تُحذف\n• تُشفَّر كلمات المرور بـ SHA-256\n• جلسات JWT آمنة بصلاحية 30 يوماً\n• مفاتيح API فريدة بصيغة snp-xxxxx\n• تحديد معدل الطلبات لحماية جميع النقاط",
    },
    cookies_body: {
      en: "We use cookies to:\n\n• Remember your language preference (applies globally across all pages)\n• Maintain your login session\n• Improve site performance\n• Anonymous usage analytics\n\nWe do NOT use advertising or tracking cookies. You can manage cookies in your browser settings at any time.",
      id: "Kami menggunakan cookies untuk:\n\n• Mengingat preferensi bahasa Anda (berlaku global di semua halaman)\n• Mempertahankan sesi login Anda\n• Meningkatkan performa situs\n• Analitik penggunaan anonim\n\nKami TIDAK menggunakan cookies iklan atau pelacakan. Anda dapat mengelola cookies di pengaturan browser kapan saja.",
      ru: "Мы используем cookies для:\n\n• Сохранения языковых настроек (глобально на всех страницах)\n• Поддержания сессии входа\n• Улучшения производительности\n• Анонимной аналитики\n\nРекламных или отслеживающих cookies нет.",
      zh: "我们使用 Cookie 来：\n\n• 记住您的语言偏好（全局适用于所有页面）\n• 维护您的登录会话\n• 提升网站性能\n• 匿名使用分析\n\n我们不使用广告或跟踪 Cookie。您可以随时在浏览器设置中管理 Cookie。",
      ar: "نستخدم ملفات الكوكيز من أجل:\n\n• تذكر تفضيلات اللغة (تنطبق عالمياً على جميع الصفحات)\n• الحفاظ على جلسة تسجيل الدخول\n• تحسين أداء الموقع\n• تحليلات الاستخدام المجهولة\n\nلا نستخدم كوكيز الإعلانات أو التتبع.",
    },
    copyright_body: {
      en: "Important copyright notice for all platforms:\n\n• Snaptok does not own any downloaded content\n• Users are fully responsible for how they use downloaded content\n• Always respect creator copyrights regardless of platform\n• Use downloaded content for personal use only\n• Do not redistribute, sell, or monetize without creator permission\n• This applies equally to TikTok, Douyin, and all other supported platforms",
      id: "Pemberitahuan hak cipta penting untuk semua platform:\n\n• Snaptok tidak memiliki konten yang diunduh\n• Pengguna bertanggung jawab penuh atas cara penggunaan konten yang diunduh\n• Selalu hormati hak cipta kreator terlepas dari platformnya\n• Gunakan konten yang diunduh hanya untuk keperluan pribadi\n• Jangan mendistribusikan, menjual, atau memonetisasi tanpa izin kreator\n• Ini berlaku sama untuk TikTok, Douyin, dan semua platform yang didukung lainnya",
      ru: "Важное уведомление об авторских правах для всех платформ:\n\n• Snaptok не владеет скачанным контентом\n• Пользователи несут полную ответственность\n• Уважайте авторские права независимо от платформы\n• Только для личного использования\n• Не перепродавайте без разрешения\n• Применимо к TikTok, Douyin и всем поддерживаемым платформам",
      zh: "所有平台重要版权声明：\n\n• Snaptok 不拥有任何下载内容\n• 用户对下载内容的使用方式负全责\n• 无论平台如何，始终尊重创作者版权\n• 下载内容仅供个人使用\n• 未经创作者许可，不得转发、销售或变现\n• 适用于 TikTok、抖音及所有受支持平台",
      ar: "إشعار حقوق النشر المهم لجميع المنصات:\n\n• Snaptok لا تمتلك أي محتوى محمّل\n• يتحمل المستخدمون المسؤولية الكاملة\n• احترم حقوق المبدعين بغض النظر عن المنصة\n• للاستخدام الشخصي فقط\n• لا تُعِد التوزيع أو البيع بدون إذن\n• ينطبق على TikTok وDouyin وجميع المنصات المدعومة",
    },
    platforms_body: {
      en: "Snaptok supports the following platforms under a single unified policy:\n\n• TikTok (tiktok.com, vm.tiktok.com, vt.tiktok.com)\n• Douyin 抖音 (douyin.com, v.douyin.com)\n\nAll platforms are treated equally under this privacy policy and terms of service. No platform-specific exceptions apply.",
      id: "Snaptok mendukung platform berikut di bawah satu kebijakan terpadu:\n\n• TikTok (tiktok.com, vm.tiktok.com, vt.tiktok.com)\n• Douyin 抖音 (douyin.com, v.douyin.com)\n\nSemua platform diperlakukan sama dalam kebijakan privasi dan ketentuan layanan ini. Tidak ada pengecualian khusus platform.",
      ru: "Snaptok поддерживает следующие платформы в рамках единой политики:\n\n• TikTok (tiktok.com)\n• Douyin 抖音 (douyin.com)\n\nВсе платформы рассматриваются одинаково.",
      zh: "Snaptok 在统一政策下支持以下平台：\n\n• TikTok (tiktok.com, vm.tiktok.com, vt.tiktok.com)\n• 抖音 Douyin (douyin.com, v.douyin.com)\n\n所有平台在本隐私政策和服务条款下享有同等待遇，不设平台特定例外。",
      ar: "تدعم Snaptok المنصات التالية تحت سياسة موحدة واحدة:\n\n• TikTok (tiktok.com)\n• Douyin 抖音 (douyin.com)\n\nجميع المنصات تُعامَل بالتساوي تحت سياسة الخصوصية هذه وشروط الخدمة.",
    },
    account_body: {
      en: "If you create an account and use the API:\n\n• Your email is used only for OTP verification and security notifications\n• API keys are non-transferable and for your personal use only\n• You agree not to abuse the API (spam, scraping at scale, reselling)\n• We reserve the right to suspend accounts that violate these terms\n• Account data can be exported or deleted at any time from your profile page\n• These terms apply universally regardless of which platform (TikTok/Douyin) you are downloading from",
      id: "Jika Anda membuat akun dan menggunakan API:\n\n• Email Anda hanya digunakan untuk verifikasi OTP dan notifikasi keamanan\n• API key tidak dapat dipindahtangankan dan hanya untuk penggunaan pribadi\n• Anda setuju untuk tidak menyalahgunakan API (spam, scraping massal, menjual kembali)\n• Kami berhak menangguhkan akun yang melanggar ketentuan ini\n• Data akun dapat diekspor atau dihapus kapan saja dari halaman profil\n• Ketentuan ini berlaku secara universal terlepas dari platform yang Anda unduh",
      ru: "При создании аккаунта и использовании API:\n\n• Email используется только для OTP и уведомлений\n• API ключи непередаваемы\n• Запрещено злоупотреблять API\n• Аккаунт можно удалить в любое время\n• Условия применяются ко всем платформам",
      zh: "如果您创建账号并使用 API：\n\n• 您的邮箱仅用于 OTP 验证和安全通知\n• API 密钥不可转让，仅供个人使用\n• 您同意不滥用 API（垃圾邮件、大规模爬取、转售）\n• 我们保留暂停违规账号的权利\n• 账号数据可随时从个人资料页面导出或删除\n• 这些条款普遍适用，无论您从哪个平台下载",
      ar: "إذا أنشأت حساباً واستخدمت API:\n\n• يُستخدم بريدك فقط للتحقق عبر OTP والإشعارات الأمنية\n• مفاتيح API غير قابلة للتحويل وللاستخدام الشخصي فقط\n• توافق على عدم إساءة استخدام API\n• نحتفظ بحق تعليق الحسابات المخالفة\n• يمكن تصدير بيانات الحساب أو حذفها في أي وقت\n• هذه الشروط تنطبق عالمياً بغض النظر عن المنصة",
    },
  },

  // ── Features ────────────────────────────────────────────────────────────────
  features: {
    why_tiktok: { en: "Why Choose Snaptok for TikTok?", id: "Kenapa Pilih Snaptok untuk TikTok?", ru: "Почему Snaptok для TikTok?",   zh: "为什么选择 Snaptok 下载 TikTok？", ar: "لماذا تختار Snaptok لـ TikTok؟" },
    why_douyin: { en: "Why Choose Snaptok for Douyin?", id: "Kenapa Pilih Snaptok untuk Douyin?", ru: "Почему Snaptok для Douyin?",   zh: "为什么选择 Snaptok 下载抖音？",    ar: "لماذا تختار Snaptok لـ Douyin؟" },
    fast_t:     { en: "Lightning Fast",       id: "Super Cepat",            ru: "Молниеносно",           zh: "极速下载",      ar: "سريع جداً" },
    fast_d:     { en: "Download videos in seconds. No waiting, no queue.", id: "Unduh video dalam hitungan detik. Tanpa antri.", ru: "Видео за секунды. Без очереди.", zh: "几秒内完成下载，无需等待。", ar: "تحميل الفيديو في ثوانٍ. بدون انتظار." },
    safe_t:     { en: "Safe & Secure",        id: "Aman & Terpercaya",      ru: "Безопасно",             zh: "安全可靠",       ar: "آمن وموثوق" },
    safe_d:     { en: "No registration needed. Your data is never stored.", id: "Tanpa registrasi. Data kamu tidak pernah disimpan.", ru: "Без регистрации. Данные не хранятся.", zh: "无需注册，数据从不存储。", ar: "بدون تسجيل. بياناتك لا تُخزَّن أبداً." },
    nowm_t:     { en: "No Watermark",         id: "Tanpa Watermark",        ru: "Без водяного знака",    zh: "无水印",         ar: "بدون علامة مائية" },
    nowm_d:     { en: "Download TikTok videos in full HD without any logo or watermark.", id: "Unduh video TikTok HD penuh tanpa logo atau watermark.", ru: "Скачивайте HD без логотипа и знаков.", zh: "下载无 Logo 和水印的 TikTok 全高清视频。", ar: "حمّل مقاطع TikTok بجودة كاملة بدون شعار أو علامة مائية." },
    nowm_d_dy:  { en: "Download Douyin videos in full HD without any logo or watermark.", id: "Unduh video Douyin HD penuh tanpa logo atau watermark.", ru: "Скачивайте Douyin HD без логотипа.", zh: "下载无 Logo 和水印的抖音全高清视频。", ar: "حمّل مقاطع Douyin بجودة كاملة بدون شعار أو علامة مائية." },
    multi_t:    { en: "All Devices",          id: "Semua Perangkat",        ru: "Все устройства",        zh: "全设备支持",     ar: "جميع الأجهزة" },
    multi_d:    { en: "Works on iPhone, Android, PC, Mac — no app needed.", id: "Berjalan di iPhone, Android, PC, Mac — tanpa aplikasi.", ru: "iPhone, Android, ПК, Mac — без установки.", zh: "支持 iPhone、Android、PC、Mac，无需安装应用。", ar: "يعمل على iPhone وAndroid والكمبيوتر بدون تطبيق." },
    china_t:    { en: "Douyin (抖音) Support", id: "Dukungan Douyin (抖音)", ru: "Поддержка Douyin (抖音)", zh: "支持抖音 (Douyin)", ar: "دعم Douyin (抖音)" },
    china_d:    { en: "Download videos from Douyin — the Chinese version of TikTok.", id: "Unduh video dari Douyin — versi TikTok China.", ru: "Скачивайте видео из Douyin — китайской версии TikTok.", zh: "下载来自抖音的视频——TikTok 的中国版本。", ar: "حمّل مقاطع من Douyin — النسخة الصينية من TikTok." },
  },

  // ── Terms of Service ────────────────────────────────────────────────────────
  terms: {
    title:           { en: "Terms of Service",          id: "Syarat & Ketentuan",          ru: "Условия использования",         zh: "服务条款",       ar: "شروط الخدمة" },
    subtitle:        { en: "Please read these terms carefully before using Snaptok.", id: "Harap baca ketentuan ini dengan seksama sebelum menggunakan Snaptok.", ru: "Пожалуйста, внимательно прочитайте условия перед использованием Snaptok.", zh: "使用 Snaptok 前请仔细阅读这些条款。", ar: "يرجى قراءة هذه الشروط بعناية قبل استخدام Snaptok." },
    accept_title:    { en: "Acceptance of Terms",       id: "Penerimaan Ketentuan",         ru: "Принятие условий",              zh: "接受条款",       ar: "قبول الشروط" },
    accept_body:     { en: "By using Snaptok, you agree to these Terms of Service and our Privacy Policy. If you disagree with any part, please do not use our service.\n\n• You must be at least 13 years old to use this service\n• You are responsible for your use of the service\n• These terms apply to all visitors, users, and others who access the service", id: "Dengan menggunakan Snaptok, kamu menyetujui Syarat & Ketentuan dan Kebijakan Privasi kami. Jika tidak setuju, mohon jangan gunakan layanan kami.\n\n• Kamu harus berusia minimal 13 tahun untuk menggunakan layanan ini\n• Kamu bertanggung jawab atas penggunaan layanan\n• Ketentuan ini berlaku untuk semua pengunjung, pengguna, dan pihak yang mengakses layanan", ru: "Используя Snaptok, вы соглашаетесь с настоящими Условиями и Политикой конфиденциальности.\n\n• Вам должно быть не менее 13 лет\n• Вы несёте ответственность за использование сервиса\n• Условия распространяются на всех пользователей", zh: "使用 Snaptok 即表示您同意这些服务条款和我们的隐私政策。\n\n• 您必须年满 13 岁才能使用本服务\n• 您对自己使用服务的行为负责\n• 这些条款适用于所有访客、用户和访问服务的人员", ar: "باستخدامك Snaptok، فإنك توافق على شروط الخدمة وسياسة الخصوصية.\n\n• يجب أن يكون عمرك 13 عاماً على الأقل\n• أنت مسؤول عن استخدامك للخدمة\n• تنطبق هذه الشروط على جميع الزوار والمستخدمين" },
    use_title:       { en: "Acceptable Use Policy",     id: "Kebijakan Penggunaan",         ru: "Допустимое использование",      zh: "可接受使用政策", ar: "سياسة الاستخدام المقبول" },
    use_body:        { en: "You may use Snaptok for personal, non-commercial purposes only:\n\n✓ Downloading videos for personal offline viewing\n✓ Saving your own content for backup\n✓ Educational and research purposes\n\n✗ Redistributing downloaded content commercially\n✗ Scraping or automated bulk downloading\n✗ Violating creator copyrights or platform ToS\n✗ Using the API to build competing services without permission", id: "Kamu boleh menggunakan Snaptok hanya untuk keperluan pribadi dan non-komersial:\n\n✓ Mengunduh video untuk ditonton offline secara pribadi\n✓ Menyimpan konten milik sendiri sebagai backup\n✓ Keperluan pendidikan dan penelitian\n\n✗ Mendistribusikan konten yang diunduh secara komersial\n✗ Scraping atau download massal otomatis\n✗ Melanggar hak cipta kreator atau ToS platform\n✗ Menggunakan API untuk membangun layanan saingan tanpa izin", ru: "Вы можете использовать Snaptok только в личных некоммерческих целях:\n\n✓ Скачивание для личного просмотра офлайн\n✓ Резервное копирование своего контента\n✓ Образование и исследования\n\n✗ Коммерческое распространение скачанного\n✗ Автоматическое массовое скачивание\n✗ Нарушение авторских прав и ToS платформ\n✗ Использование API для конкурирующих сервисов", zh: "您只能出于个人非商业目的使用 Snaptok：\n\n✓ 下载视频以供个人离线观看\n✓ 保存自己的内容作为备份\n✓ 教育和研究目的\n\n✗ 以商业方式再发布下载内容\n✗ 自动化批量下载或抓取\n✗ 侵犯创作者版权或违反平台服务条款\n✗ 使用 API 构建竞争服务", ar: "يمكنك استخدام Snaptok للأغراض الشخصية غير التجارية فقط:\n\n✓ تحميل مقاطع للمشاهدة الشخصية دون اتصال\n✓ حفظ محتواك الخاص كنسخة احتياطية\n✓ الأغراض التعليمية والبحثية\n\n✗ إعادة توزيع المحتوى المحمّل تجارياً\n✗ الاستخلاص التلقائي أو التحميل الجماعي\n✗ انتهاك حقوق المبدعين أو شروط المنصة\n✗ استخدام API لبناء خدمات منافسة" },
    disclaimer_title:{ en: "Disclaimer & Liability",   id: "Disclaimer & Tanggung Jawab", ru: "Отказ от ответственности",      zh: "免责声明",       ar: "إخلاء المسؤولية" },
    disclaimer_body: { en: "Snaptok is provided \"as is\" without warranties of any kind:\n\n• We are not affiliated with TikTok, Douyin, or ByteDance\n• We do not guarantee uninterrupted or error-free service\n• We are not responsible for how you use downloaded content\n• Service availability may vary based on third-party platform changes\n• We reserve the right to modify or discontinue the service at any time\n• Violation of these terms may result in account suspension", id: "Snaptok disediakan \"apa adanya\" tanpa jaminan apapun:\n\n• Kami tidak berafiliasi dengan TikTok, Douyin, atau ByteDance\n• Kami tidak menjamin layanan yang tidak terputus atau bebas error\n• Kami tidak bertanggung jawab atas cara kamu menggunakan konten yang diunduh\n• Ketersediaan layanan dapat berubah berdasarkan perubahan platform pihak ketiga\n• Kami berhak mengubah atau menghentikan layanan kapan saja\n• Pelanggaran ketentuan dapat mengakibatkan penangguhan akun", ru: "Snaptok предоставляется «как есть» без каких-либо гарантий:\n\n• Мы не связаны с TikTok, Douyin или ByteDance\n• Мы не гарантируем бесперебойную работу\n• Мы не несём ответственности за использование скачанного контента\n• Доступность сервиса может меняться\n• Мы вправе изменить или прекратить сервис в любое время\n• Нарушение условий может привести к блокировке аккаунта", zh: "Snaptok 按\"现状\"提供，不提供任何形式的保证：\n\n• 我们与 TikTok、抖音或字节跳动无关联\n• 我们不保证服务不中断或无错误\n• 我们不对您如何使用下载内容负责\n• 服务可用性可能因第三方平台变化而变化\n• 我们保留随时修改或停止服务的权利\n• 违反这些条款可能导致账号被暂停", ar: "يُقدَّم Snaptok \"كما هو\" دون أي ضمانات:\n\n• لسنا تابعين لـ TikTok أو Douyin أو ByteDance\n• لا نضمن خدمة متواصلة أو خالية من الأخطاء\n• لسنا مسؤولين عن كيفية استخدامك للمحتوى المحمّل\n• قد تتغير توفر الخدمة بسبب تغييرات المنصات الخارجية\n• نحتفظ بحق تعديل الخدمة أو إيقافها في أي وقت\n• قد تؤدي المخالفات إلى تعليق الحساب" },
  },
} as const;

export function t(obj: Record<string, string>, lang: LangCode): string {
  return (obj as Record<string, string>)[lang] ?? (obj as Record<string, string>)["en"] ?? "";
}
