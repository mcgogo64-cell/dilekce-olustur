export const petitions = [
  // TÜKETİCİ
  {
    id: "abonelik-iptal",
    title: "Abonelik İptali",
    category: "Tüketici",
    description: "30 saniyede abonelik iptal PDF’i oluştur.",
    steps: [
      { question: "Adınız", key: "ad", type: "text", required: true, placeholder: "Örn: Ahmet" },
      { question: "Soyadınız", key: "soyad", type: "text", required: true, placeholder: "Örn: Yılmaz" },
      { question: "TCKN", key: "tckn", type: "text", required: true, placeholder: "Örn: 10000000000" },
      { question: "Hangi Kurum?", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: X Telekom" },
      { question: "Müşteri / Hesap Numaranız", key: "musteriNo", type: "text", required: true, placeholder: "Örn: 123456789" },
      { question: "Adresiniz", key: "adres", type: "textarea", required: true, placeholder: "Örn: Atatürk Cd. No:10 Daire 5, İstanbul" },
      { question: "Telefon Numaranız", key: "telefon", type: "text", placeholder: "Örn: 05xx xxx xx xx" },
      { question: "E-posta", key: "email", type: "text", placeholder: "Örn: ahmet@mail.com" },
      { question: "Dilekçe Tarihi", key: "tarih", type: "date", required: true },
      { question: "Ek Açıklama", key: "aciklama", type: "textarea", placeholder: "Örn: Cayma bedeli muafiyeti" },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

${d.musteriNo} numaralı aboneliğimin hiçbir ek ücret tahakkuk ettirilmeden ${d.tarih} itibarıyla sonlandırılmasını talep ederim. Kullanıma kapatma, fatura kesiminin durdurulması ve varsa cayma bedeli muafiyetinin uygulanmasını arz ederim.

${d.aciklama ? `Ek açıklama: ${d.aciklama}` : ``}

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Adres: ${d.adres}
Telefon: ${d.telefon || "-"}
E-posta: ${d.email || "-"}`,
  },
  {
    id: "internet-cayma-itiraz",
    title: "İnternet Cayma Bedeli İtirazı",
    category: "Tüketici",
    description: "Haksız cayma bedeline itiraz dilekçesi.",
    steps: [
      { question: "Adınız", key: "ad", type: "text", required: true, placeholder: "Örn: Ayşe" },
      { question: "Soyadınız", key: "soyad", type: "text", required: true, placeholder: "Örn: Demir" },
      { question: "TCKN", key: "tckn", type: "text", required: true },
      { question: "Hizmet Sağlayıcı", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: Superonline" },
      { question: "Abone / Müşteri No", key: "musteriNo", type: "text", required: true },
      { question: "Fatura Numarası", key: "faturaNo", type: "text", placeholder: "Örn: 2024-00123" },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Ek Açıklama", key: "aciklama", type: "textarea", placeholder: "Örn: Hız/kalite düşüklüğü" },
    ],
    templateText: (d) => `${d.kurumAdi} Müşteri Hizmetleri'ne,

${d.musteriNo} numaralı aboneliğime ilişkin ${d.faturaNo || "ilgili"} faturada yer alan cayma bedeline itiraz ediyorum. Hizmetin taahhüt koşullarına uygun sunulmaması sebebiyle bedelin iptalini talep ederim.

${d.aciklama ? `Ek açıklama: ${d.aciklama}` : ``}

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Adres: ${d.adres}
Tarih: ${d.tarih}`,
  },
  {
    id: "tv-iptal",
    title: "TV Aboneliği İptali",
    category: "Tüketici",
    description: "Televizyon aboneliği iptali.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Kurum", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: Digitürk" },
      { question: "Abone No", key: "musteriNo", type: "text", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} Müşteri Hizmetleri'ne,

${d.musteriNo} numaralı TV aboneliğimin ${d.tarih} itibarıyla sonlandırılmasını, fatura kesiminin durdurulmasını ve cihaz iadesi sürecinin başlatılmasını talep ederim.

Ad Soyad: ${d.ad} ${d.soyad}
Adres: ${d.adres}`,
  },
  {
    id: "ayipli-urun-iade",
    title: "Ayıplı Ürün İadesi",
    category: "Tüketici",
    description: "Ayıplı ürün için iade/bedel talebi.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Satıcı/Kurum", key: "kurumAdi", type: "text", required: true },
      { question: "Ürün", key: "urun", type: "text", required: true },
      { question: "Fatura No", key: "faturaNo", type: "text", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Problemin Özeti", key: "aciklama", type: "textarea", required: true },
    ],
    templateText: (d) => `${d.kurumAdi}'na,

${d.faturaNo} numaralı faturada yer alan ${d.urun} ürününde ayıp/arıza bulunmaktadır. Ürünün iadesi ve bedelinin tarafıma ödenmesini talep ederim.

Sorun: ${d.aciklama}

Ad Soyad: ${d.ad} ${d.soyad}
Adres: ${d.adres}
Tarih: ${d.tarih}`,
  },
  {
    id: "kargo-sikayet",
    title: "Kargo Şikayet Dilekçesi",
    category: "Tüketici",
    description: "Teslimat gecikmesi/hasarı bildirimi.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Kargo Firması", key: "kurumAdi", type: "text", required: true },
      { question: "Takip No", key: "kargoNo", type: "text", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Sorun Özeti", key: "aciklama", type: "textarea", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} Müşteri Hizmetleri'ne,

${d.kargoNo} takip numaralı gönderimde ${d.aciklama}. Gecikme/hasar nedeniyle zararımın tazminini ve sürecin incelenmesini talep ederim.

Ad Soyad: ${d.ad} ${d.soyad}
Adres: ${d.adres}
Tarih: ${d.tarih}`,
  },
  {
    id: "garanti-tamir",
    title: "Garanti Kapsamında Tamir",
    category: "Tüketici",
    description: "Garanti sürecinde ücretsiz tamir talebi.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Ürün", key: "urun", type: "text", required: true },
      { question: "Seri / IMEI", key: "seri", type: "text", placeholder: "Opsiyonel" },
      { question: "Fatura No", key: "faturaNo", type: "text", required: true },
      { question: "Yetkili Servis/Kurum", key: "kurumAdi", type: "text", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Sorun", key: "aciklama", type: "textarea", required: true },
    ],
    templateText: (d) => `${d.kurumAdi}'na,

${d.urun} ürünü ${d.faturaNo} faturasıyla alınmış olup garanti kapsamındadır. ${d.aciklama}. Ücretsiz tamir/onarım işleminin yapılmasını talep ederim.

Ad Soyad: ${d.ad} ${d.soyad}
Adres: ${d.adres}
Tarih: ${d.tarih}`,
  },
  {
    id: "banka-aidat-iade",
    title: "Banka Aidatı İade",
    category: "Bankacılık",
    description: "Kredi kartı aidatı iade talebi.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Banka/Kurum", key: "kurumAdi", type: "text", required: true },
      { question: "Kart Numarası (son 4)", key: "kart", type: "text", required: true, placeholder: "Örn: 1234" },
      { question: "Aidat Tarihi", key: "tarih", type: "date", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} Genel Müdürlüğü'ne,

Kredi kartımın (${d.kart}) ${d.tarih} tarihli ekstresinde yansıtılan kart aidatının iadesini talep ederim. Aksi durumda yasal yollara başvuracağımı bildiririm.

Ad Soyad: ${d.ad} ${d.soyad}
Adres: ${d.adres}`,
  },
  {
    id: "hesap-kapatma",
    title: "Banka Hesap Kapatma",
    category: "Bankacılık",
    description: "Vadesiz/TL hesabı kapatma talebi.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Banka/Kurum", key: "kurumAdi", type: "text", required: true },
      { question: "Hesap Numarası", key: "hesapNo", type: "text", required: true },
      { question: "IBAN", key: "iban", type: "text", placeholder: "Opsiyonel" },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} Şubesine,

${d.hesapNo} numaralı hesabımın (${d.iban || "IBAN belirtilmedi"}) kapatılarak bakiye varsa tarafıma aktarılmasını talep ederim.

Ad Soyad: ${d.ad} ${d.soyad}
Adres: ${d.adres}
Tarih: ${d.tarih}`,
  },

  // RESMİ
  {
    id: "adres-degisikligi",
    title: "Adres Değişikliği Bildirimi",
    category: "Resmi",
    description: "Yeni adresinizi resmi makamlara bildirin.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "TCKN", key: "tckn", type: "text", required: true },
      { question: "Yeni Adres", key: "adres", type: "textarea", required: true },
      { question: "Bildirim Kurumu", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: Nüfus Müdürlüğü" },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

Yeni adresim: ${d.adres}. Adres değişikliğimin resmi kayıtlara işlenmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Tarih: ${d.tarih}`,
  },
  {
    id: "kimlik-kayip",
    title: "Kimlik Kayıp Dilekçesi",
    category: "Resmi",
    description: "Kimlik kaybı bildirimi ve yenileme talebi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "TCKN", key: "tckn", required: true },
      { question: "Kayıp Tarihi", key: "tarih", type: "date", required: true },
      { question: "Kayıp Yeri", key: "kayipYeri", type: "text", placeholder: "Örn: İl/ilçe" },
      { question: "Adres", key: "adres", type: "textarea", required: true },
    ],
    templateText: (d) => `İlgili Makama,

Kimlik kartımı ${d.kayipYeri || ""} bölgesinde ${d.tarih} tarihinde kaybettim. Yeniden düzenlenmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Adres: ${d.adres}`,
  },
  {
    id: "vukuatli-nufus",
    title: "Vukuatlı Nüfus Kayıt Örneği",
    category: "Resmi",
    description: "Vukuatlı nüfus kayıt örneği talebi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "TCKN", key: "tckn", required: true },
      { question: "Talep Kurumu", key: "kurumAdi", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

İşlemlerimde kullanılmak üzere vukuatlı nüfus kayıt örneğimin tarafıma verilmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Tarih: ${d.tarih}`,
  },
  {
    id: "sabika-kaydi",
    title: "Adli Sicil (Sabıka) Kaydı Talebi",
    category: "Resmi",
    description: "Adli sicil belgesi talebi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "TCKN", key: "tckn", required: true },
      { question: "Talep Nedeni", key: "aciklama", type: "textarea", placeholder: "Örn: İş başvurusu" },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `İlgili Makama,

${d.aciklama || "İşlemlerimde kullanılmak üzere"} adli sicil kaydımın verilmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Tarih: ${d.tarih}`,
  },
  {
    id: "ogrenci-belgesi",
    title: "Öğrenci Belgesi Talebi",
    category: "Eğitim",
    description: "Okul/üniversite için öğrenci belgesi talebi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Öğrenci No", key: "ogrNo", required: true },
      { question: "Okul/Kurum", key: "kurumAdi", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Talep Nedeni", key: "aciklama", type: "textarea", placeholder: "Örn: Burs başvurusu" },
    ],
    templateText: (d) => `${d.kurumAdi} Müdürlüğü'ne,

Öğrencisi olduğum kurumdan öğrenci belgesi talep ediyorum.

Ad Soyad: ${d.ad} ${d.soyad}
Öğrenci No: ${d.ogrNo}
${d.aciklama ? `Nedeni: ${d.aciklama}` : ""}
Tarih: ${d.tarih}`,
  },
  {
    id: "askerlik-durum",
    title: "Askerlik Durum Belgesi",
    category: "Resmi",
    description: "Askerlik durum belgesi talebi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "TCKN", key: "tckn", required: true },
      { question: "Talep Kurumu", key: "kurumAdi", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi}'na,

Askerlik durum belgemin tarafıma verilmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Tarih: ${d.tarih}`,
  },

  // İŞ / KURUM
  {
    id: "mazeret-izni",
    title: "Mazeret İzni Talebi",
    category: "İK",
    description: "Kısa süreli mazeret izni dilekçesi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Kurum", key: "kurumAdi", required: true },
      { question: "Birim", key: "birim", type: "text" },
      { question: "İzin Başlangıç", key: "izinBaslangic", type: "date", required: true },
      { question: "İzin Bitiş", key: "izinBitis", type: "date", required: true },
      { question: "Gerekçe", key: "aciklama", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} İnsan Kaynakları'na,

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında mazeret izni talep ediyorum.

Gerekçe: ${d.aciklama}

Ad Soyad: ${d.ad} ${d.soyad}
Birim: ${d.birim || "-"}
Tarih: ${d.tarih}`,
  },
  {
    id: "yillik-izni",
    title: "Yıllık İzin Talebi",
    category: "İK",
    description: "Yıllık izin dilekçesi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Kurum", key: "kurumAdi", required: true },
      { question: "Birim", key: "birim", type: "text" },
      { question: "İzin Başlangıç", key: "izinBaslangic", type: "date", required: true },
      { question: "İzin Bitiş", key: "izinBitis", type: "date", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Not", key: "aciklama", type: "textarea", placeholder: "Opsiyonel" },
    ],
    templateText: (d) => `${d.kurumAdi} İnsan Kaynakları'na,

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında yıllık izin kullanmak istiyorum.

${d.aciklama ? `Not: ${d.aciklama}` : ""}

Ad Soyad: ${d.ad} ${d.soyad}
Birim: ${d.birim || "-"}
Tarih: ${d.tarih}`,
  },
  {
    id: "fazla-mesai-ucreti",
    title: "Fazla Mesai Ücreti Talebi",
    category: "İK",
    description: "Ödenmeyen mesai ücretleri için talep.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Kurum", key: "kurumAdi", required: true },
      { question: "Birim", key: "birim", type: "text" },
      { question: "Dönem", key: "donem", type: "text", placeholder: "Örn: Ekim 2024" },
      { question: "Toplam Mesai (saat)", key: "mesai", type: "text" },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} İnsan Kaynakları'na,

${d.donem || "ilgili dönemde"} gerçekleştirdiğim toplam ${d.mesai || "-"} saat fazla mesainin ücretinin ödenmesini talep ederim.

Ad Soyad: ${d.ad} ${d.soyad}
Birim: ${d.birim || "-"}
Tarih: ${d.tarih}`,
  },
  {
    id: "gorev-yeri-degisikligi",
    title: "Görev Yeri Değişikliği",
    category: "İK",
    description: "Görev yeri/şehir değişikliği talebi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Kurum", key: "kurumAdi", required: true },
      { question: "Birim", key: "birim", type: "text" },
      { question: "Talep Edilen Görev Yeri", key: "yeniYer", type: "text", required: true },
      { question: "Gerekçe", key: "aciklama", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} İnsan Kaynakları'na,

