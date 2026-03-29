"use client";
import React from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Copy, Download, CheckCircle, Smartphone, Monitor, ArrowRight, Lightbulb, AlertCircle, Zap } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/lang-context";
import { LangCode } from "@/lib/i18n";

type L = Record<LangCode,string>;

const heading: L = { en:"How to Use Snaptok", id:"Cara Menggunakan Snaptok", ru:"Как использовать Snaptok", zh:"如何使用 Snaptok", ar:"كيفية استخدام Snaptok" };
const sub: L    = { en:"Download any supported video in seconds — no account needed for basic use.", id:"Unduh video yang didukung dalam hitungan detik — tidak perlu akun untuk penggunaan dasar.", ru:"Скачайте любое поддерживаемое видео за секунды — аккаунт не нужен.", zh:"几秒内下载任何受支持的视频——基本使用无需账号。", ar:"نزّل أي فيديو مدعوم في ثوانٍ — لا حاجة لحساب للاستخدام الأساسي." };

const steps: { title: L; desc: L; icon: React.ElementType }[] = [
  {
    icon: Smartphone,
    title: { en:"Open the Video in the App", id:"Buka Video di Aplikasi", ru:"Откройте видео в приложении", zh:"在应用中打开视频", ar:"افتح الفيديو في التطبيق" },
    desc:  { en:"Open the video platform app or website on any device. Find the video you want to download and open it fully so you can see the share button.", id:"Buka aplikasi platform video atau websitenya di perangkat apapun. Temukan video yang ingin kamu unduh dan buka sepenuhnya sehingga kamu bisa melihat tombol bagikan.", ru:"Откройте приложение или сайт видеоплатформы на любом устройстве. Найдите нужное видео и откройте его полностью.", zh:"在任意设备上打开视频平台的应用或网站。找到您想下载的视频并完整打开，以便看到分享按钮。", ar:"افتح تطبيق منصة الفيديو أو موقعها على أي جهاز. ابحث عن الفيديو الذي تريد تنزيله وافتحه بالكامل." },
  },
  {
    icon: Copy,
    title: { en:"Copy the Video Link", id:"Salin Link Video", ru:"Скопируйте ссылку", zh:"复制视频链接", ar:"انسخ رابط الفيديو" },
    desc:  { en:'Tap the Share button (usually an arrow icon), then select "Copy Link" from the options. The full video URL is now in your clipboard, ready to paste.', id:'Ketuk tombol Share (biasanya ikon panah), lalu pilih "Salin Link" dari opsi. URL video lengkap sekarang ada di clipboard-mu, siap untuk ditempel.', ru:'Нажмите кнопку «Поделиться» (обычно иконка стрелки), затем выберите «Скопировать ссылку». Полный URL теперь в буфере обмена.', zh:'点击分享按钮（通常是箭头图标），然后从选项中选择"复制链接"。完整的视频 URL 现在在您的剪贴板中，准备粘贴。', ar:'اضغط زر المشاركة (عادة أيقونة سهم)، ثم اختر "نسخ الرابط". رابط الفيديو الكامل الآن في حافظتك، جاهز للصق.' },
  },
  {
    icon: Download,
    title: { en:"Paste on Snaptok & Process", id:"Tempel di Snaptok & Proses", ru:"Вставьте на Snaptok и обработайте", zh:"粘贴到 Snaptok 并处理", ar:"الصق في Snaptok وابدأ المعالجة" },
    desc:  { en:"Return to Snaptok, click the input field on the homepage, and paste the link (Ctrl+V or long-press Paste). Then click the Download Now button. Snaptok will fetch the video data in just a second or two.", id:"Kembali ke Snaptok, klik kolom input di halaman utama, dan tempel link (Ctrl+V atau tekan lama Tempel). Lalu klik tombol Unduh Sekarang. Snaptok akan mengambil data video hanya dalam satu atau dua detik.", ru:"Вернитесь на Snaptok, нажмите на поле ввода, вставьте ссылку (Ctrl+V). Затем нажмите «Скачать». Snaptok получит данные видео за секунду-две.", zh:"返回 Snaptok，点击主页上的输入框，粘贴链接（Ctrl+V 或长按粘贴）。然后点击立即下载按钮。Snaptok 将在一两秒内获取视频数据。", ar:"عد إلى Snaptok، انقر على حقل الإدخال في الصفحة الرئيسية، والصق الرابط. ثم اضغط تنزيل الآن. سيجلب Snaptok بيانات الفيديو في ثانية أو ثانيتين." },
  },
  {
    icon: Zap,
    title: { en:"Choose Your Format", id:"Pilih Format", ru:"Выберите формат", zh:"选择格式", ar:"اختر الصيغة" },
    desc:  { en:"A download panel appears with all available formats. Pick what you need: HD video (no watermark), SD video, original (with watermark), MP3 audio only, or individual images if the video is a slideshow. Each option shows the file type clearly.", id:"Panel unduhan muncul dengan semua format yang tersedia. Pilih apa yang kamu butuhkan: video HD (tanpa watermark), video SD, asli (dengan watermark), hanya audio MP3, atau gambar individual jika videonya adalah slideshow. Setiap opsi menampilkan jenis file dengan jelas.", ru:"Появится панель загрузки со всеми доступными форматами. Выберите нужный: HD-видео (без знака), SD-видео, оригинал (со знаком), только MP3 или отдельные изображения.", zh:"下载面板出现，显示所有可用格式。选择您需要的：HD 视频（无水印）、SD 视频、原始（有水印）、仅 MP3 音频，或幻灯片的单张图片。", ar:"تظهر لوحة التنزيل بجميع الصيغ المتاحة. اختر ما تحتاجه: فيديو HD (بدون علامة)، SD، أصلي (مع علامة)، MP3 فقط، أو صور فردية." },
  },
  {
    icon: CheckCircle,
    title: { en:"Download & Enjoy", id:"Unduh & Nikmati", ru:"Скачайте и наслаждайтесь", zh:"下载并享用", ar:"نزّل واستمتع" },
    desc:  { en:"Click the button next to your chosen format. The file downloads directly to your device — no extra apps, no redirects, no waiting. Your file is saved to your Downloads folder and ready to use, share, or archive.", id:"Klik tombol di sebelah format pilihanmu. File langsung terunduh ke perangkatmu — tidak ada aplikasi tambahan, tidak ada redirect, tidak ada penantian. Filemu tersimpan di folder Unduhan dan siap digunakan, dibagikan, atau diarsipkan.", ru:"Нажмите кнопку рядом с выбранным форматом. Файл скачивается напрямую — без лишних приложений, перенаправлений и ожидания.", zh:"点击所选格式旁边的按钮。文件直接下载到您的设备——无需额外应用，无重定向，无等待。", ar:"اضغط الزر بجانب الصيغة المختارة. يُنزَّل الملف مباشرةً على جهازك — بدون تطبيقات إضافية أو إعادة توجيه أو انتظار." },
  },
];

