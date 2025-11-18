export const petitions = [
  {
    id: "abonelik-iptal",
    title: "Abonelik İptali",
    category: "Tüketici",
    description: "İnternet/TV/telefon aboneliğini sonlandırma talebi.",
    steps: [
      { question: "Adınız", key: "ad", type: "text", required: true, placeholder: "Adınız" },
      { question: "Soyadınız", key: "soyad", type: "text", required: true, placeholder: "Soyadınız" },
      { question: "TCKN", key: "tckn", type: "text", required: true, placeholder: "11 haneli" },
      { question: "Hangi Kurum?", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: X Telekom" },
      { question: "Müşteri / Hesap Numaranız", key: "musteriNo", type: "text", required: true },
      { question: "Adresiniz", key: "adres", type: "textarea", required: true, placeholder: "Fatura/ikamet adresi" },
      { question: "Telefon Numaranız", key: "telefon", type: "text", placeholder: "05xx xxx xx xx" },
      { question: "E-posta", key: "email", type: "text", placeholder: "ornek@mail.com" },
      { question: "Dilekçe Tarihi", key: "tarih", type: "date", required: true },
      {
        question: "Ek Açıklama",
        key: "aciklama",
        type: "textarea",
        placeholder: "Cayma bedeli muafiyeti, cihaz iadesi vb.",
      },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

${d.musteriNo} numaralı aboneliğimin hiçbir ek ücret tahakkuk ettirilmeden ${d.tarih} tarihi itibarıyla sonlandırılmasını talep ederim. Kullanıma kapatma, fatura kesiminin durdurulması ve varsa cayma bedeli muafiyetinin uygulanmasını arz ederim.

${d.aciklama || "Ek açıklama: Yok."}

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Adres: ${d.adres}
Telefon: ${d.telefon || "-"}
E-posta: ${d.email || "-"}`,
  },
  {
    id: "ikametgah-talep",
    title: "İkametgah Belgesi Talebi",
    category: "Resmi",
    description: "Resmi işlemler için ikametgah belgesi talebi.",
    steps: [
      { question: "Adınız", key: "ad", type: "text", required: true },
      { question: "Soyadınız", key: "soyad", type: "text", required: true },
      { question: "TCKN", key: "tckn", type: "text", required: true },
      { question: "Adresiniz", key: "adres", type: "textarea", required: true, placeholder: "Güncel ikamet adresi" },
      { question: "Belgeyi Talep Ettiğiniz Kurum", key: "kurumAdi", type: "text", required: true },
      { question: "Dilekçe Tarihi", key: "tarih", type: "date", required: true },
      { question: "Telefon", key: "telefon", type: "text", placeholder: "05xx xxx xx xx" },
      { question: "E-posta", key: "email", type: "text", placeholder: "ornek@mail.com" },
      { question: "Ek Açıklama", key: "aciklama", type: "textarea", placeholder: "Opsiyonel not" },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

İkametgah belgemin ${d.kurumAdi} nezdindeki işlemlerimde kullanılmak üzere tarafıma verilmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Adres: ${d.adres}
Telefon: ${d.telefon || "-"}
E-posta: ${d.email || "-"}

${d.aciklama || "Ek açıklama bulunmamaktadır."}

Gereğini arz ederim.`,
  },
  {
    id: "izin-talebi",
    title: "Resmi İzin Talebi",
    category: "İK",
    description: "Kurum içi yıllık/mazeret izin talebi.",
    steps: [
      { question: "Adınız", key: "ad", type: "text", required: true },
      { question: "Soyadınız", key: "soyad", type: "text", required: true },
      { question: "TCKN", key: "tckn", type: "text", required: true },
      { question: "Kurum / Şirket", key: "kurumAdi", type: "text", required: true },
      { question: "Departman / Birim", key: "birim", type: "text", placeholder: "Örn: Yazılım" },
      { question: "İzin Başlangıç", key: "izinBaslangic", type: "date", required: true },
      { question: "İzin Bitiş", key: "izinBitis", type: "date", required: true },
      { question: "Adres", key: "adres", type: "textarea", placeholder: "Opsiyonel" },
      { question: "Telefon", key: "telefon", type: "text", placeholder: "05xx xxx xx xx" },
      { question: "Dilekçe Tarihi", key: "tarih", type: "date", required: true },
      { question: "Gerekçe", key: "aciklama", type: "textarea", placeholder: "Kısa açıklama" },
    ],
    templateText: (d) => `${d.kurumAdi} İnsan Kaynakları'na,

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında izinli sayılmak istiyorum. İzin süresince görevlerimi devretmiş bulunmaktayım.

Gerekçe: ${d.aciklama || "Belirtilmedi."}

Ad Soyad: ${d.ad} ${d.soyad}
Birim: ${d.birim || "-"}
TCKN: ${d.tckn}
Telefon: ${d.telefon || "-"}
Adres: ${d.adres || "-"}`,
  },
];
