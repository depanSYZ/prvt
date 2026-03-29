"use client";
import { useState, useMemo } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Search, X } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { LangCode } from "@/lib/i18n";

type FAQ = { q: Record<LangCode,string>; a: Record<LangCode,string>; category: string };

const faqData: FAQ[] = [
  // ── GENERAL ──────────────────────────────────────────────
  {
    category: "general",
    q: { en:"What is Snaptok?", id:"Apa itu Snaptok?", ru:"Что такое Snaptok?", zh:"什么是 Snaptok？", ar:"ما هو Snaptok؟" },
    a: { en:"Snaptok is a free online tool that lets you download short-form videos from supported platforms without watermarks. We support HD video, MP3 audio extraction, and slideshow image downloads — all at no cost and without requiring an account for basic use.", id:"Snaptok adalah alat online gratis yang memungkinkan kamu mengunduh video pendek dari platform yang didukung tanpa watermark. Kami mendukung video HD, ekstraksi audio MP3, dan unduhan gambar slideshow — semuanya gratis dan tanpa perlu akun untuk penggunaan dasar.", ru:"Snaptok — бесплатный онлайн-инструмент для скачивания коротких видео с поддерживаемых платформ без водяных знаков. Поддерживаем HD-видео, извлечение MP3 и загрузку изображений слайдшоу.", zh:"Snaptok 是一款免费的在线工具，让您可以从受支持的平台下载无水印的短视频。支持高清视频、MP3 音频提取和幻灯片图片下载。", ar:"Snaptok أداة مجانية عبر الإنترنت تتيح لك تنزيل مقاطع فيديو قصيرة من المنصات المدعومة بدون علامة مائية. ندعم فيديو HD واستخراج MP3 وتنزيل صور العروض التقديمية." },
  },
  {
    category: "general",
    q: { en:"Is Snaptok free to use?", id:"Apakah Snaptok gratis?", ru:"Snaptok бесплатный?", zh:"Snaptok 免费吗？", ar:"هل Snaptok مجاني؟" },
    a: { en:"Yes, 100% free for basic use. You can paste a link and download a video without creating an account. Optional registration gives you access to an API key, usage analytics, and higher rate limits — but downloading via the website remains completely free forever.", id:"Ya, 100% gratis untuk penggunaan dasar. Kamu bisa tempel link dan unduh video tanpa buat akun. Registrasi opsional memberi akses ke API key, analitik penggunaan, dan batas rate lebih tinggi — tapi mengunduh lewat website tetap sepenuhnya gratis selamanya.", ru:"Да, 100% бесплатно для базового использования. Вы можете вставить ссылку и скачать видео без регистрации. Регистрация даёт доступ к API, аналитике и более высоким лимитам.", zh:"是的，基本使用完全免费。您可以粘贴链接并下载视频，无需创建账号。注册后可获得 API 密钥、使用分析和更高的速率限制。", ar:"نعم، مجاني 100% للاستخدام الأساسي. يمكنك لصق الرابط وتنزيل الفيديو دون إنشاء حساب. التسجيل الاختياري يمنحك مفتاح API وتحليلات الاستخدام وحدود معدل أعلى." },
  },
  {
    category: "general",
    q: { en:"Which platforms does Snaptok support?", id:"Platform apa saja yang didukung Snaptok?", ru:"Какие платформы поддерживает Snaptok?", zh:"Snaptok 支持哪些平台？", ar:"ما المنصات التي يدعمها Snaptok؟" },
    a: { en:"Snaptok currently supports TikTok and Douyin (the Chinese version of TikTok). We are actively working on adding support for more platforms including Instagram Reels, YouTube Shorts, and others. Follow our announcements for updates.", id:"Snaptok saat ini mendukung TikTok dan Douyin (versi Cina dari TikTok). Kami sedang aktif mengerjakan penambahan dukungan untuk lebih banyak platform termasuk Instagram Reels, YouTube Shorts, dan lainnya. Ikuti pengumuman kami untuk pembaruan.", ru:"Snaptok поддерживает TikTok и Douyin. Мы работаем над добавлением Instagram Reels, YouTube Shorts и других платформ.", zh:"Snaptok 目前支持 TikTok 和抖音（TikTok 的中国版本）。我们正在积极添加对更多平台的支持，包括 Instagram Reels、YouTube Shorts 等。", ar:"يدعم Snaptok حالياً TikTok وDouyin (النسخة الصينية من TikTok). نعمل على إضافة دعم لمنصات أخرى مثل Instagram Reels وYouTube Shorts." },
  },
  {
    category: "general",
    q: { en:"Do I need to install anything?", id:"Apakah perlu menginstal sesuatu?", ru:"Нужно ли что-то устанавливать?", zh:"我需要安装任何东西吗？", ar:"هل أحتاج إلى تثبيت أي شيء؟" },
    a: { en:"No installation required at all. Snaptok is a web-based tool — just open it in any modern browser and start downloading. There is no app to install, no extension required, and no software to update. Everything runs directly in your browser.", id:"Tidak perlu instalasi sama sekali. Snaptok adalah alat berbasis web — cukup buka di browser modern apapun dan mulai mengunduh. Tidak ada aplikasi yang perlu diinstal, tidak perlu ekstensi, dan tidak ada perangkat lunak yang perlu diperbarui. Semuanya berjalan langsung di browser kamu.", ru:"Установка не требуется. Snaptok — веб-инструмент. Просто откройте в любом современном браузере. Никаких приложений, расширений или обновлений.", zh:"完全不需要安装任何东西。Snaptok 是一个基于网页的工具——只需在任何现代浏览器中打开它即可开始下载。无需安装应用、无需扩展程序，也无需更新任何软件。", ar:"لا حاجة لتثبيت أي شيء. Snaptok أداة ويب — فقط افتحها في أي متصفح حديث وابدأ التنزيل. لا تطبيقات ولا إضافات ولا برامج للتحديث." },
  },
  {
    category: "general",
    q: { en:"Is Snaptok available in multiple languages?", id:"Apakah Snaptok tersedia dalam berbagai bahasa?", ru:"Доступен ли Snaptok на нескольких языках?", zh:"Snaptok 支持多语言吗？", ar:"هل Snaptok متاح بعدة لغات؟" },
    a: { en:"Yes! Snaptok is available in English, Indonesian, Russian, Chinese (Simplified), and Arabic. You can switch languages using the language selector in the navigation bar. We plan to add more languages based on user demand.", id:"Ya! Snaptok tersedia dalam bahasa Inggris, Indonesia, Rusia, Cina (Disederhanakan), dan Arab. Kamu bisa ganti bahasa menggunakan pemilih bahasa di navigation bar. Kami berencana menambah lebih banyak bahasa berdasarkan permintaan pengguna.", ru:"Да! Snaptok доступен на английском, индонезийском, русском, китайском и арабском языках. Переключить язык можно в навигационной панели.", zh:"是的！Snaptok 提供英语、印尼语、俄语、简体中文和阿拉伯语版本。您可以使用导航栏中的语言选择器切换语言。", ar:"نعم! Snaptok متاح باللغات الإنجليزية والإندونيسية والروسية والصينية المبسطة والعربية. يمكنك التبديل بينها من خلال محدد اللغة في شريط التنقل." },
  },
  {
    category: "general",
    q: { en:"How is Snaptok different from other downloaders?", id:"Apa bedanya Snaptok dengan downloader lain?", ru:"Чем Snaptok отличается от других загрузчиков?", zh:"Snaptok 与其他下载工具有何不同？", ar:"كيف يختلف Snaptok عن أدوات التنزيل الأخرى؟" },
    a: { en:"Snaptok focuses on speed, simplicity, and privacy. We don't show intrusive ads, we don't redirect you through multiple pages, and we don't require sign-in for basic use. Our infrastructure is optimized for fast downloads with minimal friction. We also offer a developer API for those who want to build on top of our service — something most casual downloaders don't provide.", id:"Snaptok berfokus pada kecepatan, kesederhanaan, dan privasi. Kami tidak menampilkan iklan yang mengganggu, tidak mengarahkan kamu melalui beberapa halaman, dan tidak memerlukan login untuk penggunaan dasar. Infrastruktur kami dioptimalkan untuk unduhan cepat dengan hambatan minimal. Kami juga menawarkan API developer bagi yang ingin membangun di atas layanan kami.", ru:"Snaptok фокусируется на скорости, простоте и конфиденциальности. Нет навязчивой рекламы, нет редиректов, не нужна авторизация для базового использования. Мы также предлагаем API для разработчиков.", zh:"Snaptok 注重速度、简洁性和隐私保护。我们不显示侵入性广告，不通过多个页面重定向，基本使用无需登录。我们的基础设施针对快速下载进行了优化，并提供开发者 API。", ar:"يركز Snaptok على السرعة والبساطة والخصوصية. لا إعلانات مزعجة، ولا إعادة توجيه عبر صفحات متعددة، ولا تسجيل دخول للاستخدام الأساسي. كما نوفر API للمطورين." },
  },

  // ── DOWNLOADING ───────────────────────────────────────────
  {
    category: "downloading",
    q: { en:"How do I download a video?", id:"Bagaimana cara mengunduh video?", ru:"Как скачать видео?", zh:"如何下载视频？", ar:"كيف أحمّل الفيديو؟" },
    a: { en:"It's simple: (1) Open the app and find the video you want. (2) Tap Share, then Copy Link. (3) Come to Snaptok, paste the link in the input field. (4) Press Download Now. (5) Choose your preferred format — HD video, SD video, MP3 audio, or individual images. The file will download directly to your device.", id:"Mudah sekali: (1) Buka aplikasinya dan temukan video yang kamu mau. (2) Ketuk Share, lalu Salin Link. (3) Buka Snaptok, tempel link di kolom input. (4) Tekan Unduh Sekarang. (5) Pilih format — video HD, video SD, audio MP3, atau gambar individual. File langsung terunduh ke perangkatmu.", ru:"Всё просто: (1) Найдите видео. (2) Нажмите «Поделиться» → «Скопировать ссылку». (3) Вставьте ссылку на Snaptok. (4) Нажмите «Скачать». (5) Выберите формат.", zh:"很简单：(1) 找到视频。(2) 点击分享→复制链接。(3) 粘贴到 Snaptok。(4) 点击立即下载。(5) 选择格式。", ar:"(1) ابحث عن الفيديو. (2) اضغط مشاركة ثم نسخ الرابط. (3) الصق الرابط في Snaptok. (4) اضغط تنزيل الآن. (5) اختر الصيغة." },
  },
  {
    category: "downloading",
    q: { en:"What download formats are available?", id:"Format unduhan apa saja yang tersedia?", ru:"Какие форматы доступны?", zh:"支持哪些下载格式？", ar:"ما صيغ التنزيل المتاحة؟" },
    a: { en:"We offer: (1) HD Video without watermark — best quality. (2) SD Video without watermark — smaller file size. (3) Video with original watermark. (4) MP3 audio — great for music and podcasts. (5) Individual slideshow images as JPG files. Format availability depends on the original video type.", id:"Kami menawarkan: (1) Video HD tanpa watermark — kualitas terbaik. (2) Video SD tanpa watermark — ukuran file lebih kecil. (3) Video dengan watermark asli. (4) Audio MP3 — bagus untuk musik dan podcast. (5) Gambar slideshow individual sebagai file JPG. Ketersediaan format tergantung pada jenis video aslinya.", ru:"Форматы: HD без водяного знака, SD без знака, видео с оригинальным знаком, MP3-аудио, JPG-изображения слайдшоу.", zh:"支持：(1) 无水印高清视频。(2) 无水印标清视频。(3) 带水印视频。(4) MP3 音频。(5) 幻灯片 JPG 图片。", ar:"نوفر: HD بدون علامة مائية، SD بدون علامة، فيديو بالعلامة الأصلية، MP3، وصور JPG للعروض التقديمية." },
  },
  {
    category: "downloading",
    q: { en:"Why can't I download a video?", id:"Kenapa video tidak bisa diunduh?", ru:"Почему не скачивается?", zh:"为什么无法下载视频？", ar:"لماذا لا يمكنني تنزيل الفيديو؟" },
    a: { en:"Common reasons: (1) The video is private or has been deleted by the creator. (2) The link is incomplete — make sure you copy the full URL. (3) The video is geo-restricted in your region. (4) Our servers are experiencing temporary high load — wait a minute and try again. (5) Your browser's clipboard might not have granted permission. If none of these apply, try refreshing the page.", id:"Alasan umum: (1) Video privat atau sudah dihapus. (2) Link tidak lengkap. (3) Video dibatasi secara geografis. (4) Server sedang beban tinggi — coba lagi sebentar. (5) Browser tidak memberi izin clipboard. Coba refresh halaman.", ru:"Причины: (1) Видео приватное или удалено. (2) Ссылка неполная. (3) Геоблокировка. (4) Высокая нагрузка. (5) Нет разрешения на буфер обмена. Обновите страницу.", zh:"常见原因：(1) 视频私密或已删除。(2) 链接不完整。(3) 地理限制。(4) 服务器负载过高。(5) 剪贴板未授权。尝试刷新页面。", ar:"الأسباب الشائعة: (1) الفيديو خاص أو محذوف. (2) الرابط ناقص. (3) حظر جغرافي. (4) الخادم مشغول. (5) لا إذن للحافظة. جرّب تحديث الصفحة." },
  },
  {
    category: "downloading",
    q: { en:"Is there a download limit?", id:"Apakah ada batas unduhan?", ru:"Есть ли лимит загрузок?", zh:"有下载限制吗？", ar:"هل هناك حد للتنزيل؟" },
    a: { en:"There is no daily or monthly download limit for website users. You can download as many videos as you want. API users have rate limits depending on their plan — free plan users get a generous quota suitable for most personal and small-project use cases.", id:"Tidak ada batas unduhan harian atau bulanan untuk pengguna website. Kamu bisa mengunduh sebanyak yang kamu mau. Pengguna API memiliki batas rate tergantung paket — pengguna gratis mendapat kuota yang cukup untuk penggunaan pribadi dan proyek kecil.", ru:"Нет лимита для пользователей сайта. API-пользователи имеют лимиты в зависимости от плана.", zh:"网站用户没有下载限制。API 用户的速率限制取决于套餐。", ar:"لا يوجد حد للمستخدمين العاديين. مستخدمو API لديهم حدود معدل حسب خطتهم." },
  },
  {
    category: "downloading",
    q: { en:"Does it work on mobile devices?", id:"Apakah bisa digunakan di HP?", ru:"Работает на телефоне?", zh:"支持手机使用吗？", ar:"هل يعمل على الهاتف المحمول؟" },
    a: { en:"Absolutely. Snaptok is fully responsive and works on any device — Android phones, iPhones, iPads, tablets, laptops, and desktop computers. Just open your device's browser, no app installation needed. The interface adapts automatically to your screen size.", id:"Tentu saja. Snaptok sepenuhnya responsif dan bekerja di perangkat apapun — HP Android, iPhone, iPad, tablet, laptop, dan komputer desktop. Cukup buka browser perangkatmu, tidak perlu instal aplikasi.", ru:"Да. Snaptok работает на Android, iPhone, iPad, ноутбуке и ПК. Просто откройте браузер.", zh:"完全支持。适用于 Android、iPhone、iPad、平板、笔记本和台式电脑，无需安装应用。", ar:"نعم. يعمل على أي جهاز — Android وiPhone وiPad والحواسيب. لا حاجة لتثبيت تطبيق." },
  },
  {
    category: "downloading",
    q: { en:"Why is my download slow?", id:"Kenapa unduhan saya lambat?", ru:"Почему загрузка медленная?", zh:"为什么我的下载速度很慢？", ar:"لماذا تنزيلي بطيء؟" },
    a: { en:"Download speed depends on several factors: (1) Your internet connection speed. (2) The original video file size — HD videos are larger. (3) Current load on our servers. (4) The CDN speed of the source platform. If you experience consistently slow downloads, try switching to SD quality or try again at a less busy time.", id:"Kecepatan unduhan bergantung pada beberapa faktor: (1) Kecepatan koneksi internet kamu. (2) Ukuran file video asli — video HD lebih besar. (3) Beban server kami saat ini. (4) Kecepatan CDN platform sumber. Jika unduhan selalu lambat, coba beralih ke kualitas SD atau coba lagi di waktu yang kurang sibuk.", ru:"Скорость зависит от: (1) вашего интернета, (2) размера файла (HD больше), (3) загрузки серверов, (4) CDN источника. Попробуйте SD-качество или повторите позже.", zh:"下载速度取决于：(1) 您的网速。(2) 视频文件大小（高清更大）。(3) 我们服务器的当前负载。(4) 源平台 CDN 速度。可以尝试切换到标清质量。", ar:"تعتمد سرعة التنزيل على: (1) سرعة اتصالك بالإنترنت. (2) حجم ملف الفيديو. (3) حمل خوادمنا. (4) سرعة CDN للمنصة. جرّب جودة SD أو أعد المحاولة لاحقاً." },
  },
  {
    category: "downloading",
    q: { en:"Can I download a slideshow or photo post?", id:"Bisakah mengunduh slideshow atau postingan foto?", ru:"Можно ли скачать слайдшоу или фотопост?", zh:"我可以下载幻灯片或图片帖子吗？", ar:"هل يمكنني تنزيل عرض شرائح أو منشور صور؟" },
    a: { en:"Yes! For slideshow posts, Snaptok will detect that the content is image-based and offer you the option to download all individual images as separate JPG files. Each image in the slideshow can be downloaded individually or all at once depending on the post structure.", id:"Ya! Untuk postingan slideshow, Snaptok akan mendeteksi bahwa kontennya berbasis gambar dan menawarkan opsi untuk mengunduh semua gambar individual sebagai file JPG terpisah. Setiap gambar dapat diunduh secara individual atau sekaligus tergantung struktur postingannya.", ru:"Да! Snaptok определит слайдшоу и предложит скачать все изображения как отдельные JPG-файлы.", zh:"是的！对于幻灯片帖子，Snaptok 会检测到图片内容，并提供将所有单张图片作为独立 JPG 文件下载的选项。", ar:"نعم! سيكتشف Snaptok أن المحتوى عبارة عن صور ويتيح لك تنزيل كل صورة على حدة كملفات JPG." },
  },
  {
    category: "downloading",
    q: { en:"Can I download a video as MP3 audio only?", id:"Bisakah mengunduh video hanya sebagai audio MP3?", ru:"Можно ли скачать только аудио MP3?", zh:"我可以只下载 MP3 音频吗？", ar:"هل يمكنني تنزيل الفيديو كصوت MP3 فقط؟" },
    a: { en:"Yes. When you paste a video link and click Download Now, one of the available options is MP3 audio. Snaptok will extract the audio track from the video and deliver it as a downloadable MP3 file. This works great for saving music, spoken content, podcasts, or any audio you want to keep.", id:"Ya. Ketika kamu tempel link video dan klik Unduh Sekarang, salah satu opsi yang tersedia adalah audio MP3. Snaptok akan mengekstrak trek audio dari video dan menghadirkannya sebagai file MP3 yang dapat diunduh. Ini sangat cocok untuk menyimpan musik, konten lisan, atau audio apapun.", ru:"Да. При нажатии «Скачать» доступна опция MP3. Snaptok извлечёт аудиодорожку и предоставит её как MP3-файл.", zh:"是的。粘贴链接后点击立即下载，其中一个选项就是 MP3 音频。Snaptok 将提取视频的音轨并提供为可下载的 MP3 文件。", ar:"نعم. عند لصق الرابط والضغط على تنزيل، أحد الخيارات المتاحة هو MP3. سيستخرج Snaptok المسار الصوتي ويوفره كملف MP3 قابل للتنزيل." },
  },
  {
    category: "downloading",
    q: { en:"The video downloaded but has no sound, why?", id:"Video berhasil diunduh tapi tidak ada suara, kenapa?", ru:"Видео скачалось, но без звука — почему?", zh:"视频下载了但没有声音，为什么？", ar:"تم تنزيل الفيديو لكن بدون صوت، لماذا؟" },
    a: { en:"Some videos on source platforms are originally uploaded without audio or use background music that gets stripped during processing. Other causes include: the original video was a silent clip, or your device's media player is not decoding the audio codec correctly. Try opening the file with a different media player like VLC.", id:"Beberapa video di platform sumber awalnya diunggah tanpa audio atau menggunakan musik latar yang terhapus saat pemrosesan. Penyebab lain: video aslinya adalah klip diam, atau pemutar media perangkatmu tidak mendekode codec audio dengan benar. Coba buka file dengan pemutar media lain seperti VLC.", ru:"Некоторые видео изначально загружены без звука или фоновая музыка удаляется при обработке. Попробуйте другой плеер, например VLC.", zh:"某些视频在源平台上传时就没有音频，或者背景音乐在处理过程中被去除。也可能是您的媒体播放器无法正确解码音频编解码器。请尝试使用 VLC 等其他播放器。", ar:"بعض الفيديوهات تُرفع أصلاً بدون صوت، أو تُحذف الموسيقى الخلفية أثناء المعالجة. جرّب فتح الملف بمشغل وسائط آخر مثل VLC." },
  },
  {
    category: "downloading",
    q: { en:"Can I batch download multiple videos at once?", id:"Bisakah mengunduh banyak video sekaligus?", ru:"Можно ли скачать несколько видео одновременно?", zh:"我可以批量下载多个视频吗？", ar:"هل يمكنني تنزيل عدة فيديوهات دفعة واحدة؟" },
    a: { en:"The web interface currently supports one video at a time per download session. For batch downloading, you can use our API — it allows you to programmatically send multiple download requests. Batch download functionality directly in the web UI is something we are considering for a future update.", id:"Antarmuka web saat ini mendukung satu video per sesi unduhan. Untuk unduhan massal, kamu bisa menggunakan API kami — memungkinkan kamu mengirim beberapa permintaan unduhan secara terprogram. Fungsionalitas unduhan massal langsung di UI web sedang kami pertimbangkan untuk pembaruan mendatang.", ru:"Веб-интерфейс поддерживает одно видео за раз. Для пакетной загрузки используйте наш API. Функция пакетной загрузки в веб-интерфейсе рассматривается для будущих обновлений.", zh:"网页界面目前每次支持下载一个视频。批量下载可使用我们的 API，它允许您以编程方式发送多个下载请求。", ar:"تدعم الواجهة حالياً تنزيل فيديو واحد في كل مرة. للتنزيل الجماعي، استخدم API. نحن نفكر في إضافة هذه الميزة للواجهة مستقبلاً." },
  },

  // ── ACCOUNT & PRIVACY ─────────────────────────────────────
  {
    category: "account",
    q: { en:"Is it safe and private?", id:"Apakah aman dan privat?", ru:"Это безопасно?", zh:"安全吗？", ar:"هل هو آمن وخاص؟" },
    a: { en:"Yes. Snaptok does not collect or store the links you paste. We do not track your browsing activity, inject trackers, or sell your data. If you create an account, your email is used only for OTP verification and security alerts. No data is ever sold to third parties. All connections are served over HTTPS.", id:"Ya. Snaptok tidak mengumpulkan atau menyimpan link yang kamu tempel. Kami tidak melacak aktivitasmu atau menjual datamu. Email hanya digunakan untuk verifikasi OTP. Semua koneksi melalui HTTPS.", ru:"Да. Мы не собираем вставленные ссылки, не отслеживаем активность и не продаём данные. Email — только для OTP. Все соединения через HTTPS.", zh:"是的。Snaptok 不收集链接，不跟踪浏览活动，不出售数据。邮箱仅用于 OTP 验证。所有连接均通过 HTTPS。", ar:"نعم. لا نجمع الروابط، لا نتتبع نشاطك، ولا نبيع بياناتك. البريد الإلكتروني فقط للتحقق بـ OTP. جميع الاتصالات عبر HTTPS." },
  },
  {
    category: "account",
    q: { en:"Do I need to create an account?", id:"Apakah perlu membuat akun?", ru:"Нужна ли регистрация?", zh:"我需要创建账号吗？", ar:"هل أحتاج إلى إنشاء حساب؟" },
    a: { en:"No, an account is not required for basic video downloading. You can use Snaptok as a guest freely. An account is only needed if you want to access the API, view your download history, or get higher rate limits. Registration is free and only requires an email address.", id:"Tidak, akun tidak diperlukan untuk mengunduh video dasar. Kamu bisa menggunakan Snaptok sebagai tamu secara gratis. Akun hanya diperlukan jika kamu ingin mengakses API, melihat riwayat unduhan, atau mendapatkan batas rate lebih tinggi. Registrasi gratis dan hanya membutuhkan email.", ru:"Нет, для базового скачивания аккаунт не нужен. Аккаунт нужен только для API, истории загрузок или повышенных лимитов. Регистрация бесплатна.", zh:"不需要，基本下载不需要账号。只有在需要 API 访问、查看下载历史或获取更高速率限制时才需要注册。注册免费。", ar:"لا، لا يلزم حساب للتنزيل الأساسي. الحساب مطلوب فقط للوصول إلى API أو عرض السجل أو الحصول على حدود أعلى. التسجيل مجاني." },
  },
  {
    category: "account",
    q: { en:"How do I create an account?", id:"Bagaimana cara membuat akun?", ru:"Как создать аккаунт?", zh:"如何创建账号？", ar:"كيف أنشئ حساباً؟" },
    a: { en:"Click the Sign Up or Register button in the top navigation. Enter your email address and choose a password. We will send a one-time password (OTP) to your email — enter it to verify and activate your account. The whole process takes under a minute.", id:"Klik tombol Daftar atau Register di navigasi atas. Masukkan alamat email dan pilih password. Kami akan mengirim OTP ke emailmu — masukkan untuk verifikasi dan aktifkan akunmu. Prosesnya kurang dari satu menit.", ru:"Нажмите «Зарегистрироваться» вверху. Введите email и пароль. Мы пришлём OTP — введите его для верификации. Весь процесс занимает меньше минуты.", zh:"点击顶部导航中的注册按钮。输入电子邮件地址并设置密码。我们将向您的邮箱发送一次性密码（OTP）——输入它以验证并激活您的账号。整个过程不到一分钟。", ar:"انقر على زر التسجيل في التنقل العلوي. أدخل عنوان بريدك الإلكتروني واختر كلمة مرور. سنرسل OTP إلى بريدك — أدخله للتحقق وتفعيل حسابك." },
  },
  {
    category: "account",
    q: { en:"How do I reset my password?", id:"Bagaimana cara reset password?", ru:"Как сбросить пароль?", zh:"如何重置密码？", ar:"كيف أعيد تعيين كلمة المرور؟" },
    a: { en:"Click \"Forgot Password\" on the login page. Enter the email address associated with your account. We will send a reset link or OTP to your email. Follow the instructions in that email to set a new password. If you don't receive the email within a few minutes, check your spam folder.", id:"Klik 'Lupa Password' di halaman login. Masukkan alamat email yang terkait dengan akunmu. Kami akan mengirim link reset atau OTP ke emailmu. Ikuti instruksi dalam email tersebut untuk mengatur password baru. Jika tidak menerima email dalam beberapa menit, periksa folder spam.", ru:"Нажмите «Забыли пароль?» на странице входа. Введите email. Мы отправим ссылку для сброса. Проверьте папку спам, если письмо не пришло.", zh:"在登录页面点击「忘记密码」。输入您的账号邮箱。我们将发送重置链接或 OTP。如果几分钟内未收到邮件，请检查垃圾邮件文件夹。", ar:"انقر على \"نسيت كلمة المرور\" في صفحة تسجيل الدخول. أدخل بريدك الإلكتروني. سنرسل رابط إعادة التعيين. تحقق من مجلد الرسائل غير المرغوب فيها إذا لم تصلك الرسالة." },
  },
  {
    category: "account",
    q: { en:"How do I delete my account?", id:"Bagaimana cara menghapus akun?", ru:"Как удалить аккаунт?", zh:"如何删除我的账号？", ar:"كيف أحذف حسابي؟" },
    a: { en:"You can request account deletion by emailing support@snaptok.app with the subject \"Account Deletion Request\". Include the email address of the account you want to delete. We will process the deletion within 7 business days and send you a confirmation. Note that deletion is permanent and cannot be undone.", id:"Kamu bisa meminta penghapusan akun dengan mengirim email ke support@snaptok.app dengan subjek \"Permintaan Penghapusan Akun\". Sertakan alamat email akun yang ingin dihapus. Kami akan memproses penghapusan dalam 7 hari kerja. Perhatikan bahwa penghapusan bersifat permanen.", ru:"Отправьте запрос на support@snaptok.app с темой «Запрос на удаление аккаунта». Укажите email. Мы обработаем запрос в течение 7 рабочих дней. Удаление необратимо.", zh:"发送邮件至 support@snaptok.app，主题为「账号删除请求」，并包含要删除的账号邮箱。我们将在 7 个工作日内处理。注意删除是永久性的。", ar:"أرسل طلباً إلى support@snaptok.app بعنوان \"طلب حذف الحساب\". أضف البريد الإلكتروني للحساب. سنعالج الطلب خلال 7 أيام عمل. الحذف نهائي ولا يمكن التراجع عنه." },
  },
  {
    category: "account",
    q: { en:"Can I use Snaptok without giving my email?", id:"Bisakah pakai Snaptok tanpa kasih email?", ru:"Можно использовать без email?", zh:"可以不提供邮箱使用 Snaptok 吗？", ar:"هل يمكنني استخدام Snaptok دون تقديم بريدي الإلكتروني؟" },
    a: { en:"Yes, absolutely. Guest usage — pasting a link and downloading — requires no email, no sign-up, and no personal information of any kind. Your email is only needed if you choose to create an account for API access or saved history.", id:"Ya, tentu saja. Penggunaan tamu — tempel link dan unduh — tidak memerlukan email, pendaftaran, atau informasi pribadi apapun. Email hanya diperlukan jika kamu memilih membuat akun untuk akses API atau riwayat tersimpan.", ru:"Да. Гостевое использование не требует email или регистрации. Email нужен только при создании аккаунта для API или истории.", zh:"是的。访客使用——粘贴链接并下载——不需要电子邮件、注册或任何个人信息。邮箱仅在您选择创建账号时才需要。", ar:"نعم تماماً. الاستخدام كضيف — لصق الرابط والتنزيل — لا يتطلب بريداً إلكترونياً أو تسجيلاً أو أي معلومات شخصية." },
  },

  // ── API ───────────────────────────────────────────────────
  {
    category: "api",
    q: { en:"What is the API and how do I use it?", id:"Apa itu API dan cara menggunakannya?", ru:"Что такое API?", zh:"什么是 API，如何使用？", ar:"ما هو API وكيف أستخدمه؟" },
    a: { en:"Our API lets developers integrate Snaptok's video download capabilities into their own apps, bots, or services. Register a free account, grab your API key from your profile, and add it as a query parameter to our endpoints. Full documentation with examples, error codes, and rate limit details is available at /docs.", id:"API kami memungkinkan developer mengintegrasikan kemampuan unduhan video Snaptok ke aplikasi, bot, atau layanan mereka. Daftar akun gratis, ambil API key dari profilmu, dan tambahkan sebagai parameter query ke endpoint kami. Dokumentasi lengkap tersedia di /docs.", ru:"API позволяет разработчикам интегрировать Snaptok в свои приложения. Зарегистрируйтесь, получите ключ и добавьте его в query-параметры. Документация на /docs.", zh:"我们的 API 让开发者将 Snaptok 集成到应用中。注册获取 API 密钥，作为查询参数使用。完整文档在 /docs。", ar:"يتيح API للمطورين دمج Snaptok في تطبيقاتهم. سجّل للحصول على مفتاح API وأضفه كمعامل استعلام. الوثائق على /docs." },
  },
  {
    category: "api",
    q: { en:"Is the API free to use?", id:"Apakah API gratis digunakan?", ru:"Бесплатен ли API?", zh:"API 是免费的吗？", ar:"هل API مجاني؟" },
    a: { en:"Yes, the API is free to use on the free plan with generous rate limits suitable for personal projects and small-scale apps. For higher throughput or commercial use cases, we offer paid plans with increased limits and priority support. See the /docs or /pricing page for details.", id:"Ya, API gratis untuk digunakan pada paket gratis dengan batas rate yang cukup untuk proyek pribadi dan aplikasi skala kecil. Untuk throughput lebih tinggi atau penggunaan komersial, kami menawarkan paket berbayar. Lihat halaman /docs atau /pricing untuk detailnya.", ru:"Да, бесплатный план API подходит для личных проектов. Для повышенного трафика — платные планы. Подробности на /docs.", zh:"是的，免费计划的 API 适合个人项目。对于更高吞吐量或商业用途，我们提供付费计划。详情见 /docs 或 /pricing。", ar:"نعم، API مجاني بحدود كافية للمشاريع الشخصية. للاستخدام التجاري، نوفر خططاً مدفوعة. تفاصيل على /docs." },
  },
  {
    category: "api",
    q: { en:"How do I get my API key?", id:"Bagaimana cara mendapatkan API key?", ru:"Как получить API-ключ?", zh:"如何获取 API 密钥？", ar:"كيف أحصل على مفتاح API؟" },
    a: { en:"After registering and verifying your account, go to your Profile page. You will find your API key displayed there. You can copy it directly or regenerate it if you believe it has been compromised. Keep your API key secret — treat it like a password. Do not share it publicly or commit it to public code repositories.", id:"Setelah mendaftar dan memverifikasi akunmu, pergi ke halaman Profil. Kamu akan menemukan API key-mu ditampilkan di sana. Kamu bisa menyalinnya langsung atau mengenerasinya kembali jika kamu yakin itu sudah dikompromikan. Rahasiakan API key-mu — perlakukan seperti password.", ru:"После регистрации перейдите в Профиль. Там будет ваш API-ключ. Можно скопировать или перегенерировать при компрометации. Храните ключ в тайне.", zh:"注册并验证账号后，进入个人资料页面，您会在那里找到 API 密钥。可以直接复制或重新生成。请像保护密码一样保密您的 API 密钥。", ar:"بعد التسجيل والتحقق، انتقل إلى صفحة الملف الشخصي. ستجد مفتاح API هناك. يمكنك نسخه أو إعادة إنشائه. احتفظ بمفتاحك سراً." },
  },
  {
    category: "api",
    q: { en:"What are the API rate limits?", id:"Apa batas rate API?", ru:"Каковы лимиты API?", zh:"API 的速率限制是什么？", ar:"ما هي حدود معدل API؟" },
    a: { en:"Rate limits vary by plan. The free plan includes a daily request quota suitable for testing and personal projects. Paid plans offer significantly higher limits per minute and per day, along with priority processing. Exact numbers are listed on the /docs page and may be updated as our infrastructure grows.", id:"Batas rate bervariasi tergantung paket. Paket gratis mencakup kuota permintaan harian yang sesuai untuk pengujian dan proyek pribadi. Paket berbayar menawarkan batas lebih tinggi per menit dan per hari. Angka pasti tercantum di halaman /docs.", ru:"Лимиты зависят от плана. Бесплатный подходит для тестирования. Платные планы — выше лимиты. Точные значения на /docs.", zh:"速率限制因套餐而异。免费计划包括适合测试和个人项目的每日请求配额。付费计划每分钟和每天的限制更高。确切数字请查看 /docs。", ar:"تختلف الحدود حسب الخطة. الخطة المجانية مناسبة للاختبار والمشاريع الشخصية. الخطط المدفوعة تقدم حدوداً أعلى. الأرقام الدقيقة على /docs." },
  },
  {
    category: "api",
    q: { en:"What happens if I exceed my API rate limit?", id:"Apa yang terjadi jika melebihi batas rate API?", ru:"Что происходит при превышении лимита API?", zh:"超出 API 速率限制会怎样？", ar:"ماذا يحدث إذا تجاوزت حد معدل API؟" },
    a: { en:"If you exceed your rate limit, the API will return a 429 Too Many Requests error. Your requests will resume once the rate limit window resets (typically every minute or every day depending on the type of limit). You can upgrade your plan to get higher limits, or implement exponential backoff in your integration to handle throttling gracefully.", id:"Jika kamu melebihi batas rate, API akan mengembalikan error 429 Too Many Requests. Permintaanmu akan dilanjutkan setelah jendela batas rate direset (biasanya setiap menit atau setiap hari). Kamu bisa upgrade paket atau menerapkan exponential backoff dalam integrasimu.", ru:"При превышении лимита API вернёт ошибку 429. Запросы возобновятся после сброса окна лимита. Можно обновить план или реализовать exponential backoff.", zh:"超出速率限制时，API 将返回 429 Too Many Requests 错误。速率限制窗口重置后请求将恢复。您可以升级套餐或在集成中实现指数退避。", ar:"إذا تجاوزت الحد، سيعيد API خطأ 429. ستستأنف الطلبات بعد إعادة تعيين النافذة. يمكنك ترقية خطتك أو تطبيق Exponential Backoff." },
  },
  {
    category: "api",
    q: { en:"Can I use the API to build a commercial product?", id:"Bisakah pakai API untuk produk komersial?", ru:"Можно ли использовать API для коммерческого продукта?", zh:"我可以使用 API 构建商业产品吗？", ar:"هل يمكنني استخدام API لبناء منتج تجاري؟" },
    a: { en:"You may use the API to build products and services, but you cannot build a product that directly re-packages or resells Snaptok's API as its core offering. Integration into your own unique product or service is permitted under the paid plan. Please review the API Terms in our Terms of Service for full details.", id:"Kamu boleh menggunakan API untuk membangun produk dan layanan, tetapi kamu tidak bisa membangun produk yang secara langsung mengemas ulang atau menjual kembali API Snaptok sebagai penawaran utamanya. Integrasi ke dalam produk atau layanan unikmu sendiri diizinkan dengan paket berbayar.", ru:"Вы можете использовать API для продуктов, но нельзя перепродавать наш API как основу сервиса. Интеграция в уникальный продукт разрешена на платном плане.", zh:"您可以使用 API 构建产品，但不能将 Snaptok API 直接重新包装或转售作为核心服务。将其集成到您自己的独特产品中在付费计划下是允许的。", ar:"يمكنك استخدام API لبناء منتجات، لكن لا يمكنك إعادة تغليف API وبيعه كخدمة أساسية. الدمج في منتجك الفريد مسموح به بالخطة المدفوعة." },
  },

  // ── LEGAL & SAFETY ────────────────────────────────────────
  {
    category: "legal",
    q: { en:"Can I use downloaded videos commercially?", id:"Bisakah video diunduh digunakan secara komersial?", ru:"Можно ли коммерчески использовать?", zh:"可以商业使用吗？", ar:"هل يمكن الاستخدام التجاري؟" },
    a: { en:"No. Downloaded videos are subject to their original creator's copyright. You may only use them for personal, non-commercial purposes. Reposting, reselling, or using videos without the creator's explicit permission may violate copyright law and the platform's terms of service. Snaptok is a tool — responsibility for how content is used lies with the user.", id:"Tidak. Video yang diunduh tunduk pada hak cipta kreator aslinya. Kamu hanya boleh menggunakannya untuk tujuan pribadi dan non-komersial. Memposting ulang atau menjual tanpa izin eksplisit kreator bisa melanggar hukum hak cipta.", ru:"Нет. Скачанные видео защищены авторскими правами создателей. Разрешено только личное использование. Перепостинг без разрешения может нарушать законодательство.", zh:"不可以。下载的视频受版权保护，仅限个人非商业使用。未经创作者许可转发或转售可能违反版权法。", ar:"لا. الفيديوهات خاضعة لحقوق النشر الخاصة بأصحابها. يُسمح فقط بالاستخدام الشخصي غير التجاري." },
  },
  {
    category: "legal",
    q: { en:"Is it legal to use Snaptok?", id:"Apakah penggunaan Snaptok legal?", ru:"Законно ли использовать Snaptok?", zh:"使用 Snaptok 合法吗？", ar:"هل استخدام Snaptok قانوني؟" },
    a: { en:"Snaptok is a tool, and its legality depends on how you use it. Downloading content for personal offline viewing is widely considered fair use in many jurisdictions. However, downloading and redistributing copyrighted content commercially or without permission is illegal. Users are responsible for ensuring their use complies with local laws and the original platform's terms of service.", id:"Snaptok adalah alat, dan legalitasnya bergantung pada cara kamu menggunakannya. Mengunduh konten untuk ditonton offline secara pribadi umumnya dianggap penggunaan wajar di banyak yurisdiksi. Namun, mengunduh dan mendistribusikan konten berhak cipta secara komersial adalah ilegal.", ru:"Snaptok — это инструмент. Его законность зависит от использования. Личное скачивание для офлайн-просмотра считается добросовестным использованием во многих юрисдикциях. Коммерческое перераспределение без разрешения — незаконно.", zh:"Snaptok 是工具，其合法性取决于您的使用方式。在许多司法管辖区，为个人离线观看下载内容被视为合理使用。但商业性地下载和重新分发受版权保护的内容是非法的。", ar:"Snaptok أداة، وقانونيتها تعتمد على كيفية استخدامها. تنزيل المحتوى للمشاهدة الشخصية يُعدّ استخداماً عادلاً في معظم الدول. لكن إعادة توزيع المحتوى المحمي تجارياً أمر غير قانوني." },
  },
  {
    category: "legal",
    q: { en:"Does Snaptok store the videos I download?", id:"Apakah Snaptok menyimpan video yang saya unduh?", ru:"Хранит ли Snaptok скачанные видео?", zh:"Snaptok 会存储我下载的视频吗？", ar:"هل يخزن Snaptok الفيديوهات التي أنزّلها؟" },
    a: { en:"No. Snaptok acts as a processing proxy — it fetches and converts the video on demand and streams it directly to your browser for download. We do not store, cache, or host any video content on our servers beyond the brief moment needed to process and deliver it to you.", id:"Tidak. Snaptok bertindak sebagai proxy pemrosesan — mengambil dan mengonversi video sesuai permintaan dan mengalirkannya langsung ke browsermu untuk diunduh. Kami tidak menyimpan, meng-cache, atau meng-host konten video di server kami.", ru:"Нет. Snaptok работает как прокси — получает и конвертирует видео по запросу и стримит его браузеру. Мы не храним видеоконтент на серверах.", zh:"不。Snaptok 作为处理代理——按需获取和转换视频，直接流式传输到您的浏览器下载。我们不在服务器上存储、缓存或托管任何视频内容。", ar:"لا. يعمل Snaptok كوكيل معالجة — يجلب الفيديو ويحوّله عند الطلب ثم يبثه مباشرة لمتصفحك. لا نخزن أي محتوى فيديو على خوادمنا." },
  },
  {
    category: "legal",
    q: { en:"What happens if a creator reports my download?", id:"Apa yang terjadi jika kreator melaporkan unduhan saya?", ru:"Что если создатель пожалуется?", zh:"如果创作者举报我的下载会怎样？", ar:"ماذا يحدث إذا أبلغ منشئ عن تنزيلي؟" },
    a: { en:"Since Snaptok does not store content, a creator cannot directly report a specific download through us. If a creator reports a copyright concern, we respond to DMCA takedown requests promptly. Any legal responsibility for how you use downloaded content remains with you as the downloader. We strongly advise always respecting creator rights.", id:"Karena Snaptok tidak menyimpan konten, kreator tidak bisa langsung melaporkan unduhan spesifik melalui kami. Jika kreator melaporkan masalah hak cipta, kami merespons permintaan takedown DMCA dengan cepat. Tanggung jawab hukum atas penggunaan konten tetap ada pada kamu sebagai pengunduh.", ru:"Snaptok не хранит контент, поэтому создатель не может напрямую пожаловаться через нас. На DMCA-запросы мы реагируем оперативно. Юридическая ответственность за использование контента остаётся на пользователе.", zh:"由于 Snaptok 不存储内容，创作者无法直接通过我们举报特定下载。如果收到 DMCA 下架请求，我们会及时处理。您作为下载者对内容的使用负有法律责任。", ar:"بما أن Snaptok لا يخزن المحتوى، لا يمكن للمنشئ الإبلاغ عن تنزيل محدد عبرنا. نستجيب لطلبات DMCA بسرعة. المسؤولية القانونية لاستخدام المحتوى تقع عليك." },
  },

  // ── TROUBLESHOOTING ───────────────────────────────────────
  {
    category: "troubleshoot",
    q: { en:"How do I contact support?", id:"Bagaimana cara menghubungi dukungan?", ru:"Как связаться с поддержкой?", zh:"如何联系支持？", ar:"كيف أتواصل مع الدعم؟" },
    a: { en:"You can reach us by email at support@snaptok.app. We typically respond within 24–48 hours. For bug reports, please include the URL you tried to download and your browser/device info. API-related questions are best directed to the /docs page first, as most common questions are answered there.", id:"Hubungi kami melalui email di support@snaptok.app. Biasanya merespons dalam 24–48 jam. Untuk laporan bug, sertakan URL dan info browser/perangkatmu. Pertanyaan API sebaiknya ke halaman /docs dulu.", ru:"Напишите на support@snaptok.app. Отвечаем в течение 24–48 часов. При сообщении об ошибках укажите URL и инфо о браузере.", zh:"发邮件至 support@snaptok.app，通常 24-48 小时内回复。报告错误时请提供 URL 和浏览器/设备信息。", ar:"تواصل عبر support@snaptok.app. نرد خلال 24-48 ساعة. عند الإبلاغ عن أخطاء، أضف الرابط ومعلومات المتصفح." },
  },
  {
    category: "troubleshoot",
    q: { en:"The paste button doesn't work, what do I do?", id:"Tombol tempel tidak berfungsi, apa yang harus dilakukan?", ru:"Кнопка вставки не работает, что делать?", zh:"粘贴按钮不起作用怎么办？", ar:"زر اللصق لا يعمل، ماذا أفعل؟" },
    a: { en:"This is usually a browser clipboard permission issue. Try: (1) Clicking inside the input field first, then pressing Ctrl+V (or Cmd+V on Mac) to paste manually. (2) Right-clicking the input field and selecting Paste. (3) If your browser asks for clipboard access, click Allow. (4) On mobile, long-press the input field and select Paste from the menu.", id:"Ini biasanya masalah izin clipboard browser. Coba: (1) Klik dulu di dalam kolom input, lalu tekan Ctrl+V (atau Cmd+V di Mac) untuk tempel manual. (2) Klik kanan kolom input dan pilih Tempel. (3) Jika browser meminta akses clipboard, klik Izinkan. (4) Di HP, tekan lama kolom input dan pilih Tempel.", ru:"Обычно это проблема разрешения буфера обмена. Попробуйте: (1) Кликните поле и нажмите Ctrl+V. (2) ПКМ → Вставить. (3) Разрешите доступ к буферу, если браузер спросит. (4) На мобильном: удержите поле → Вставить.", zh:"这通常是浏览器剪贴板权限问题。尝试：(1) 点击输入框后按 Ctrl+V 或 Mac 上的 Cmd+V。(2) 右键输入框选择粘贴。(3) 如果浏览器请求剪贴板访问权限，点击允许。(4) 手机上长按输入框选择粘贴。", ar:"هذه عادةً مشكلة إذن الحافظة. جرّب: (1) انقر داخل حقل الإدخال ثم اضغط Ctrl+V. (2) انقر بزر الماوس الأيمن واختر لصق. (3) اسمح بالوصول إذا طلب المتصفح. (4) على الجوال، اضغط مطولاً واختر لصق." },
  },
  {
    category: "troubleshoot",
    q: { en:"Why does the download start but then fail midway?", id:"Kenapa unduhan mulai tapi gagal di tengah jalan?", ru:"Почему загрузка прерывается на середине?", zh:"为什么下载开始后中途失败？", ar:"لماذا يبدأ التنزيل ثم يفشل في المنتصف؟" },
    a: { en:"Mid-download failures can happen because: (1) Your internet connection was interrupted. (2) The source platform's CDN timed out during the transfer. (3) Your device ran out of storage space. (4) The browser cancelled the download due to security restrictions. Try downloading again with a stable connection, or try a different browser if the issue persists.", id:"Kegagalan di tengah unduhan bisa terjadi karena: (1) Koneksi internet terputus. (2) CDN platform sumber timeout selama transfer. (3) Perangkatmu kehabisan ruang penyimpanan. (4) Browser membatalkan unduhan karena pembatasan keamanan. Coba unduh lagi dengan koneksi stabil, atau coba browser lain.", ru:"Причины прерывания: (1) Обрыв интернета. (2) Таймаут CDN источника. (3) Закончилось место на устройстве. (4) Браузер отменил из-за ограничений. Попробуйте стабильное подключение или другой браузер.", zh:"下载中途失败的原因：(1) 网络连接中断。(2) 源平台 CDN 超时。(3) 设备存储空间不足。(4) 浏览器因安全限制取消下载。请尝试用稳定连接重新下载，或换用其他浏览器。", ar:"أسباب الفشل في المنتصف: (1) انقطاع الاتصال. (2) انتهت مهلة CDN للمصدر. (3) نفدت مساحة التخزين. (4) المتصفح أوقف التنزيل. جرّب اتصالاً مستقراً أو متصفحاً مختلفاً." },
  },
  {
    category: "troubleshoot",
    q: { en:"Why is the video quality lower than expected?", id:"Kenapa kualitas video lebih rendah dari yang diharapkan?", ru:"Почему качество ниже ожидаемого?", zh:"为什么视频质量低于预期？", ar:"لماذا جودة الفيديو أقل من المتوقع؟" },
    a: { en:"The quality of downloaded videos depends on the quality the creator originally uploaded. If the creator uploaded in 720p, we can only provide up to 720p regardless of the HD option. Some platforms also compress videos during upload. Make sure you are selecting the HD option — if HD is grayed out, the original source does not have a higher-quality version available.", id:"Kualitas video yang diunduh bergantung pada kualitas yang awalnya diunggah kreator. Jika kreator mengunggah dalam 720p, kami hanya bisa menyediakan hingga 720p terlepas dari pilihan HD. Beberapa platform juga mengompresi video saat upload. Pastikan kamu memilih opsi HD.", ru:"Качество зависит от исходного файла создателя. Если загружено в 720p — выше не получить. Некоторые платформы сжимают видео. Убедитесь, что выбрали HD-опцию.", zh:"下载质量取决于创作者原始上传的质量。如果以 720p 上传，无论选择 HD 选项，我们最多只能提供 720p。确保您选择了 HD 选项——如果 HD 选项灰显，说明原始来源没有更高质量版本。", ar:"تعتمد جودة التنزيل على ما رفعه المنشئ أصلاً. إذا رفع بجودة 720p، لا يمكننا توفير أعلى من ذلك. تأكد من اختيار خيار HD." },
  },
  {
    category: "troubleshoot",
    q: { en:"Snaptok says the link is invalid but it looks correct, why?", id:"Snaptok bilang link tidak valid padahal terlihat benar, kenapa?", ru:"Snaptok говорит, что ссылка неверна, хотя она верная?", zh:"Snaptok 说链接无效但看起来是正确的，为什么？", ar:"Snaptok يقول الرابط غير صالح لكنه يبدو صحيحاً، لماذا؟" },
    a: { en:"A few things to check: (1) Make sure you're using the Share → Copy Link option from the app, not copying the URL from a browser address bar, which may differ. (2) Some short URLs or redirect links may not be recognized — try to get the direct post URL. (3) If the video was recently posted, it may take a moment to be fully indexed on the platform's servers. (4) Douyin links may require a slightly different URL format from TikTok links.", id:"Beberapa hal yang perlu diperiksa: (1) Pastikan kamu menggunakan opsi Bagikan → Salin Link dari aplikasinya, bukan menyalin URL dari address bar browser yang mungkin berbeda. (2) Beberapa URL pendek atau link redirect mungkin tidak dikenali. (3) Video yang baru diposting mungkin perlu beberapa saat. (4) Link Douyin mungkin memerlukan format URL yang sedikit berbeda.", ru:"Проверьте: (1) Используйте «Поделиться» → «Скопировать ссылку» в приложении, а не URL из браузера. (2) Короткие URL могут не распознаваться. (3) Новые видео могут не сразу индексироваться. (4) Ссылки Douyin отличаются от TikTok.", zh:"检查以下几点：(1) 确保使用应用内「分享→复制链接」，而不是浏览器地址栏的 URL。(2) 短链接或重定向链接可能不被识别。(3) 新发布的视频可能需要片刻才能被完全索引。(4) 抖音链接格式可能与 TikTok 略有不同。", ar:"تحقق من: (1) استخدم خيار مشاركة→نسخ الرابط من التطبيق وليس من شريط عنوان المتصفح. (2) الروابط القصيرة قد لا تُتعرف عليها. (3) الفيديوهات الجديدة قد تحتاج لحظة. (4) روابط Douyin تختلف قليلاً عن TikTok." },
  },
];