const tips: { title: L; desc: L; icon: React.ElementType }[] = [
  {
    icon: Lightbulb,
    title: { en:"Always Use the Full URL", id:"Selalu Gunakan URL Lengkap", ru:"Всегда используйте полный URL", zh:"始终使用完整 URL", ar:"استخدم دائماً الرابط الكامل" },
    desc:  { en:"Make sure you copy the complete link, not just a partial one. Short-form links (like share links or stories) may work differently — if in doubt, open the video in a browser and copy from the address bar.", id:"Pastikan kamu menyalin link lengkap, bukan hanya sebagian. Link berbentuk pendek (seperti link berbagi atau stories) mungkin bekerja berbeda — jika ragu, buka video di browser dan salin dari address bar.", ru:"Убедитесь, что копируете полную ссылку. Короткие ссылки могут работать иначе — откройте видео в браузере и скопируйте из адресной строки.", zh:"确保复制完整链接，而不仅仅是部分链接。短链接（如分享链接或故事）可能工作方式不同——如有疑问，在浏览器中打开视频并从地址栏复制。", ar:"تأكد من نسخ الرابط الكامل. الروابط القصيرة قد تعمل بشكل مختلف — عند الشك، افتح الفيديو في متصفح وانسخ من شريط العنوان." },
  },
  {
    icon: Monitor,
    title: { en:"HD Quality Downloads", id:"Unduhan Kualitas HD", ru:"HD-загрузки", zh:"高清质量下载", ar:"تنزيلات بجودة HD" },
    desc:  { en:"Always choose the HD no-watermark option for the best viewing experience. The file size will be larger, but quality is significantly better — especially noticeable on large screens or when sharing the video further.", id:"Selalu pilih opsi HD tanpa watermark untuk pengalaman menonton terbaik. Ukuran file akan lebih besar, tapi kualitasnya jauh lebih baik — terutama terlihat di layar besar atau saat berbagi video lebih lanjut.", ru:"Всегда выбирайте HD без знака для лучшего качества. Размер файла будет больше, но качество значительно выше.", zh:"始终选择无水印 HD 选项以获得最佳观看体验。文件大小会更大，但质量明显更好——在大屏幕上或进一步分享时尤为明显。", ar:"اختر دائماً خيار HD بدون علامة مائية للحصول على أفضل تجربة مشاهدة. حجم الملف سيكون أكبر، لكن الجودة أفضل بكثير." },
  },
  {
    icon: AlertCircle,
    title: { en:"Private Videos Won't Work", id:"Video Privat Tidak Bisa Diunduh", ru:"Приватные видео не скачаются", zh:"私密视频无法下载", ar:"الفيديوهات الخاصة لن تعمل" },
    desc:  { en:"Only publicly available videos can be downloaded. If a creator has set their video to private, followers-only, or has deleted it, Snaptok cannot access it. This is by design — we respect privacy settings.", id:"Hanya video yang tersedia publik yang bisa diunduh. Jika kreator telah mengatur videonya ke privat, hanya pengikut, atau telah menghapusnya, Snaptok tidak dapat mengaksesnya. Ini by design — kami menghormati pengaturan privasi.", ru:"Только публичные видео можно скачать. Если видео приватное, для подписчиков или удалено, Snaptok не сможет его получить.", zh:"只能下载公开可用的视频。如果创作者将视频设为私密、仅关注者或已删除，Snaptok 无法访问。这是设计如此——我们尊重隐私设置。", ar:"يمكن تنزيل الفيديوهات العامة فقط. إذا جعل المنشئ فيديوه خاصاً أو حذفه، لا يمكن لـ Snaptok الوصول إليه." },
  },
];

