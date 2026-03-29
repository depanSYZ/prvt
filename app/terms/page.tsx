"use client";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Scale, CheckCircle, AlertTriangle, Info, XCircle, FileText, Users, RefreshCw, Shield, Globe, Copyright } from "lucide-react";
import { useLang } from "@/lib/lang-context";
import { LangCode } from "@/lib/i18n";

type L = Record<LangCode,string>;

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

type Section = { icon: React.ElementType; color: string; title: L; body: L };

const colorMap: Record<string,{bg:string;border:string;iconBg:string;iconColor:string}> = {
  green:  {bg:"bg-green-500/5",  border:"border-green-500/20",  iconBg:"bg-green-500/10",  iconColor:"text-green-500"},
  blue:   {bg:"bg-blue-500/5",   border:"border-blue-500/20",   iconBg:"bg-blue-500/10",   iconColor:"text-blue-500"},
  amber:  {bg:"bg-amber-500/5",  border:"border-amber-500/20",  iconBg:"bg-amber-500/10",  iconColor:"text-amber-500"},
  red:    {bg:"bg-red-500/5",    border:"border-red-500/20",    iconBg:"bg-red-500/10",    iconColor:"text-red-500"},
  purple: {bg:"bg-purple-500/5", border:"border-purple-500/20", iconBg:"bg-purple-500/10", iconColor:"text-purple-500"},
  slate:  {bg:"bg-muted/30",     border:"border-border",        iconBg:"bg-muted",         iconColor:"text-muted-foreground"},
  teal:   {bg:"bg-teal-500/5",   border:"border-teal-500/20",   iconBg:"bg-teal-500/10",   iconColor:"text-teal-500"},
  indigo: {bg:"bg-indigo-500/5", border:"border-indigo-500/20", iconBg:"bg-indigo-500/10", iconColor:"text-indigo-500"},
  rose:   {bg:"bg-rose-500/5",   border:"border-rose-500/20",   iconBg:"bg-rose-500/10",   iconColor:"text-rose-500"},
};

