"use client";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Shield, Eye, Lock, Cookie, FileText, Globe, Key, ChevronRight } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { LangCode } from "@/lib/i18n";
import Link from "next/link";

type L = Record<LangCode,string>;

const heading: L = { en:"Privacy Policy", id:"Kebijakan Privasi", ru:"Политика конфиденциальности", zh:"隐私政策", ar:"سياسة الخصوصية" };
const updated: L = { en:"Last updated: March 2026", id:"Terakhir diperbarui: Maret 2026", ru:"Последнее обновление: март 2026", zh:"最后更新：2026 年 3 月", ar:"آخر تحديث: مارس 2026" };
const intro: L   = {
  en:"Snaptok is built on a simple principle: your privacy matters. We collect the absolute minimum data needed to operate the service safely, and nothing more. This policy explains clearly and completely what we collect, why, and how you can control it.",
  id:"Snaptok dibangun di atas prinsip sederhana: privasimu penting. Kami mengumpulkan data seminimal mungkin yang dibutuhkan untuk mengoperasikan layanan dengan aman, dan tidak lebih. Kebijakan ini menjelaskan dengan jelas dan lengkap apa yang kami kumpulkan, mengapa, dan bagaimana kamu bisa mengontrolnya.",
  ru:"Snaptok построен на простом принципе: ваша конфиденциальность важна. Мы собираем абсолютный минимум данных, необходимых для безопасной работы сервиса, и не более. Эта политика ясно и полно объясняет, что мы собираем, почему и как вы можете это контролировать.",
  zh:"Snaptok 建立在一个简单原则之上：您的隐私很重要。我们只收集安全运营服务所需的绝对最少数据，仅此而已。本政策清晰完整地解释了我们收集什么、为什么收集，以及您如何控制它。",
  ar:"يُبنى Snaptok على مبدأ بسيط: خصوصيتك مهمة. نجمع الحد الأدنى المطلق من البيانات اللازمة لتشغيل الخدمة بأمان، ولا شيء أكثر. تشرح هذه السياسة بوضوح وشمولية ما نجمعه ولماذا وكيف يمكنك التحكم في ذلك.",
};

type Section = { icon: React.ElementType; color: string; title: L; body: L };