export default function GuidePage() {
  const { lang } = useLang();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-border bg-gradient-to-b from-primary/5 to-transparent py-16">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-5">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-3">{heading[lang] ?? heading.en}</h1>
            <p className="text-muted-foreground text-lg">{sub[lang] ?? sub.en}</p>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16 container mx-auto max-w-3xl px-4">
          <div className="space-y-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <Card key={i} className="border-border shadow-sm">
                  <CardContent className="p-6 flex gap-5">
                    <div className="flex-shrink-0 flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-base mb-1.5">{step.title[lang] ?? step.title.en}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{step.desc[lang] ?? step.desc.en}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Tips */}
        <section className="py-12 border-t border-border bg-muted/30">
          <div className="container mx-auto max-w-3xl px-4">
            <h2 className="text-xl font-bold mb-6">
              {{ en:"Pro Tips", id:"Tips Pro", ru:"Советы", zh:"专业提示", ar:"نصائح احترافية" }[lang] ?? "Pro Tips"}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {tips.map((tip, i) => {
                const Icon = tip.icon;
                return (
                  <div key={i} className="rounded-xl border border-border bg-card p-5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-semibold text-sm mb-2">{tip.title[lang] ?? tip.title.en}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{tip.desc[lang] ?? tip.desc.en}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 border-t border-border">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <h2 className="text-xl font-bold mb-2">
              {{ en:"Ready to download?", id:"Siap untuk mengunduh?", ru:"Готовы скачать?", zh:"准备好下载了吗？", ar:"مستعد للتنزيل؟" }[lang]}
            </h2>
            <p className="text-muted-foreground mb-6">
              {{ en:"Head to the homepage and paste your first link.", id:"Pergi ke halaman utama dan tempel link pertamamu.", ru:"Перейдите на главную и вставьте первую ссылку.", zh:"前往主页并粘贴您的第一个链接。", ar:"انتقل إلى الصفحة الرئيسية والصق أول رابط." }[lang]}
            </p>
            <Link href="/">
              <Button className="gap-2">
                {{ en:"Start Downloading", id:"Mulai Mengunduh", ru:"Начать загрузку", zh:"开始下载", ar:"ابدأ التنزيل" }[lang]}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