const sections: Section[] = [
  {
    icon: CheckCircle, color: "green",
    title: { en:"Acceptance of Terms", id:"Penerimaan Ketentuan", ru:"Принятие условий", zh:"条款接受", ar:"قبول الشروط" },
    body: {
      en:"By accessing or using Snaptok in any capacity — whether as a guest, registered user, or API consumer — you agree to be bound by these Terms of Service and our Privacy Policy.\n\n• You must be at least 13 years old to use this service\n• If you are under 18, you confirm you have parental or guardian consent\n• These terms apply to all visitors, users, and parties who access the service in any form\n• If you do not agree with any part of these terms, you must immediately stop using the service\n• Your continued use of Snaptok after any modification to these terms constitutes acceptance of the updated terms",
      id:"Dengan mengakses atau menggunakan Snaptok dalam kapasitas apapun — baik sebagai tamu, pengguna terdaftar, atau konsumen API — kamu setuju untuk terikat oleh Syarat & Ketentuan dan Kebijakan Privasi kami.\n\n• Kamu harus berusia minimal 13 tahun untuk menggunakan layanan ini\n• Jika kamu berusia di bawah 18 tahun, kamu mengonfirmasi memiliki persetujuan orang tua atau wali\n• Ketentuan ini berlaku untuk semua pengunjung, pengguna, dan pihak yang mengakses layanan dalam bentuk apapun\n• Jika kamu tidak setuju dengan bagian manapun dari ketentuan ini, kamu harus segera berhenti menggunakan layanan\n• Penggunaan Snaptok yang berkelanjutan setelah perubahan apapun pada ketentuan ini merupakan penerimaan ketentuan yang diperbarui",
      ru:"Используя Snaptok в любом качестве, вы соглашаетесь с настоящими Условиями и Политикой конфиденциальности.\n\n• Вам должно быть не менее 13 лет\n• Если вам нет 18, необходимо согласие родителей или опекуна\n• Условия распространяются на всех пользователей\n• Несогласие с условиями требует прекращения использования сервиса\n• Продолжение использования после изменений означает принятие обновлённых условий",
      zh:"通过以任何方式访问或使用 Snaptok——无论是作为访客、注册用户还是 API 消费者——您同意受这些服务条款和隐私政策的约束。\n\n• 您必须年满 13 岁才能使用此服务\n• 如果您未满 18 岁，您确认已获得父母或监护人的同意\n• 这些条款适用于所有访问服务的访客、用户和各方\n• 如果您不同意这些条款的任何部分，您必须立即停止使用该服务\n• 条款变更后继续使用 Snaptok 即表示接受更新后的条款",
      ar:"باستخدامك Snaptok بأي صفة — كزائر أو مستخدم مسجل أو مستهلك API — فإنك توافق على الالتزام بهذه الشروط وسياسة الخصوصية.\n\n• يجب أن يكون عمرك 13 عاماً على الأقل\n• إذا كان عمرك أقل من 18 عاماً، فأنت تؤكد حصولك على إذن الوالدين أو الوصي\n• تنطبق هذه الشروط على جميع الزوار والمستخدمين\n• إذا لم توافق على أي جزء، يجب عليك التوقف فوراً عن استخدام الخدمة",
    },
  },
  {
    icon: Info, color: "blue",
    title: { en:"Permitted Use", id:"Penggunaan yang Diizinkan", ru:"Разрешённое использование", zh:"允许的使用", ar:"الاستخدام المسموح به" },
    body: {
      en:"Snaptok is provided for lawful, personal, non-commercial use. You may:\n• Download videos for personal offline viewing\n• Extract audio from videos for personal listening\n• Use our API to build personal or small-scale projects within rate limits\n• Share downloaded content with attribution and the creator's permission\n\nYou must NOT:\n• Redistribute, resell, or commercially exploit downloaded content without explicit creator permission\n• Use Snaptok to download content that infringes third-party intellectual property rights\n• Circumvent or attempt to circumvent our rate limiting systems\n• Use automated scrapers or bots at scale without API access\n• Attempt to reverse engineer, modify, or create derivative works of Snaptok itself\n• Use the service for any illegal purpose under applicable law",
      id:"Snaptok disediakan untuk penggunaan yang sah, pribadi, dan non-komersial. Kamu boleh:\n• Mengunduh video untuk ditonton offline secara pribadi\n• Mengekstrak audio dari video untuk didengarkan secara pribadi\n• Menggunakan API kami untuk membangun proyek pribadi atau skala kecil dalam batas rate\n• Berbagi konten yang diunduh dengan atribusi dan izin kreator\n\nKamu TIDAK BOLEH:\n• Mendistribusikan ulang, menjual kembali, atau mengeksploitasi konten yang diunduh secara komersial tanpa izin eksplisit kreator\n• Menggunakan Snaptok untuk mengunduh konten yang melanggar hak kekayaan intelektual pihak ketiga\n• Mengelak atau mencoba mengelak sistem pembatasan rate kami\n• Menggunakan scraper atau bot otomatis dalam skala besar tanpa akses API\n• Mencoba merekayasa balik, memodifikasi, atau membuat karya turunan dari Snaptok itu sendiri\n• Menggunakan layanan untuk tujuan ilegal apapun",
      ru:"Snaptok предназначен для законного личного некоммерческого использования. Вы можете:\n• Скачивать видео для личного просмотра\n• Извлекать аудио для личного прослушивания\n• Использовать API для личных проектов в рамках лимитов\n• Делиться контентом с указанием авторства и разрешением создателя\n\nНельзя:\n• Перераспределять, перепродавать или коммерчески использовать контент без разрешения\n• Использовать Snaptok для нарушения прав ИС\n• Обходить системы ограничения запросов\n• Использовать автоматические скрейперы без API\n• Реверс-инжинирить Snaptok\n• Использовать сервис в незаконных целях",
      zh:"Snaptok 用于合法、个人、非商业用途。您可以：\n• 为个人离线观看下载视频\n• 从视频中提取音频供个人收听\n• 在速率限制内使用我们的 API 构建个人或小规模项目\n• 在获得创作者许可和署名的情况下分享下载的内容\n\n您不得：\n• 未经创作者明确许可重新分发、转售或商业利用下载的内容\n• 使用 Snaptok 下载侵犯第三方知识产权的内容\n• 规避或尝试规避我们的速率限制系统\n• 在没有 API 访问权限的情况下大规模使用自动爬虫或机器人\n• 尝试对 Snaptok 进行逆向工程\n• 将服务用于任何非法目的",
      ar:"Snaptok مخصص للاستخدام القانوني الشخصي غير التجاري. يمكنك:\n• تنزيل الفيديوهات للمشاهدة الشخصية دون اتصال\n• استخراج الصوت للاستماع الشخصي\n• استخدام API لمشاريع شخصية أو صغيرة النطاق\n• مشاركة المحتوى مع الإسناد وإذن المنشئ\n\nلا يجوز لك:\n• إعادة توزيع المحتوى أو بيعه أو استغلاله تجارياً\n• استخدام Snaptok لتنزيل محتوى ينتهك حقوق الملكية الفكرية\n• التحايل على أنظمة تحديد المعدل\n• استخدام برامج الزحف التلقائية دون وصول API\n• محاولة إجراء هندسة عكسية لـ Snaptok",
    },
  },
  {
    icon: AlertTriangle, color: "amber",
    title: { en:"Disclaimer of Warranties", id:"Penafian Garansi", ru:"Отказ от гарантий", zh:"免责声明", ar:"إخلاء مسؤولية الضمانات" },
    body: {
      en:"Snaptok is provided \"as is\" and \"as available\" without warranties of any kind, either express or implied:\n\n• We do not guarantee that the service will be uninterrupted, error-free, or always available\n• Video availability depends on third-party platforms — we cannot guarantee access to any specific content at any given time\n• We are not responsible for changes made by supported platforms that may affect functionality\n• Download speeds and quality depend on factors outside our control, including your internet connection and the source platform's CDN\n• We do not warrant that the service is free from viruses or other harmful components — though we take all reasonable precautions\n• Features and availability may change at any time without notice",
      id:"Snaptok disediakan \"apa adanya\" dan \"sesuai ketersediaan\" tanpa jaminan apapun:\n\n• Kami tidak menjamin layanan akan tidak terputus, bebas error, atau selalu tersedia\n• Ketersediaan video bergantung pada platform pihak ketiga — kami tidak dapat menjamin akses ke konten tertentu kapan saja\n• Kami tidak bertanggung jawab atas perubahan yang dilakukan platform yang didukung yang dapat mempengaruhi fungsionalitas\n• Kecepatan unduhan dan kualitas bergantung pada faktor di luar kendali kami\n• Kami tidak menjamin layanan bebas dari virus atau komponen berbahaya — meskipun kami mengambil semua tindakan pencegahan yang wajar\n• Fitur dan ketersediaan dapat berubah kapan saja tanpa pemberitahuan",
      ru:"Snaptok предоставляется «как есть» без каких-либо гарантий:\n\n• Мы не гарантируем бесперебойную или безошибочную работу\n• Доступность видео зависит от сторонних платформ\n• Мы не несём ответственности за изменения поддерживаемых платформ\n• Скорость и качество загрузки зависят от внешних факторов\n• Функции могут меняться без уведомления",
      zh:"Snaptok 按\"现状\"和\"现有\"提供，不提供任何形式的明示或暗示保证：\n\n• 我们不保证服务不中断、无错误或始终可用\n• 视频可用性取决于第三方平台\n• 我们对支持平台所做的影响功能的更改不负责任\n• 下载速度和质量取决于我们控制之外的因素\n• 我们不保证服务免于病毒\n• 功能和可用性可能随时更改，恕不另行通知",
      ar:"يُقدَّم Snaptok \"كما هو\" و\"كما هو متاح\" دون أي ضمانات:\n\n• لا نضمن أن الخدمة ستكون دون انقطاع أو أخطاء\n• توفر الفيديو يعتمد على منصات طرف ثالث\n• لسنا مسؤولين عن التغييرات التي تُجريها المنصات المدعومة\n• سرعة التنزيل والجودة تعتمد على عوامل خارج سيطرتنا\n• قد تتغير الميزات والتوفر في أي وقت دون إشعار",
    },
  },
  {
    icon: XCircle, color: "red",
    title: { en:"Limitation of Liability", id:"Batasan Tanggung Jawab", ru:"Ограничение ответственности", zh:"责任限制", ar:"تحديد المسؤولية" },
    body: {
      en:"To the fullest extent permitted by law, Snaptok and its operators shall not be liable for:\n\n• Any indirect, incidental, special, or consequential damages arising from your use of the service\n• Loss of data, revenue, profits, or business opportunities\n• Any damages arising from your use or misuse of downloaded content\n• Content made available through third-party platforms\n• Service interruptions, data breaches, or technical failures beyond our reasonable control\n• Any actions taken by third-party platforms against users of downloading tools\n\nIn jurisdictions that do not allow the exclusion or limitation of liability, our liability is limited to the maximum extent permitted by law.",
      id:"Sejauh yang diizinkan oleh hukum, Snaptok dan operatornya tidak bertanggung jawab atas:\n\n• Kerusakan tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan layanan\n• Kehilangan data, pendapatan, keuntungan, atau peluang bisnis\n• Kerusakan yang timbul dari penggunaan atau penyalahgunaan konten yang diunduh\n• Konten yang tersedia melalui platform pihak ketiga\n• Gangguan layanan, pelanggaran data, atau kegagalan teknis di luar kendali kami\n• Tindakan apapun yang diambil oleh platform pihak ketiga terhadap pengguna alat unduhan",
      ru:"В максимальной степени, допустимой законом, Snaptok не несёт ответственности за:\n\n• Косвенный, случайный, особый или последующий ущерб\n• Потерю данных, доходов или бизнес-возможностей\n• Ущерб от использования или злоупотребления скачанным контентом\n• Контент на сторонних платформах\n• Перебои в работе или технические сбои\n• Действия сторонних платформ против пользователей",
      zh:"在法律允许的最大范围内，Snaptok 及其运营者不对以下情况承担责任：\n\n• 因使用服务而产生的任何间接、偶发、特殊或后果性损害\n• 数据、收入、利润或商业机会的损失\n• 因使用或滥用下载内容而产生的任何损害\n• 通过第三方平台提供的内容\n• 超出我们合理控制的服务中断、数据泄露或技术故障\n• 第三方平台对下载工具用户采取的任何行动",
      ar:"إلى أقصى حد يسمح به القانون، لن يكون Snaptok ومشغلوه مسؤولين عن:\n\n• أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية\n• فقدان البيانات أو الإيرادات أو الأرباح أو الفرص التجارية\n• أي أضرار ناجمة عن استخدام المحتوى المنزّل أو إساءة استخدامه\n• المحتوى المتاح عبر منصات طرف ثالث\n• انقطاع الخدمة أو خروقات البيانات أو الأعطال التقنية\n• أي إجراءات تتخذها منصات طرف ثالث ضد مستخدمي أدوات التنزيل",
    },
  },
  {
    icon: Users, color: "purple",
    title: { en:"API Usage Terms", id:"Ketentuan Penggunaan API", ru:"Условия использования API", zh:"API 使用条款", ar:"شروط استخدام API" },
    body: {
      en:"If you use our API with an account:\n\n• Your API key is personal and non-transferable — do not share or publish it publicly\n• You are responsible for all usage under your API key, including any misuse by third parties if you share the key\n• Rate limits apply per account — circumventing them through multiple accounts is prohibited\n• We reserve the right to revoke API access for any account that violates these terms\n• The API is provided for integration purposes — using it to build a competing service that re-packages our API is not permitted\n• We may change API endpoints, response formats, or rate limits with reasonable notice via email or the /docs page\n• Free plan API usage is subject to fair-use policies; excessive usage may result in temporary throttling",
      id:"Jika kamu menggunakan API kami dengan akun:\n\n• API key-mu bersifat pribadi dan tidak dapat dipindahtangankan — jangan membagikan atau mempublikasikannya\n• Kamu bertanggung jawab atas semua penggunaan di bawah API key-mu, termasuk penyalahgunaan oleh pihak ketiga jika kamu berbagi key\n• Batas rate berlaku per akun — mengelaknya melalui beberapa akun dilarang\n• Kami berhak mencabut akses API untuk akun yang melanggar ketentuan ini\n• API disediakan untuk tujuan integrasi — menggunakannya untuk membangun layanan pesaing tidak diizinkan\n• Kami dapat mengubah endpoint API, format respons, atau batas rate dengan pemberitahuan yang wajar\n• Penggunaan API paket gratis tunduk pada kebijakan penggunaan wajar",
      ru:"При использовании API с аккаунтом:\n\n• Ключ API личный и непередаваемый — не делитесь им\n• Вы несёте ответственность за всё использование под вашим ключом\n• Обход лимитов через множество аккаунтов запрещён\n• Мы можем отозвать доступ за нарушение условий\n• Использование API для создания конкурирующего сервиса не разрешено\n• Мы можем изменять endpoint'ы и форматы с уведомлением",
      zh:"如果您使用我们的 API 和账号：\n\n• 您的 API 密钥是个人的且不可转让——不要公开分享或发布它\n• 您对 API 密钥下的所有使用负责\n• 速率限制按账号计算——通过多个账号规避被禁止\n• 我们保留因违反条款而撤销 API 访问权限的权利\n• API 用于集成目的——不允许用它构建重新包装我们 API 的竞争服务\n• 我们可能在合理通知下更改 API 端点或速率限制",
      ar:"إذا كنت تستخدم API مع حساب:\n\n• مفتاح API شخصي وغير قابل للنقل — لا تشاركه علناً\n• أنت مسؤول عن جميع الاستخدامات تحت مفتاحك\n• التحايل على الحدود عبر حسابات متعددة محظور\n• نحتفظ بحق إلغاء الوصول لأي حساب ينتهك الشروط\n• لا يُسمح باستخدام API لبناء خدمة منافسة\n• قد نغير نقاط النهاية أو حدود المعدل مع إشعار معقول",
    },
  },
  {
    icon: Copyright, color: "rose",
    title: { en:"Intellectual Property", id:"Kekayaan Intelektual", ru:"Интеллектуальная собственность", zh:"知识产权", ar:"الملكية الفكرية" },
    body: {
      en:"Snaptok respects intellectual property rights and expects users to do the same.\n\nOwnership of Snaptok:\n• All code, design, branding, documentation, and infrastructure of Snaptok are owned by or licensed to Snaptok's operators\n• You may not copy, reproduce, distribute, or create derivative works from Snaptok's interface, code, or branding without express written permission\n• The Snaptok name, logo, and associated marks are trademarks of their respective owners and may not be used without permission\n\nThird-party content:\n• All videos, audio, images, and other media accessible through Snaptok are owned by their respective creators and platforms\n• Downloading content does not transfer ownership or any rights to that content\n• You are solely responsible for ensuring your use of downloaded content complies with the original creator's license, applicable copyright law, and platform terms\n• Snaptok does not host, store, or claim ownership over any third-party content\n\nDMCA & Copyright Removal:\n• If you believe content accessible through our service infringes your copyright, you may submit a removal request to support@snaptok.app\n• Please include: your contact information, a description of the copyrighted work, the URL in question, and a statement of good faith\n• We will review and respond to valid requests within 48 hours",
      id:"Snaptok menghormati hak kekayaan intelektual dan mengharapkan pengguna melakukan hal yang sama.\n\nKepemilikan Snaptok:\n• Semua kode, desain, merek, dokumentasi, dan infrastruktur Snaptok dimiliki oleh atau dilisensikan kepada operator Snaptok\n• Kamu tidak boleh menyalin, mereproduksi, mendistribusikan, atau membuat karya turunan dari antarmuka, kode, atau merek Snaptok tanpa izin tertulis\n• Nama Snaptok, logo, dan merek terkait adalah merek dagang pemiliknya dan tidak boleh digunakan tanpa izin\n\nKonten pihak ketiga:\n• Semua video, audio, gambar, dan media lain yang dapat diakses melalui Snaptok dimiliki oleh kreator dan platform masing-masing\n• Mengunduh konten tidak memindahkan kepemilikan atau hak apapun atas konten tersebut\n• Kamu sepenuhnya bertanggung jawab untuk memastikan penggunaan konten yang diunduh mematuhi lisensi kreator, hukum hak cipta, dan ketentuan platform\n• Snaptok tidak meng-host, menyimpan, atau mengklaim kepemilikan atas konten pihak ketiga apapun\n\nDMCA & Penghapusan Hak Cipta:\n• Jika kamu yakin konten yang dapat diakses melalui layanan kami melanggar hak ciptamu, kamu dapat mengirimkan permintaan penghapusan ke support@snaptok.app\n• Sertakan: informasi kontak, deskripsi karya berhak cipta, URL yang bersangkutan, dan pernyataan itikad baik\n• Kami akan meninjau dan merespons permintaan yang valid dalam 48 jam",
      ru:"Snaptok уважает права интеллектуальной собственности.\n\nПрава на Snaptok:\n• Весь код, дизайн, бренд и инфраструктура Snaptok принадлежат операторам сервиса\n• Копирование, распространение или создание производных работ без разрешения запрещено\n• Название и логотип Snaptok являются торговыми марками и не могут использоваться без разрешения\n\nКонтент третьих сторон:\n• Все видео и медиа принадлежат их создателям и платформам\n• Скачивание не передаёт права на контент\n• Вы несёте ответственность за соблюдение авторского права при использовании скачанного контента\n• Snaptok не хранит и не претендует на сторонний контент\n\nDMCA и запросы на удаление:\n• Отправьте запрос на support@snaptok.app с описанием нарушения\n• Мы рассмотрим запрос в течение 48 часов",
      zh:"Snaptok 尊重知识产权，并期望用户也这样做。\n\nSnaptok 所有权：\n• Snaptok 的所有代码、设计、品牌、文档和基础设施均归 Snaptok 运营商所有或获得许可\n• 未经明确书面许可，您不得复制、分发或创建 Snaptok 界面、代码或品牌的衍生作品\n• Snaptok 名称、徽标和相关标志是商标，未经许可不得使用\n\n第三方内容：\n• 通过 Snaptok 可访问的所有视频、音频、图像和其他媒体均归其各自创作者和平台所有\n• 下载内容不转让该内容的所有权或任何权利\n• 您全权负责确保您对下载内容的使用符合原创作者许可、适用版权法和平台条款\n• Snaptok 不托管、存储或声称拥有任何第三方内容\n\nDMCA 和版权删除：\n• 如果您认为通过我们服务访问的内容侵犯了您的版权，可向 support@snaptok.app 提交删除请求\n• 请包括：联系信息、受版权保护作品的描述、相关 URL 和善意声明\n• 我们将在 48 小时内审核并回应有效请求",
      ar:"يحترم Snaptok حقوق الملكية الفكرية ويتوقع من المستخدمين فعل الشيء ذاته.\n\nملكية Snaptok:\n• جميع الأكواد والتصميمات والعلامات التجارية والوثائق والبنية التحتية لـ Snaptok مملوكة لمشغليه أو مرخصة لهم\n• لا يجوز لك نسخ أو توزيع أو إنشاء أعمال مشتقة من واجهة Snaptok أو كوده أو علامته التجارية دون إذن كتابي صريح\n• اسم Snaptok وشعاره والعلامات المرتبطة به علامات تجارية لا يجوز استخدامها دون إذن\n\nمحتوى الطرف الثالث:\n• جميع مقاطع الفيديو والصوت والصور وغيرها من الوسائط المتاحة عبر Snaptok مملوكة لمنشئيها ومنصاتهم\n• تنزيل المحتوى لا ينقل ملكيته أو أي حقوق عليه\n• أنت وحدك المسؤول عن ضمان امتثال استخدامك للمحتوى المنزّل لترخيص المنشئ وقانون حقوق النشر\n\nطلبات DMCA والإزالة:\n• أرسل طلب الإزالة إلى support@snaptok.app مع وصف الانتهاك\n• سنراجع الطلبات الصحيحة خلال 48 ساعة",
    },
  },
  {
    icon: Shield, color: "teal",
    title: { en:"Privacy & Data", id:"Privasi & Data", ru:"Конфиденциальность и данные", zh:"隐私与数据", ar:"الخصوصية والبيانات" },
    body: {
      en:"Your privacy matters to us. This section summarizes how we handle your data — our full Privacy Policy is available separately.\n\nData we collect:\n• Account information: email address, username, and hashed password if you register\n• Usage data: pages visited, features used, download history (anonymized for free users)\n• API usage logs: request counts, endpoints called, and timestamps associated with your API key\n• Technical data: IP address, browser type, device type, and referrer for security and abuse prevention\n\nHow we use your data:\n• To provide and improve the Snaptok service\n• To enforce rate limits and detect abuse\n• To send service-related communications (not marketing, unless opted in)\n• To comply with legal obligations\n\nData retention:\n• Account data is retained until you delete your account\n• Anonymized usage statistics may be retained indefinitely for analytics\n• API logs are retained for up to 90 days for debugging and abuse detection\n\nYour rights:\n• You may request access to, correction of, or deletion of your personal data at any time\n• To exercise these rights, contact support@snaptok.app\n• We do not sell your personal data to third parties under any circumstances",
      id:"Privasi kamu penting bagi kami. Bagian ini merangkum cara kami menangani datamu — Kebijakan Privasi lengkap kami tersedia secara terpisah.\n\nData yang kami kumpulkan:\n• Informasi akun: alamat email, nama pengguna, dan password yang di-hash jika kamu mendaftar\n• Data penggunaan: halaman yang dikunjungi, fitur yang digunakan, riwayat unduhan (dianonimkan untuk pengguna gratis)\n• Log penggunaan API: jumlah permintaan, endpoint yang dipanggil, dan timestamp yang terkait dengan API key-mu\n• Data teknis: alamat IP, jenis browser, jenis perangkat, dan referrer untuk keamanan\n\nBagaimana kami menggunakan datamu:\n• Untuk menyediakan dan meningkatkan layanan Snaptok\n• Untuk menegakkan batas rate dan mendeteksi penyalahgunaan\n• Untuk mengirim komunikasi terkait layanan (bukan pemasaran, kecuali kamu memilih)\n• Untuk mematuhi kewajiban hukum\n\nRetensi data:\n• Data akun disimpan sampai kamu menghapus akunmu\n• Statistik penggunaan yang dianonimkan dapat disimpan tanpa batas waktu untuk analitik\n• Log API disimpan hingga 90 hari untuk debugging dan deteksi penyalahgunaan\n\nHak-hakmu:\n• Kamu dapat meminta akses, koreksi, atau penghapusan data pribadi kapan saja\n• Untuk menggunakan hak ini, hubungi support@snaptok.app\n• Kami tidak menjual data pribadimu kepada pihak ketiga dalam keadaan apapun",
      ru:"Ваша конфиденциальность важна для нас.\n\nСобираемые данные:\n• Данные аккаунта: email, имя пользователя, хешированный пароль\n• Данные об использовании: посещённые страницы, история загрузок (анонимизированная)\n• Логи API: количество запросов, вызванные endpoint'ы, метки времени\n• Технические данные: IP-адрес, браузер, устройство для безопасности\n\nКак мы используем данные:\n• Для предоставления и улучшения сервиса\n• Для соблюдения лимитов и выявления злоупотреблений\n• Для служебных уведомлений\n• Для соблюдения правовых обязательств\n\nХранение данных:\n• Данные аккаунта — до его удаления\n• Анонимная статистика — бессрочно\n• Логи API — до 90 дней\n\nВаши права:\n• Вы можете запросить доступ, исправление или удаление данных\n• Обратитесь на support@snaptok.app\n• Мы не продаём ваши данные третьим сторонам",
      zh:"您的隐私对我们很重要。本节概述我们如何处理您的数据。\n\n我们收集的数据：\n• 账号信息：电子邮件地址、用户名以及注册时的哈希密码\n• 使用数据：访问的页面、使用的功能、下载历史（免费用户匿名化）\n• API 使用日志：请求计数、调用的端点以及与 API 密钥关联的时间戳\n• 技术数据：IP 地址、浏览器类型、设备类型和引荐来源，用于安全目的\n\n我们如何使用您的数据：\n• 提供和改进 Snaptok 服务\n• 执行速率限制并检测滥用\n• 发送与服务相关的通信（非营销，除非选择加入）\n• 遵守法律义务\n\n数据保留：\n• 账号数据保留至您删除账号\n• 匿名使用统计数据可能无限期保留用于分析\n• API 日志保留最多 90 天\n\n您的权利：\n• 您可以随时请求访问、更正或删除您的个人数据\n• 请联系 support@snaptok.app\n• 我们在任何情况下都不会将您的个人数据出售给第三方",
      ar:"خصوصيتك مهمة لنا. يلخص هذا القسم كيفية تعاملنا مع بياناتك.\n\nالبيانات التي نجمعها:\n• معلومات الحساب: عنوان البريد الإلكتروني واسم المستخدم وكلمة المرور المشفرة\n• بيانات الاستخدام: الصفحات المزارة والميزات المستخدمة وسجل التنزيل\n• سجلات API: عدد الطلبات ونقاط النهاية المستدعاة والطوابع الزمنية\n• البيانات التقنية: عنوان IP ونوع المتصفح والجهاز لأغراض الأمان\n\nكيف نستخدم بياناتك:\n• لتقديم خدمة Snaptok وتحسينها\n• لتطبيق حدود المعدل واكتشاف الإساءة\n• لإرسال اتصالات متعلقة بالخدمة\n• للامتثال للالتزامات القانونية\n\nالاحتفاظ بالبيانات:\n• بيانات الحساب تُحتفظ بها حتى حذف حسابك\n• إحصائيات الاستخدام المجهولة قد تُحتفظ بها إلى أجل غير مسمى\n• سجلات API تُحتفظ بها لمدة 90 يوماً\n\nحقوقك:\n• يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو حذفها في أي وقت\n• تواصل مع support@snaptok.app\n• نحن لا نبيع بياناتك الشخصية لأطراف ثالثة",
    },
  },
  {
    icon: Globe, color: "indigo",
    title: { en:"Governing Law & Jurisdiction", id:"Hukum yang Berlaku & Yurisdiksi", ru:"Применимое право и юрисдикция", zh:"适用法律与管辖权", ar:"القانون الحاكم والاختصاص القضائي" },
    body: {
      en:"These Terms of Service and any disputes arising from them shall be governed by and construed in accordance with applicable law.\n\nGeneral provisions:\n• These terms constitute the entire agreement between you and Snaptok regarding your use of the service\n• If any provision of these terms is found to be unenforceable, the remaining provisions will continue in full force and effect\n• Our failure to enforce any right or provision does not constitute a waiver of that right\n• These terms supersede any prior agreements, representations, or understandings between you and Snaptok\n\nDispute resolution:\n• We encourage you to contact us first at support@snaptok.app before pursuing formal legal action\n• We will make a good-faith effort to resolve disputes within 30 business days\n• For unresolved disputes, you agree to submit to binding arbitration or the jurisdiction of competent courts\n• Class action lawsuits and class-wide arbitration are waived to the extent permitted by law\n\nInternational users:\n• Snaptok is operated globally and may be accessed from jurisdictions with different laws\n• By using the service, you agree to comply with all local laws and regulations applicable to your use\n• We make no representation that the service is appropriate or legally available in all jurisdictions\n• Users who access the service from territories where its content or use is prohibited do so at their own risk",
      id:"Syarat & Ketentuan ini dan sengketa apapun yang timbul darinya diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku.\n\nKetentuan umum:\n• Ketentuan ini merupakan keseluruhan perjanjian antara kamu dan Snaptok mengenai penggunaan layanan\n• Jika ketentuan apapun ditemukan tidak dapat dilaksanakan, ketentuan yang tersisa tetap berlaku penuh\n• Kegagalan kami untuk menegakkan hak atau ketentuan apapun tidak merupakan pengabaian hak tersebut\n• Ketentuan ini menggantikan perjanjian sebelumnya antara kamu dan Snaptok\n\nPenyelesaian sengketa:\n• Kami mendorong kamu untuk menghubungi kami terlebih dahulu di support@snaptok.app sebelum mengambil tindakan hukum formal\n• Kami akan berusaha dengan itikad baik untuk menyelesaikan sengketa dalam 30 hari kerja\n• Untuk sengketa yang tidak terselesaikan, kamu setuju untuk tunduk pada arbitrase mengikat atau yurisdiksi pengadilan yang berwenang\n• Gugatan class action dan arbitrase class-wide dikesampingkan sejauh yang diizinkan oleh hukum\n\nPengguna internasional:\n• Snaptok dioperasikan secara global dan dapat diakses dari yurisdiksi dengan hukum yang berbeda\n• Dengan menggunakan layanan, kamu setuju untuk mematuhi semua hukum dan peraturan lokal yang berlaku\n• Pengguna yang mengakses layanan dari wilayah di mana penggunaannya dilarang melakukannya atas risiko mereka sendiri",
      ru:"Настоящие Условия регулируются применимым правом.\n\nОбщие положения:\n• Условия представляют собой полное соглашение между вами и Snaptok\n• Если какое-либо положение окажется неисполнимым, остальные остаются в силе\n• Неприменение нами какого-либо права не означает отказа от него\n• Условия заменяют все предыдущие соглашения\n\nРазрешение споров:\n• Сначала обратитесь к нам на support@snaptok.app\n• Мы приложим добросовестные усилия для разрешения спора в течение 30 рабочих дней\n• Неурегулированные споры передаются в арбитраж или компетентный суд\n• Коллективные иски исключены в максимальной степени, допустимой законом\n\nМеждународные пользователи:\n• Snaptok работает глобально и доступен из разных юрисдикций\n• Вы обязуетесь соблюдать местное законодательство вашей страны\n• Мы не гарантируем соответствие сервиса законодательству всех стран",
      zh:"这些服务条款及由此产生的任何争议应受适用法律管辖。\n\n一般条款：\n• 这些条款构成您与 Snaptok 之间关于使用服务的完整协议\n• 如果任何条款被认定不可执行，其余条款继续有效\n• 我们未能执行任何权利或条款不构成对该权利的放弃\n• 这些条款取代您与 Snaptok 之间的任何先前协议\n\n争议解决：\n• 在采取正式法律行动之前，我们鼓励您先联系 support@snaptok.app\n• 我们将诚信努力在 30 个工作日内解决争议\n• 对于未解决的争议，您同意提交具有约束力的仲裁或有管辖权法院的管辖\n• 集体诉讼和集体仲裁在法律允许的范围内被放弃\n\n国际用户：\n• Snaptok 在全球范围内运营，可从具有不同法律的司法管辖区访问\n• 使用本服务即表示您同意遵守适用于您使用的所有当地法律法规\n• 从禁止其内容或使用的地区访问服务的用户自行承担风险",
      ar:"تخضع شروط الخدمة هذه وأي نزاعات ناشئة عنها للقانون المعمول به.\n\nأحكام عامة:\n• تشكّل هذه الشروط الاتفاقية الكاملة بينك وبين Snaptok فيما يتعلق باستخدام الخدمة\n• إذا تبيّن أن أي حكم غير قابل للتنفيذ، تظل الأحكام المتبقية سارية المفعول\n• عدم تطبيقنا لأي حق لا يُعدّ تنازلاً عنه\n• تحل هذه الشروط محل أي اتفاقيات سابقة بينك وبين Snaptok\n\nحل النزاعات:\n• نشجعك على التواصل معنا أولاً على support@snaptok.app قبل اتخاذ أي إجراء قانوني رسمي\n• سنبذل جهوداً بحسن نية لحل النزاعات خلال 30 يوم عمل\n• للنزاعات غير المحلولة، توافق على الخضوع للتحكيم الملزم أو اختصاص المحاكم المختصة\n\nالمستخدمون الدوليون:\n• يعمل Snaptok على مستوى عالمي ويمكن الوصول إليه من مناطق قضائية مختلفة\n• باستخدام الخدمة، توافق على الامتثال لجميع القوانين واللوائح المحلية المعمول بها\n• المستخدمون الذين يصلون إلى الخدمة من مناطق محظورة يتحملون المخاطرة وحدهم",
    },
  },
  {
    icon: RefreshCw, color: "slate",
    title: { en:"Changes & Contact", id:"Perubahan & Kontak", ru:"Изменения и контакт", zh:"变更与联系", ar:"التغييرات والتواصل" },
    body: {
      en:"We may update these Terms of Service from time to time. When we do:\n\n• The \"last updated\" date at the top of this page will change\n• For significant changes, we will notify registered users by email\n• Minor clarifications may be made without notification\n• Continued use of the service after changes constitutes acceptance\n\nIf you have questions about these terms, want to report a violation, or need to submit a copyright removal request, contact us:\n\n• Email: support@snaptok.app\n• Response time: 24–48 business hours\n• Copyright removal requests are reviewed within 48 hours",
      id:"Kami dapat memperbarui Syarat & Ketentuan ini dari waktu ke waktu:\n\n• Tanggal \"terakhir diperbarui\" di atas halaman ini akan berubah\n• Untuk perubahan signifikan, kami akan memberitahu pengguna terdaftar melalui email\n• Klarifikasi minor dapat dilakukan tanpa pemberitahuan\n• Penggunaan layanan yang berkelanjutan setelah perubahan merupakan penerimaan\n\nJika kamu memiliki pertanyaan tentang ketentuan ini:\n\n• Email: support@snaptok.app\n• Waktu respons: 24–48 jam kerja\n• Permintaan penghapusan hak cipta ditinjau dalam 48 jam",
      ru:"Мы можем обновлять эти Условия:\n\n• Дата \"последнего обновления\" будет меняться\n• О значительных изменениях мы уведомим пользователей по email\n• Незначительные уточнения могут быть внесены без уведомления\n• Продолжение использования означает принятие\n\nВопросы и обращения:\n• Email: support@snaptok.app\n• Ответ: 24–48 рабочих часов",
      zh:"我们可能会不时更新这些服务条款：\n\n• 本页顶部的\"最后更新\"日期将会更改\n• 对于重大变更，我们将通过电子邮件通知注册用户\n• 小的澄清可能在不通知的情况下进行\n• 变更后继续使用服务即表示接受\n\n如有疑问：\n• 电子邮件：support@snaptok.app\n• 响应时间：24-48 个工作小时\n• 版权删除请求在 48 小时内审核",
      ar:"قد نحدّث هذه الشروط من وقت لآخر:\n\n• سيتغير تاريخ \"آخر تحديث\" أعلى الصفحة\n• للتغييرات الجوهرية، سنُبلغ المستخدمين المسجلين عبر البريد الإلكتروني\n• التوضيحات الطفيفة قد تُجرى دون إشعار\n• الاستمرار في الاستخدام يعني القبول\n\nللأسئلة والتواصل:\n• البريد الإلكتروني: support@snaptok.app\n• وقت الاستجابة: 24-48 ساعة عمل",
    },
  },
];