const sections: Section[] = [
  {
    icon: Eye, color: "blue",
    title: { en:"What We Collect", id:"Apa yang Kami Kumpulkan", ru:"Что мы собираем", zh:"我们收集什么", ar:"ما الذي نجمعه" },
    body: {
      en:"For anonymous use (no account required):\n• We do NOT store the video links you paste — they are processed in memory and immediately discarded\n• We do NOT log your IP address for analytics purposes\n• We do NOT use advertising trackers or third-party analytics\n• Standard server logs (HTTP access logs) are retained for up to 7 days for security monitoring only, then automatically deleted\n\nIf you create a free account:\n• Email address — used only for OTP verification and security notifications\n• Username — your chosen display name\n• Hashed password — stored securely using bcrypt, we never see your plaintext password\n• API usage statistics — request counts per day, aggregated for your dashboard\n• Device fingerprint hash — a one-way hash used to manage login sessions, not linked to your identity",
      id:"Untuk penggunaan anonim (tidak perlu akun):\n• Kami TIDAK menyimpan link video yang kamu tempel — diproses di memori dan segera dibuang\n• Kami TIDAK mencatat alamat IP untuk tujuan analitik\n• Kami TIDAK menggunakan pelacak iklan atau analitik pihak ketiga\n• Log server standar (log akses HTTP) disimpan hingga 7 hari untuk pemantauan keamanan saja, lalu otomatis dihapus\n\nJika kamu membuat akun gratis:\n• Alamat email — hanya digunakan untuk verifikasi OTP dan notifikasi keamanan\n• Username — nama tampilan pilihanmu\n• Password yang di-hash — disimpan dengan aman menggunakan bcrypt, kami tidak pernah melihat passwordmu dalam teks biasa\n• Statistik penggunaan API — jumlah request per hari, diagregasi untuk dasbor-mu\n• Hash fingerprint perangkat — hash satu arah untuk mengelola sesi login, tidak terhubung ke identitasmu",
      ru:"Для анонимного использования (аккаунт не нужен):\n• Мы НЕ храним вставленные ссылки — они обрабатываются в памяти и немедленно удаляются\n• Мы НЕ записываем ваш IP для аналитики\n• Мы НЕ используем рекламные трекеры или сторонние аналитические системы\n• Стандартные серверные логи хранятся до 7 дней для мониторинга безопасности, затем удаляются\n\nЕсли вы создаёте аккаунт:\n• Email — только для OTP и уведомлений безопасности\n• Имя пользователя — выбранное вами отображаемое имя\n• Хешированный пароль — хранится через bcrypt\n• Статистика API — количество запросов в день\n• Хеш отпечатка устройства — для управления сессиями",
      zh:"对于匿名使用（无需账号）：\n• 我们不存储您粘贴的视频链接——在内存中处理后立即丢弃\n• 我们不记录您的 IP 地址用于分析\n• 我们不使用广告追踪器或第三方分析\n• 标准服务器日志保留最多 7 天用于安全监控，然后自动删除\n\n如果您创建免费账号：\n• 电子邮件地址——仅用于 OTP 验证和安全通知\n• 用户名——您选择的显示名称\n• 哈希密码——使用 bcrypt 安全存储，我们永远看不到您的明文密码\n• API 使用统计——每日请求计数，为您的仪表板聚合\n• 设备指纹哈希——用于管理登录会话的单向哈希，不与您的身份关联",
      ar:"للاستخدام المجهول (لا حاجة لحساب):\n• لا نخزن روابط الفيديو التي تلصقها — تُعالج في الذاكرة وتُحذف فوراً\n• لا نسجل عنوان IP للتحليل\n• لا نستخدم متتبعات إعلانية أو تحليلات طرف ثالث\n• تُحتفظ سجلات الخادم القياسية لمدة 7 أيام للمراقبة الأمنية فقط، ثم تُحذف تلقائياً\n\nإذا أنشأت حساباً مجانياً:\n• البريد الإلكتروني — للتحقق بـ OTP والتنبيهات الأمنية فقط\n• اسم المستخدم — اسمك المعروض\n• كلمة المرور المجزأة — مخزنة بأمان باستخدام bcrypt\n• إحصائيات استخدام API — عدد الطلبات يومياً\n• تجزئة بصمة الجهاز — لإدارة جلسات تسجيل الدخول",
    },
  },
  {
    icon: Lock, color: "emerald",
    title: { en:"How We Protect Your Data", id:"Bagaimana Kami Melindungi Datamu", ru:"Как мы защищаем ваши данные", zh:"我们如何保护您的数据", ar:"كيف نحمي بياناتك" },
    body: {
      en:"We take security seriously and implement industry-standard practices:\n• All connections are encrypted via HTTPS/TLS — no data is ever transmitted in plaintext\n• Passwords are hashed using bcrypt with salt — even if our database were compromised, your actual password would remain secure\n• API keys are stored as hashed values — we cannot retrieve your key, only verify it\n• OTP codes expire after 10 minutes and can only be used once\n• Login sessions are bound to device fingerprints — a stolen cookie cannot be used from a different device\n• Active session management lets you revoke any suspicious session from your profile page at any time\n• Our infrastructure is hosted on reputable cloud providers with industry-standard security certifications",
      id:"Kami serius memandang keamanan dan menerapkan praktik standar industri:\n• Semua koneksi dienkripsi melalui HTTPS/TLS — tidak ada data yang pernah dikirim dalam teks biasa\n• Password di-hash menggunakan bcrypt dengan salt — bahkan jika database kami disusupi, password aslimu tetap aman\n• API key disimpan sebagai nilai yang di-hash — kami tidak dapat mengambil key-mu, hanya memverifikasinya\n• Kode OTP kedaluwarsa setelah 10 menit dan hanya bisa digunakan sekali\n• Sesi login terikat pada fingerprint perangkat — cookie yang dicuri tidak bisa digunakan dari perangkat lain\n• Manajemen sesi aktif memungkinkanmu mencabut sesi mencurigakan apapun dari halaman profilmu kapan saja\n• Infrastruktur kami dihosting di penyedia cloud terkemuka dengan sertifikasi keamanan standar industri",
      ru:"Мы серьёзно относимся к безопасности:\n• Все соединения зашифрованы через HTTPS/TLS\n• Пароли хешируются с bcrypt + соль — даже при взломе БД ваш пароль в безопасности\n• API-ключи хранятся как хеши\n• OTP-коды истекают через 10 минут и используются однократно\n• Сессии привязаны к отпечатку устройства\n• Управление активными сессиями доступно в профиле\n• Инфраструктура — у надёжных облачных провайдеров",
      zh:"我们认真对待安全并实施行业标准实践：\n• 所有连接通过 HTTPS/TLS 加密——数据永远不会以明文传输\n• 密码使用加盐 bcrypt 哈希——即使数据库被入侵，您的实际密码仍然安全\n• API 密钥以哈希值存储——我们无法检索您的密钥，只能验证它\n• OTP 代码 10 分钟后过期，只能使用一次\n• 登录会话与设备指纹绑定\n• 活跃会话管理让您随时从个人资料页面撤销任何可疑会话",
      ar:"نأخذ الأمان بجدية ونطبق الممارسات القياسية في الصناعة:\n• جميع الاتصالات مشفرة عبر HTTPS/TLS\n• كلمات المرور مجزأة باستخدام bcrypt مع salt\n• مفاتيح API مخزنة كقيم مجزأة\n• تنتهي صلاحية رموز OTP بعد 10 دقائق\n• جلسات تسجيل الدخول مرتبطة ببصمة الجهاز\n• إدارة الجلسات النشطة متاحة من صفحة ملفك الشخصي",
    },
  },
  {
    icon: Cookie, color: "amber",
    title: { en:"Cookies & Local Storage", id:"Cookie & Penyimpanan Lokal", ru:"Cookies и локальное хранилище", zh:"Cookie 和本地存储", ar:"ملفات تعريف الارتباط والتخزين المحلي" },
    body: {
      en:"We use only essential cookies and storage — nothing for advertising or cross-site tracking:\n• Session cookie (snaptok_session): An HttpOnly, Secure cookie that stores your encrypted login token. It expires after 30 days of inactivity. You can delete it at any time by logging out.\n• Theme preference: Stored in localStorage to remember whether you prefer light or dark mode. Contains no personal information.\n• Language preference: Stored in localStorage to remember your chosen interface language.\n\nWe do NOT use:\n• Advertising cookies or retargeting pixels\n• Google Analytics, Facebook Pixel, or similar tracking services\n• Any persistent identifiers that follow you across websites",
      id:"Kami hanya menggunakan cookie dan penyimpanan yang penting — tidak ada untuk periklanan atau pelacakan lintas situs:\n• Cookie sesi (snaptok_session): Cookie HttpOnly, Secure yang menyimpan token login terenkripsimu. Kedaluwarsa setelah 30 hari tidak aktif. Kamu bisa menghapusnya kapan saja dengan logout.\n• Preferensi tema: Disimpan di localStorage untuk mengingat apakah kamu memilih mode terang atau gelap. Tidak berisi informasi pribadi.\n• Preferensi bahasa: Disimpan di localStorage untuk mengingat bahasa antarmuka pilihanmu.\n\nKami TIDAK menggunakan:\n• Cookie iklan atau piksel retargeting\n• Google Analytics, Facebook Pixel, atau layanan pelacakan serupa\n• Pengenal persisten apapun yang mengikutimu di berbagai website",
      ru:"Мы используем только необходимые cookies:\n• Сессионный cookie (snaptok_session): HttpOnly, Secure, хранит зашифрованный токен входа. Истекает через 30 дней неактивности.\n• Тема: в localStorage для запоминания светлой/тёмной темы.\n• Язык: в localStorage для запоминания выбранного языка.\n\nМы НЕ используем:\n• Рекламные cookies или пиксели ретаргетинга\n• Google Analytics, Facebook Pixel или аналогичные сервисы\n• Постоянные идентификаторы для отслеживания между сайтами",
      zh:"我们只使用必要的 Cookie 和存储——不用于广告或跨站追踪：\n• 会话 Cookie (snaptok_session)：存储您加密登录令牌的 HttpOnly、Secure Cookie。30 天不活动后过期。您可以随时通过注销删除它。\n• 主题偏好：存储在 localStorage 中，记住您偏好浅色还是深色模式。不含个人信息。\n• 语言偏好：存储在 localStorage 中，记住您选择的界面语言。\n\n我们不使用：\n• 广告 Cookie 或再营销像素\n• Google Analytics、Facebook Pixel 或类似追踪服务\n• 任何跨网站追踪您的持久标识符",
      ar:"نستخدم فقط ملفات تعريف الارتباط والتخزين الأساسية:\n• ملف تعريف الجلسة (snaptok_session): HttpOnly وSecure يخزن رمز تسجيل الدخول المشفر. ينتهي بعد 30 يوماً من عدم النشاط.\n• تفضيل السمة: مخزن في localStorage للوضع الفاتح أو الداكن.\n• تفضيل اللغة: مخزن في localStorage.\n\nلا نستخدم:\n• ملفات تعريف الارتباط الإعلانية أو بكسلات إعادة الاستهداف\n• Google Analytics أو Facebook Pixel أو خدمات التتبع المماثلة",
    },
  },
  {
    icon: Globe, color: "rose",
    title: { en:"Supported Platforms", id:"Platform yang Didukung", ru:"Поддерживаемые платформы", zh:"支持的平台", ar:"المنصات المدعومة" },
    body: {
      en:"Snaptok currently supports downloading from short-form video platforms. All supported platforms are treated equally under this privacy policy — no platform-specific exceptions apply.\n\nImportant notes:\n• Snaptok is an independent tool and is not affiliated with, endorsed by, or connected to any video platform or its parent companies\n• We do not have special API access — we process publicly available video data the same way a browser would\n• We respect each platform's publicly available video permissions. Private or restricted content cannot be downloaded.\n• Downloading content for personal use is generally acceptable, but redistributing or commercializing downloaded content without creator permission may violate copyright law",
      id:"Snaptok saat ini mendukung unduhan dari platform video format pendek. Semua platform yang didukung diperlakukan secara setara di bawah kebijakan privasi ini — tidak ada pengecualian khusus platform.\n\nCatatan penting:\n• Snaptok adalah alat independen dan tidak berafiliasi, didukung, atau terhubung dengan platform video manapun atau perusahaan induknya\n• Kami tidak memiliki akses API khusus — kami memproses data video yang tersedia secara publik sama seperti yang dilakukan browser\n• Kami menghormati izin video yang tersedia secara publik dari setiap platform. Konten privat atau terbatas tidak dapat diunduh.\n• Mengunduh konten untuk penggunaan pribadi umumnya dapat diterima, tetapi mendistribusikan ulang atau mengkomersilkan konten yang diunduh tanpa izin kreator dapat melanggar hukum hak cipta",
      ru:"Snaptok поддерживает загрузку с платформ коротких видео. Все поддерживаемые платформы обрабатываются одинаково.\n\nВажные примечания:\n• Snaptok — независимый инструмент, не связанный ни с одной видеоплатформой\n• У нас нет специального API-доступа — мы обрабатываем публично доступные данные\n• Мы уважаем настройки приватности каждой платформы\n• Загрузка для личного использования приемлема, перераспределение — может нарушать законодательство",
      zh:"Snaptok 目前支持从短视频平台下载。所有受支持的平台在本隐私政策下享有同等待遇——不适用特定平台的例外情况。\n\n重要说明：\n• Snaptok 是一个独立工具，与任何视频平台或其母公司无关联、未获背书或连接\n• 我们没有特殊的 API 访问权限——我们处理公开可用的视频数据，方式与浏览器相同\n• 我们尊重每个平台的公开视频权限设置。私密或受限内容无法下载。\n• 下载内容用于个人使用通常是可接受的，但未经创作者许可重新分发或商业化可能违反版权法",
      ar:"يدعم Snaptok حالياً التنزيل من منصات الفيديو القصير. جميع المنصات المدعومة تُعامل بالتساوي.\n\nملاحظات مهمة:\n• Snaptok أداة مستقلة غير تابعة لأي منصة فيديو\n• ليس لدينا وصول API خاص\n• نحترم إعدادات الخصوصية لكل منصة\n• التنزيل للاستخدام الشخصي مقبول عموماً، أما التوزيع أو التجارة فقد يُشكّل انتهاكاً لحقوق النشر",
    },
  },
  {
    icon: Key, color: "indigo",
    title: { en:"Your Account & Data Rights", id:"Akun & Hak Data Kamu", ru:"Ваш аккаунт и права на данные", zh:"您的账号和数据权利", ar:"حسابك وحقوق بياناتك" },
    body: {
      en:"If you have a Snaptok account, you have full control over your data:\n\n• View your data: Your profile page shows all stored information about your account\n• Export your data: Download a full JSON export of your account data anytime from your profile\n• Delete your account: Permanently delete your account and all associated data from the Danger Zone in your profile. This is irreversible and immediate.\n• Update your information: Change your email or password at any time\n• Revoke sessions: Log out of any active session on any device from the Sessions section\n• Regenerate API key: Generate a new key at any time, instantly invalidating the old one\n\nData retention: If you delete your account, all personal data is permanently removed within 24 hours. Anonymized usage statistics (no personal identifiers) may be retained for service improvement purposes.",
      id:"Jika kamu memiliki akun Snaptok, kamu memiliki kendali penuh atas datamu:\n\n• Lihat datamu: Halaman profilmu menampilkan semua informasi yang tersimpan tentang akunmu\n• Ekspor datamu: Unduh ekspor JSON lengkap data akunmu kapan saja dari profilmu\n• Hapus akunmu: Hapus permanen akunmu dan semua data terkait dari Zona Berbahaya di profilmu. Ini tidak dapat dipulihkan dan langsung berlaku.\n• Perbarui informasimu: Ubah email atau password kapan saja\n• Cabut sesi: Logout dari sesi aktif apapun di perangkat manapun dari bagian Sesi\n• Regenerasi API key: Buat key baru kapan saja, langsung membatalkan yang lama\n\nRetensi data: Jika kamu menghapus akunmu, semua data pribadi dihapus permanen dalam 24 jam.",
      ru:"Если у вас есть аккаунт Snaptok, у вас полный контроль над данными:\n\n• Просмотр данных: страница профиля показывает всю сохранённую информацию\n• Экспорт: скачайте JSON-экспорт данных в любое время\n• Удаление: постоянное удаление аккаунта из раздела «Опасная зона» в профиле\n• Обновление информации: смените email или пароль в любое время\n• Отзыв сессий: выйдите из любой активной сессии\n• Регенерация ключа API: создайте новый ключ в любой момент\n\nХранение: после удаления аккаунта все данные удаляются в течение 24 часов.",
      zh:"如果您有 Snaptok 账号，您对数据拥有完全控制权：\n\n• 查看数据：您的个人资料页面显示所有存储的账号信息\n• 导出数据：随时从个人资料下载完整的 JSON 数据导出\n• 删除账号：从个人资料的危险区域永久删除账号和所有相关数据。这是不可逆的且立即生效。\n• 更新信息：随时更改邮箱或密码\n• 撤销会话：从会话部分注销任何设备上的活跃会话\n• 重新生成 API 密钥：随时生成新密钥，立即使旧密钥失效\n\n数据保留：删除账号后，所有个人数据在 24 小时内永久删除。",
      ar:"إذا كان لديك حساب Snaptok، فلديك تحكم كامل في بياناتك:\n\n• عرض البيانات: تعرض صفحة ملفك الشخصي جميع المعلومات المخزنة\n• تصدير البيانات: تنزيل تصدير JSON كامل في أي وقت\n• حذف الحساب: حذف دائم من منطقة الخطر في ملفك الشخصي\n• تحديث المعلومات: تغيير البريد الإلكتروني أو كلمة المرور في أي وقت\n• إلغاء الجلسات: تسجيل الخروج من أي جهاز\n• إعادة إنشاء مفتاح API: إنشاء مفتاح جديد في أي وقت\n\nالاحتفاظ بالبيانات: بعد حذف الحساب، تُحذف جميع البيانات الشخصية خلال 24 ساعة.",
    },
  },
  {
    icon: FileText, color: "purple",
    title: { en:"Copyright & Content Policy", id:"Hak Cipta & Kebijakan Konten", ru:"Авторские права и политика контента", zh:"版权和内容政策", ar:"حقوق النشر وسياسة المحتوى" },
    body: {
      en:"Snaptok is a download tool for personal use. Regarding copyright:\n\n• We do not host, store, or serve any video content on our servers — all media is delivered directly from the original platform's CDN\n• We do not claim any ownership over content you download\n• Downloaded content remains the intellectual property of its creator\n• We do not support or encourage copyright infringement\n• If you are a content creator and believe Snaptok is being used in violation of your rights, contact us at support@snaptok.app\n\nUsers are solely responsible for how they use downloaded content. We strongly encourage respecting creators' work and obtaining permission before reposting or using their content in any commercial context.",
      id:"Snaptok adalah alat unduhan untuk penggunaan pribadi. Mengenai hak cipta:\n\n• Kami tidak meng-host, menyimpan, atau menyajikan konten video apapun di server kami — semua media dikirimkan langsung dari CDN platform asli\n• Kami tidak mengklaim kepemilikan apapun atas konten yang kamu unduh\n• Konten yang diunduh tetap menjadi kekayaan intelektual kreatornya\n• Kami tidak mendukung atau mendorong pelanggaran hak cipta\n• Jika kamu adalah kreator konten dan percaya Snaptok digunakan melanggar hakmu, hubungi kami di support@snaptok.app",
      ru:"Snaptok — инструмент для личного использования. О правах:\n\n• Мы не храним и не раздаём видеоконтент — всё медиа доставляется напрямую с CDN оригинальной платформы\n• Мы не претендуем на права на скачанный контент\n• Авторские права остаются у создателей\n• Мы не поддерживаем нарушение авторских прав\n• Если вы создатель и считаете, что ваши права нарушены — напишите на support@snaptok.app",
      zh:"Snaptok 是个人使用的下载工具。关于版权：\n\n• 我们不在服务器上托管、存储或提供任何视频内容——所有媒体直接从原始平台的 CDN 交付\n• 我们不对您下载的内容主张任何所有权\n• 下载的内容仍然是其创作者的知识产权\n• 我们不支持或鼓励侵犯版权\n• 如果您是内容创作者，认为 Snaptok 被用于侵犯您的权利，请联系 support@snaptok.app",
      ar:"Snaptok أداة تنزيل للاستخدام الشخصي. بشأن حقوق النشر:\n\n• لا نستضيف أو نخزن أو نقدم أي محتوى فيديو على خوادمنا\n• لا ندّعي أي ملكية للمحتوى الذي تنزّله\n• يظل المحتوى المنزّل ملكاً فكرياً لصاحبه\n• لا ندعم انتهاك حقوق النشر\n• إذا كنت منشئ محتوى وتعتقد أن حقوقك تُنتهك، تواصل معنا على support@snaptok.app",
    },
  },
];

