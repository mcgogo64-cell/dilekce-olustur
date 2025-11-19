export const petitions = [
  // TÜKETİCİ
  {
    id: "abonelik-iptal",
    title: "Abonelik İptali",
    category: "Tüketici",
    description: "Cezasız abonelik fesih talebi.",
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

${d.musteriNo} numaralı aboneliğimin ${d.tarih} tarihi itibarıyla herhangi bir cezai bedel uygulanmadan feshedilmesini talep ediyorum. Hizmete erişimin sonlandırılması, fatura kesiminin durdurulması ve varsa cayma bedeli muafiyetinin uygulanmasını arz ederim.

${d.aciklama ? `İlave bilgi: ${d.aciklama}` : ""}

Gereğini bilgilerinize sunarım.`,
  },
  {
    id: "internet-cayma-itiraz",
    title: "İnternet Cayma Bedeli İtirazı",
    category: "Tüketici",
    description: "İnternet cayma bedeline karşı resmi metin.",
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

${d.musteriNo} numaralı aboneliğime ilişkin ${d.faturaNo || "ilgili"} faturada yer alan cayma bedelinin iptalini talep ediyorum. Hizmetin taahhüt koşullarına uygun sunulmaması ve sürekli yaşanan aksaklıklar sebebiyle bedelin tarafıma yansıtılması hukuka aykırıdır.

${d.aciklama ? `Olay özeti: ${d.aciklama}` : ""}

Gereğini bilgilerinize arz ederim.`,
  },
  {
    id: "tv-iptal",
    title: "TV Aboneliği İptali",
    category: "Tüketici",
    description: "TV platformu iptal talebi.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Kurum", key: "kurumAdi", type: "text", required: true, placeholder: "Örn: Digitürk" },
      { question: "Abone No", key: "musteriNo", type: "text", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} Müşteri Hizmetleri'ne,

${d.musteriNo} numaralı TV aboneliğimin ${d.tarih} tarihinden itibaren sonlandırılmasını, faturalandırmanın durdurulmasını ve varsa ekipmanların iade prosedürünün başlatılmasını talep ederim.

Saygılarımla.`,
  },
  {
    id: "ayipli-urun-iade",
    title: "Ayıplı Ürün İadesi",
    category: "Tüketici",
    description: "Ayıplı ürün iade/bedel talebi.",
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
    templateText: (d) => `Sayın ${d.kurumAdi},

${d.faturaNo} numaralı faturada yer alan ${d.urun} ürününde ayıp/arıza tespit edilmiştir. ${d.aciklama}. 6502 sayılı Kanun uyarınca seçimlik hakkım olarak ürün bedelinin iadesini/ayıpsız misli ile değiştirilmesini talep ederim.

Gereğini arz ederim.`,
  },
  {
    id: "kargo-sikayet",
    title: "Kargo Şikayet Dilekçesi",
    category: "Tüketici",
    description: "Teslimat gecikmesi veya hasar bildirimi.",
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

${d.kargoNo} takip numaralı gönderimin ${d.tarih} tarihli teslim sürecinde ${d.aciklama}. Zararımın giderilmesi ve süreç hakkında yazılı bilgilendirme yapılmasını talep ederim.

Gereğini arz ederim.`,
  },
  {
    id: "garanti-tamir",
    title: "Garanti Kapsamında Tamir Talebi",
    category: "Tüketici",
    description: "Garanti kapsamındaki ücretsiz onarım talebi.",
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
    templateText: (d) => `Sayın ${d.kurumAdi},

${d.urun} ürünü ${d.faturaNo} numaralı faturayla satın alınmış olup garanti kapsamındadır. ${d.aciklama}. Garanti koşulları gereğince ücretsiz onarımın yapılmasını, mümkün değilse ürünün yenisiyle değiştirilmesini arz ederim.

Saygılarımla.`,
  },
  {
    id: "banka-aidat-iade",
    title: "Banka Aidatı İade Talebi",
    category: "Bankacılık",
    description: "Kredi kartı aidatının iadesi için dilekçe.",
    steps: [
      { question: "Ad", key: "ad", type: "text", required: true },
      { question: "Soyad", key: "soyad", type: "text", required: true },
      { question: "Banka/Kurum", key: "kurumAdi", type: "text", required: true },
      { question: "Kart Numarası (son 4)", key: "kart", type: "text", required: true, placeholder: "Örn: 1234" },
      { question: "Aidat Tarihi", key: "tarih", type: "date", required: true },
      { question: "Adres", key: "adres", type: "textarea", required: true },
    ],
    templateText: (d) => `${d.kurumAdi} Genel Müdürlüğü'ne,

Kredi kartımın (${d.kart}) ${d.tarih} tarihli ekstresinde yansıtılan kart aidatının 6502 sayılı Tüketicinin Korunması Hakkında Kanun gereği iadesini talep ediyorum. Aksi halde yasal haklarımı kullanacağımı bildiririm.

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

${d.hesapNo} numaralı hesabımın (${d.iban || "IBAN belirtilmedi"}) kapatılarak varsa bakiyenin tercih ettiğim hesaba aktarılmasını talep ederim. İşlemin tamamlandığına ilişkin yazılı bilgi rica ederim.

Tarih: ${d.tarih}
Gereğini arz ederim.`,
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

Yeni adresim ${d.adres} olup bilgilerin resmi kayıtlara işlenmesini ve tarafıma teyit verilmesini arz ederim.

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

Kimlik kartımı ${d.kayipYeri || "ilgili bölgede"} ${d.tarih} tarihinde kaybettim. Yeniden düzenlenmesi ve kötüye kullanıma karşı kaydın yapılmasını arz ederim.

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

İşlem ve başvurularımda kullanılmak üzere vukuatlı nüfus kayıt örneğimin tarafıma verilmesini arz ederim.

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

${d.aciklama || "Resmi işlemlerimde"} kullanılmak üzere adli sicil kaydımın düzenlenmesini arz ederim.

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

Öğrenciniz olarak ${d.aciklama || "resmi işlemlerimde"} kullanılmak üzere öğrenci belgesi talep ediyorum.

Ad Soyad: ${d.ad} ${d.soyad}
Öğrenci No: ${d.ogrNo}
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
    templateText: (d) => `Sayın ${d.kurumAdi},

Askerlik durum belgemin resmi işlemlerde kullanılmak üzere tarafıma verilmesini arz ederim.

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

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında mazeret izni kullanmam gerekmektedir. Gerekçem: ${d.aciklama}. Görev devri yapılmış olup iletişim bilgilerim günceldir.

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

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında yıllık izin kullanmak istiyorum. İşlerimin devri tamamlanmış olup ihtiyaç halinde ulaşılabilirim.

${d.aciklama ? `Not: ${d.aciklama}` : ""}

Saygılarımla.`,
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

${d.donem || "ilgili dönemde"} gerçekleştirdiğim toplam ${d.mesai || "belirtilen"} saat fazla mesai karşılığının 4857 sayılı İş Kanunu gereğince ödenmesini arz ederim.

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

Görevimin ${d.yeniYer} lokasyonunda sürdürülmesini talep ediyorum. Gerekçem: ${d.aciklama}. Uygun görülmesi halinde devir planını ivedilikle paylaşacağım.

Saygılarımla.`,
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
      { question: "IBAN", key: "iban", type: "text", placeholder: "Örn: TR00 ..." },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

${d.adres} adresindeki kiralık mülkte sözleşmemiz ${d.tarih} tarihinde sona ermiştir. Taşınmazı hasarsız teslim ettiğimden depozito bedelimin ${d.iban || "bildireceğim IBAN"} hesabına iadesini talep ederim.

Gereğini arz ederim.`,
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
    templateText: (d) => `Sayın ${d.kurumAdi},

${d.adres} adresindeki kira sözleşmem için bildirilen ${d.zam}% artış oranı, ${d.ustSinir || "güncel TÜFE"}% yasal sınırın üzerindedir. Kiranın mevzuata uygun şekilde güncellenmesini talep ederim.

Tarih: ${d.tarih}
Saygılarımla.`,
  },
  {
    id: "haksiz-tahliye",
    title: "Haksız Tahliye Uyarısı",
    category: "Kira & Konut",
    description: "Haksız tahliye girişimine karşı resmi uyarı.",
    steps: [
      { question: "Ad", key: "ad", required: true },
      { question: "Soyad", key: "soyad", required: true },
      { question: "Ev Sahibi", key: "kurumAdi", required: true },
      { question: "Adres (Kiralık Yer)", key: "adres", type: "textarea", required: true },
      { question: "Tarih", key: "tarih", type: "date", required: true },
      { question: "Gerekçe", key: "aciklama", type: "textarea", required: true },
    ],
    templateText: (d) => `Sayın ${d.kurumAdi},

${d.adres} adresindeki konutta kiracılık haklarım devam etmektedir. ${d.aciklama}. Haksız tahliye girişiminin durdurulmasını, aksi halde tüm yasal haklarımı kullanacağımı bildiririm.

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

İkametgah belgemin ${d.aciklama || "resmi işlemlerimde"} kullanılmak üzere tarafıma verilmesini arz ederim.

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}
Adres: ${d.adres}
Telefon: ${d.telefon || "-"}
E-posta: ${d.email || "-"}`,
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

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında izinli sayılmak istiyorum. ${d.aciklama ? `Gerekçem: ${d.aciklama}.` : ""} İzin süresince ${d.adres || "bildireceğim"} adreste bulunacağım ve ${d.telefon || "güncel"} iletişim numarasından ulaşılabilirim.

Saygılarımla.`,
  },
];