${d.yeniYer} görev yerine atanmayı talep ediyorum.

Gerekçe: ${d.aciklama}

Ad Soyad: ${d.ad} ${d.soyad}
Birim: ${d.birim || "-"}
Tarih: ${d.tarih}`,
  },

  // KİRA & KONUT
  {
    id: "depozito-iadesi",
    title: "Depozito İadesi",
    category: "Kira & Konut",
    description: "Kira sözleşmesi sonrası depozito iadesi talebi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Ev Sahibi Adı", key: "kurumAdi", required: true, placeholder: "Ev sahibi/Yetkili" },
      { question: "Adres (Kiralık Yer)", key: "adres", type: "textarea", required: true },
      { question: "Sözleşme Bitiş", key: "tarih", type: "date", required: true },
      { question: "İban", key: "iban", type: "text", placeholder: "Örn: TR00 ..." },
    ],
    templateText: (d) => `${d.kurumAdi}'na,

${d.adres} adresindeki kiralık mülkte depozito bedelimin sözleşme bitişi (${d.tarih}) itibarıyla iadesini talep ederim. İban: ${d.iban || "-"}.

Ad Soyad: ${d.ad} ${d.soyad}`,
  },
  {
    id: "kira-zam-itiraz",
    title: "Kira Zammı İtirazı",
    category: "Kira & Konut",
    description: "Yasal sınır üzerindeki zam oranına itiraz.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Ev Sahibi", key: "kurumAdi", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Yeni Zam Oranı (%)", key: "zam", type: "text", required: true },
      { question: "Yasal Üst Sınır (%)", key: "ustSinir", type: "text", placeholder: "Örn: TÜFE oranı" },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi}'na,

${d.adres} adresindeki kira için bildirilen ${d.zam}% zam oranı yasal sınır (${d.ustSinir || "güncel TÜFE"}%) üzerindedir. Yasal orana çekilmesini talep ederim.

Ad Soyad: ${d.ad} ${d.soyad}
Tarih: ${d.tarih}`,
  },
  {
    id: "haksiz-tahliye",
    title: "Haksız Tahliye Uyarısı",
    category: "Kira & Konut",
    description: "Haksız tahliye girişimine karşı uyarı dilekçesi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Ev Sahibi", key: "kurumAdi", required: true },
      { question: "Adres (Kiralık Yer)", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Gerekçe", key: "aciklama", type: "textarea", required: true },
    ],
    templateText: (d) => `${d.kurumAdi}'na,

${d.adres} adresindeki kiracı olarak, haksız tahliye girişiminize karşı itiraz ediyorum. ${d.aciklama}. Yasal haklarımı saklı tutarım.

Ad Soyad: ${d.ad} ${d.soyad}
Tarih: ${d.tarih}`,
  },

  // DİĞER
  {
    id: "kargo-etiketi",
    title: "PTT Kargo Formu",
    category: "Kargo",
    description: "Kargo gönderi etiketi.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Kurum / Alıcı", key: "kurumAdi", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Alıcı Telefon", key: "aliciTelefon", type: "text", placeholder: "Opsiyonel" },
      { question: "Telefon", key: "telefon", type: "text", placeholder: "Gönderici tel" },
    ],
    templateText: (d) => `PTT Kargo Gönderi Bilgisi

Gönderici: ${d.ad} ${d.soyad}
Gönderici Tel: ${d.telefon || "-"}
Alıcı: ${d.kurumAdi}
Alıcı Tel: ${d.aliciTelefon || "-"}
Adres: ${d.adres}
İçerik: Resmi Evrak`,
  },
  {
    id: "ikametgah-talep",
    title: "İkametgah Belgesi Talebi",
    category: "Resmi",
    description: "Resmi işlemler için ikametgah belgesi talebi.",
    steps: [
      { question: "Adınız", key: "ad", type: "text", required: true, placeholder: "Örn: Ayşe" },
      { question: "Soyadınız", key: "soyad", type: "text", required: true, placeholder: "Örn: Demir" },
      { question: "TCKN", key: "tckn", type: "text", required: true, placeholder: "Örn: 10000000000" },
      { question: "Adresiniz", key: "adres", type: "textarea", required: true, placeholder: "Örn: İnönü Mah. 123. Sk. No:4/2 Ankara" },
      { question: "Belgeyi Talep Ettiğiniz Kurum", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: Nüfus Müdürlüğü" },
      { question: "Dilekçe Tarihi", key: "tarih", type: "date", required: true },
      { question: "Telefon", key: "telefon", type: "text", placeholder: "Örn: 05xx xxx xx xx" },
      { question: "E-posta", key: "email", type: "text", placeholder: "Örn: ayse@mail.com" },
      { question: "Ek Açıklama", key: "aciklama", type: "textarea", placeholder: "Örn: İş başvurusu için gereklidir." },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

İkametgah belgemin ${d.kurumAdi} nezdindeki işlemlerimde kullanılmak üzere tarafıma verilmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Adres: ${d.adres}
Telefon: ${d.telefon || "-"}
E-posta: ${d.email || "-"}

${d.aciklama ? `Ek açıklama: ${d.aciklama}` : ``}

Gereğini arz ederim.`,
  },
  {
    id: "izin-talebi",
    title: "Resmi İzin Talebi",
    category: "İK",
    description: "Kurum içi yıllık/mazeret izin talebi.",
    steps: [
      { question: "Adınız", key: "ad", type: "text", required: true, placeholder: "Örn: Murat" },
      { question: "Soyadınız", key: "soyad", type: "text", required: true, placeholder: "Örn: Kaya" },
      { question: "TCKN", key: "tckn", type: "text", required: true, placeholder: "Örn: 10000000000" },
      { question: "Kurum / Şirket", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: ABC Teknoloji" },
      { question: "Departman / Birim", key: "birim", type: "text", placeholder: "Örn: Yazılım" },
      { question: "İzin Başlangıç", key: "izinBaslangic", type: "date", required: true },
      { question: "İzin Bitiş", key: "izinBitis", type: "date", required: true },
      { question: "Adres", key: "adres", type: "textarea", placeholder: "Örn: Tatil süresince kalacağım adres" },
      { question: "Telefon", key: "telefon", type: "text", placeholder: "Örn: 05xx xxx xx xx" },
      { question: "Dilekçe Tarihi", key: "tarih", type: "date", required: true },
      { question: "Gerekçe", key: "aciklama", type: "textarea", placeholder: "Örn: Yıllık izin / sağlık" },
    ],
    templateText: (d) => `${d.kurumAdi} İnsan Kaynakları'na,

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında izinli sayılmak istiyorum. İzin süresince görevlerimi devretmiş bulunmaktayım.

${d.aciklama ? `Gerekçe: ${d.aciklama}` : ""}

Ad Soyad: ${d.ad} ${d.soyad}
Birim: ${d.birim || "-"}
TCKN: ${d.tckn}
Telefon: ${d.telefon || "-"}
Adres: ${d.adres || "-"}`,
  },
];