const colorMap: Record<string, { bg: string; border: string; iconBg: string; iconColor: string; dot: string }> = {
  blue:    { bg:"bg-blue-500/5",    border:"border-blue-500/20",    iconBg:"bg-blue-500/10",    iconColor:"text-blue-500",    dot:"bg-blue-500" },
  emerald: { bg:"bg-emerald-500/5", border:"border-emerald-500/20", iconBg:"bg-emerald-500/10", iconColor:"text-emerald-500", dot:"bg-emerald-500" },
  amber:   { bg:"bg-amber-500/5",   border:"border-amber-500/20",   iconBg:"bg-amber-500/10",   iconColor:"text-amber-500",   dot:"bg-amber-500" },
  rose:    { bg:"bg-rose-500/5",    border:"border-rose-500/20",    iconBg:"bg-rose-500/10",    iconColor:"text-rose-500",    dot:"bg-rose-500" },
  indigo:  { bg:"bg-indigo-500/5",  border:"border-indigo-500/20",  iconBg:"bg-indigo-500/10",  iconColor:"text-indigo-500",  dot:"bg-indigo-500" },
  purple:  { bg:"bg-purple-500/5",  border:"border-purple-500/20",  iconBg:"bg-purple-500/10",  iconColor:"text-purple-500",  dot:"bg-purple-500" },
};