const categories = [
  { key: "all",         en:"All",             id:"Semua",         ru:"Все",              zh:"全部",       ar:"الكل" },
  { key: "general",     en:"General",         id:"Umum",          ru:"Общие",            zh:"常规",       ar:"عام" },
  { key: "downloading", en:"Downloading",     id:"Mengunduh",     ru:"Загрузка",         zh:"下载",       ar:"التنزيل" },
  { key: "account",     en:"Account",         id:"Akun",          ru:"Аккаунт",          zh:"账号",       ar:"الحساب" },
  { key: "api",         en:"API",             id:"API",           ru:"API",              zh:"API",        ar:"API" },
  { key: "legal",       en:"Legal",           id:"Hukum",         ru:"Правовые",         zh:"法律",       ar:"قانوني" },
  { key: "troubleshoot",en:"Troubleshooting", id:"Masalah",       ru:"Устранение ошибок",zh:"故障排除",   ar:"استكشاف الأخطاء" },
] as const;

type CatKey = typeof categories[number]["key"];

const heading: Record<LangCode,string> = {
  en:"Frequently Asked Questions", id:"Pertanyaan yang Sering Diajukan",
  ru:"Часто задаваемые вопросы", zh:"常见问题", ar:"الأسئلة الشائعة",
};
const sub: Record<LangCode,string> = {
  en:"Everything you need to know about Snaptok.",
  id:"Semua yang perlu kamu tahu tentang Snaptok.",
  ru:"Всё, что нужно знать о Snaptok.",
  zh:"关于 Snaptok 的所有您需要了解的内容。",
  ar:"كل ما تحتاج معرفته عن Snaptok.",
};
const searchPlaceholder: Record<LangCode,string> = {
  en:"Search questions...", id:"Cari pertanyaan...",
  ru:"Поиск вопросов...", zh:"搜索问题...", ar:"البحث في الأسئلة...",
};
const noResults: Record<LangCode,string> = {
  en:"No questions found matching your search.", id:"Tidak ada pertanyaan yang cocok.",
  ru:"Вопросы не найдены.", zh:"没有找到匹配的问题。", ar:"لا توجد أسئلة تطابق بحثك.",
};