const heading: L = { en:"Terms of Service", id:"Syarat & Ketentuan", ru:"Условия использования", zh:"服务条款", ar:"شروط الخدمة" };
const updated: L = { en:"Last updated: March 2026", id:"Terakhir diperbarui: Maret 2026", ru:"Последнее обновление: март 2026", zh:"最后更新：2026 年 3 月", ar:"آخر تحديث: مارس 2026" };
const intro: L = {
  en:"These Terms of Service govern your use of Snaptok and form a binding legal agreement between you and Snaptok. Please read them carefully. Using the service means you accept these terms.",
  id:"Syarat & Ketentuan ini mengatur penggunaan Snaptok dan membentuk perjanjian hukum yang mengikat antara kamu dan Snaptok. Harap baca dengan seksama. Menggunakan layanan berarti kamu menerima ketentuan ini.",
  ru:"Настоящие Условия регулируют использование Snaptok и являются юридически обязывающим соглашением между вами и Snaptok. Используя сервис, вы принимаете эти условия.",
  zh:"这些服务条款规范您对 Snaptok 的使用，并构成您与 Snaptok 之间具有法律约束力的协议。请仔细阅读。使用该服务即表示您接受这些条款。",
  ar:"تحكم شروط الخدمة هذه استخدامك لـ Snaptok وتشكّل اتفاقية قانونية ملزمة بينك وبين Snaptok. يرجى قراءتها بعناية. استخدام الخدمة يعني قبولك لهذه الشروط.",
};

export default function TermsPage() {
  const { lang } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto max-w-3xl px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
            <Scale className="h-7 w-7 text-primary" />
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
      </main>
      <Footer />
    </div>
  );
}