function BodyText({ text }: { text: string }) {
  return (
    <div className="space-y-1.5">
      {text.split("\n").map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />;
        if (line.startsWith("•")) return (
          <div key={i} className="flex gap-2 items-start">
            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/50 flex-shrink-0" />
            <span className="text-sm text-muted-foreground leading-relaxed">{line.slice(1).trim()}</span>
          </div>
        );
        return <p key={i} className="text-sm text-muted-foreground leading-relaxed">{line}</p>;
      })}
    </div>
  );
}

export default function PrivacyPage() {
  const { lang } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
            <Shield className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">{heading[lang] ?? heading.en}</h1>
          <p className="text-xs text-muted-foreground mb-4">{updated[lang] ?? updated.en}</p>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">{intro[lang] ?? intro.en}</p>
        </div>

        <div className="space-y-4">
          {sections.map((sec, i) => {
            const Icon = sec.icon;
            const c = colorMap[sec.color];
            return (
              <div key={i} className={`rounded-2xl border ${c.border} ${c.bg} overflow-hidden`}>
                <div className="px-6 pt-5 pb-4 flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`h-4 w-4 ${c.iconColor}`} />
                  </div>
                  <h2 className="font-bold text-base">{sec.title[lang] ?? sec.title.en}</h2>
                </div>
                <div className="px-6 pb-6">
                  <BodyText text={sec.body[lang] ?? sec.body.en} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-muted/30 p-6 text-center">
          <p className="text-sm text-muted-foreground mb-1">
            {{ en:"Questions about this policy?", id:"Ada pertanyaan tentang kebijakan ini?", ru:"Вопросы по этой политике?", zh:"对本政策有疑问？", ar:"أسئلة حول هذه السياسة؟" }[lang]}
          </p>
          <a href="mailto:support@snaptok.app" className="text-sm font-medium text-primary hover:underline">
            support@snaptok.app
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