export default function FAQPage() {
  const { lang } = useLang();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<CatKey>("all");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return faqData.filter((item) => {
      const matchCat = activeCategory === "all" || item.category === activeCategory;
      if (!matchCat) return false;
      if (!q) return true;
      const question = (item.q[lang] ?? item.q.en).toLowerCase();
      const answer   = (item.a[lang] ?? item.a.en).toLowerCase();
      return question.includes(q) || answer.includes(q);
    });
  }, [query, activeCategory, lang]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
            <HelpCircle className="h-7 w-7 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-3">{heading[lang] ?? heading.en}</h1>
          <p className="text-muted-foreground text-lg">{sub[lang] ?? sub.en}</p>
        </div>

        {/* Search */}
        <div className="relative mb-5">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder[lang] ?? searchPlaceholder.en}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key as CatKey)}
              className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition border ${
                activeCategory === cat.key
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {cat[lang as keyof typeof cat] ?? cat.en}
            </button>
          ))}
        </div>

        {/* Results count */}
        {(query || activeCategory !== "all") && (
          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} {lang === "id" ? "pertanyaan ditemukan" : lang === "ru" ? "вопросов найдено" : lang === "zh" ? "个问题" : lang === "ar" ? "سؤال" : "questions found"}
          </p>
        )}

        {/* Accordion */}
        {filtered.length > 0 ? (
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((item, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="rounded-xl border border-border bg-card px-5 shadow-sm">
                <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline">
                  {item.q[lang] ?? item.q.en}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {item.a[lang] ?? item.a.en}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <HelpCircle className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>{noResults[lang] ?? noResults.en}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
