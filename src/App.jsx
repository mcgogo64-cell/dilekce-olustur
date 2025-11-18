import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Download, FileText, Loader2, Mail, Package } from "lucide-react";
import jsPDF from "jspdf";

/*
  CONFIG: Yeni dilekçe eklemek için sadece templates array'ine yeni obje ekleyin.
  Şema:
  {
    id: "benzersiz-id",
    title: "Görünen Başlık",
    description: "Kısa açıklama",
    inputs: [
      { name, label, type?, placeholder?, required? }
    ],
    buildBody: (formData) => "Dilekçe metni"
  }
*/
const templates = [
  {
    id: "ikametgah",
    title: "İkametgah Belgesi Talebi",
    description: "Nüfus Müdürlüğü / e-Devlet çıktı talebi",
    inputs: [
      { name: "ad", label: "Ad", required: true, placeholder: "Adınız" },
      { name: "soyad", label: "Soyad", required: true, placeholder: "Soyadınız" },
      { name: "tckn", label: "TCKN", required: true, placeholder: "11 haneli TCKN" },
      { name: "adres", label: "Adres", required: true, placeholder: "Güncel ikamet adresiniz" },
      { name: "kurumAdi", label: "Kurum Adı", required: true, placeholder: "Talep edilen kurum/birim" },
      { name: "tarih", label: "Tarih", type: "date", required: true },
      { name: "aciklama", label: "Açıklama", type: "textarea", placeholder: "Ek notlar (opsiyonel)" },
    ],
    buildBody: (d) =>
      `Sayın ${d.kurumAdi},

İkametgah belgemin ${d.kurumAdi} nezdindeki işlemlerimde kullanılmak üzere tarafıma verilmesini arz ederim.

Kimlik Bilgileri:
- Ad Soyad: ${d.ad} ${d.soyad}
- TCKN: ${d.tckn}
- Adres: ${d.adres}

${d.aciklama || "Ek açıklama bulunmamaktadır."}

Gereğini arz ederim.`,
  },
  {
    id: "abonelik-iptal",
    title: "Abonelik İptali",
    description: "Fatura/abonelik sonlandırma",
    inputs: [
      { name: "ad", label: "Ad", required: true },
      { name: "soyad", label: "Soyad", required: true },
      { name: "tckn", label: "TCKN", required: true },
      { name: "hizmetSaglayici", label: "Hizmet Sağlayıcı", required: true, placeholder: "Örn: X Telekom" },
      { name: "musteriNo", label: "Müşteri No", required: true },
      { name: "adres", label: "Adres", placeholder: "Fatura adresi / ikamet" },
      { name: "tarih", label: "Tarih", type: "date", required: true },
      { name: "aciklama", label: "Açıklama", type: "textarea", placeholder: "Modem iadesi, cayma bedeli vb." },
    ],
    buildBody: (d) =>
      `${d.hizmetSaglayici} Müşteri Hizmetleri'ne,

${d.musteriNo} numaralı aboneliğimin hiçbir ek ücret tahakkuk ettirilmeden ${d.tarih} tarihi itibarıyla sonlandırılmasını talep ederim. Kullanıma kapatma ve fatura kesiminin durdurulmasını arz ederim.

${d.aciklama || "Ek açıklama: Yok."}

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}`,
  },
  {
    id: "izin-talebi",
    title: "Resmi İzin Talebi",
    description: "Kurum içi izin dilekçesi",
    inputs: [
      { name: "ad", label: "Ad", required: true },
      { name: "soyad", label: "Soyad", required: true },
      { name: "tckn", label: "TCKN", required: true },
      { name: "kurumAdi", label: "Kurum/Kompani", required: true },
      { name: "izinBaslangic", label: "İzin Başlangıç", type: "date", required: true },
      { name: "izinBitis", label: "İzin Bitiş", type: "date", required: true },
      { name: "adres", label: "Adres", placeholder: "Ofis adresi / ikamet" },
      { name: "tarih", label: "Dilekçe Tarihi", type: "date", required: true },
      { name: "aciklama", label: "Açıklama", type: "textarea", placeholder: "İzin gerekçesi" },
    ],
    buildBody: (d) =>
      `${d.kurumAdi} İnsan Kaynakları'na,

${d.izinBaslangic} - ${d.izinBitis} tarihleri arasında izinli sayılmak istiyorum. İzin süresince görevlerimi devretmiş bulunmaktayım.

Gerekçe: ${d.aciklama || "Belirtilmedi."}

Ad Soyad: ${d.ad} ${d.soyad}
TCKN: ${d.tckn}`,
  },
];

const defaultForm = (template) =>
  template?.inputs.reduce((acc, field) => {
    if (field.type === "date") {
      acc[field.name] = new Date().toISOString().slice(0, 10);
    } else {
      acc[field.name] = "";
    }
    return acc;
  }, {}) || {};

const formatDate = (val) => (val ? new Date(val).toLocaleDateString("tr-TR") : "");

const createLetterPdf = (template, data) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  // Varsayılan font Times; Türkçe karakter için Windows Latin-1 kapsıyor.
  doc.setFont("Times", "Roman");
  doc.setFontSize(12);

  doc.text(`Tarih: ${formatDate(data.tarih)}`, 170, 20, { align: "right" });
  doc.text(`Konu: ${template.title}`, 20, 30);

  const body = template.buildBody(data);
  const lines = doc.splitTextToSize(body, 170);
  doc.text(lines, 20, 45);

  doc.text("İmza:", 20, 250);
  doc.text(`${data.ad || ""} ${data.soyad || ""}`, 20, 258);
  doc.save(`${template.id}-dilekce.pdf`);
};

const createEnvelopePdf = (data) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFont("Times", "Roman");
  doc.setFontSize(14);

  const alici = data.kurumAdi || data.hizmetSaglayici || "Kurum / Alıcı";
  const adres = data.adres || "Adres bilgisi";

  // Sol üst: Gönderici
  doc.rect(10, 10, 90, 60);
  doc.text("Gönderici", 15, 20);
  doc.text(`${data.ad || ""} ${data.soyad || ""}`, 15, 30);
  doc.text(`Adres: ${adres}`, 15, 40);

  // Sağ alt: Alıcı
  doc.rect(110, 90, 90, 80);
  doc.text("Alıcı", 115, 100);
  doc.text(alici, 115, 110);
  doc.text(adres, 115, 120);
  doc.save("zarf-etiketi.pdf");
};

const createCargoPdf = (data) => {
  const doc = new jsPDF({ unit: "mm", format: [100, 150] }); // Dikey etiket
  doc.setFont("Times", "Roman");
  doc.setFontSize(16);
  doc.text("PTT Kargo Gönderi Etiketi", 50, 12, { align: "center" });

  doc.setFontSize(12);
  const alici = data.kurumAdi || data.hizmetSaglayici || "Kurum / Alıcı";
  const adres = data.adres || "Adres bilgisi";

  doc.rect(10, 20, 80, 40);
  doc.text("Gönderici", 12, 28);
  doc.text(`${data.ad || ""} ${data.soyad || ""}`, 12, 36);
  doc.text(`Adres: ${adres}`, 12, 44);

  doc.rect(10, 65, 80, 50);
  doc.text("Alıcı", 12, 73);
  doc.text(alici, 12, 81);
  doc.text(adres, 12, 89);

  doc.text("İçerik: Resmi Evrak", 12, 122);
  doc.save("ptt-etiket.pdf");
};

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);

  const selectedTemplate = useMemo(() => templates.find((t) => t.id === selectedId), [selectedId]);

  useEffect(() => {
    if (selectedTemplate) {
      setFormData(defaultForm(selectedTemplate));
      setShowDownloads(false);
    }
  }, [selectedTemplate]);

  const handleInput = (name, value) => setFormData((prev) => ({ ...prev, [name]: value }));

  const handleCreate = () => {
    if (!selectedTemplate) return;
    setIsLoading(true);
    setShowDownloads(false);
    // 3-5 sn bekleme: reklam alanı
    setTimeout(() => {
      setIsLoading(false);
      setShowDownloads(true);
    }, 3500);
  };

  const renderPreview = () => {
    if (!selectedTemplate) return null;
    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <FileText className="h-4 w-4" />
          Canlı Önizleme
        </div>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
          {selectedTemplate.buildBody(formData)}
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white font-semibold">
            DP
          </div>
          <div>
            <p className="text-lg font-semibold text-slate-900">DilekcePro</p>
            <p className="text-sm text-slate-500">30 Saniyede Dilekçen Hazır</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          Güvenli & Kurumsal
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16">
        <section className="mb-8">
          <h1 className="text-2xl font-semibold text-slate-900">Dilekçe Türü Seçin</h1>
          <p className="text-sm text-slate-500">Kategoriler içinden seçim yapın, form otomatik gelsin.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {templates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedId(tpl.id)}
                className={`rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                  selectedId === tpl.id ? "border-blue-500 bg-white" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-slate-900">{tpl.title}</p>
                  <Download className="h-4 w-4 text-blue-600" />
                </div>
                <p className="mt-2 text-sm text-slate-500">{tpl.description}</p>
              </button>
            ))}
          </div>
        </section>

        {selectedTemplate && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">{selectedTemplate.title}</h2>
                <p className="text-sm text-slate-500">Zorunlu alanlar * ile işaretli.</p>
              </div>
              <button
                onClick={handleCreate}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700 md:mt-0"
              >
                <FileText className="mr-2 h-4 w-4" />
                Dilekçeyi Oluştur
              </button>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {selectedTemplate.inputs.map((field) => (
                <div key={field.name} className="flex flex-col gap-1">
                  <label className="text-sm font-medium text-slate-700">
                    {field.label} {field.required && "*"}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInput(field.name, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                      placeholder={field.placeholder}
                      rows={3}
                    />
                  ) : (
                    <input
                      type={field.type || "text"}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleInput(field.name, e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
            </div>

            {renderPreview()}

            {showDownloads && (
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <button
                  onClick={() => createLetterPdf(selectedTemplate, formData)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-blue-600 px-3 py-3 text-white shadow-sm transition hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Dilekçeyi İndir (A4 PDF)
                </button>
                <button
                  onClick={() => createEnvelopePdf(formData)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  Zarf Etiketi İndir
                </button>
                <button
                  onClick={() => createCargoPdf(formData)}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Package className="h-4 w-4 text-blue-600" />
                  PTT Kargo Etiketi
                </button>
              </div>
            )}
          </section>
        )}
      </main>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-blue-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="font-semibold">Hazırlanıyor...</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">
              PDF üretilmeden önce kısa bir bekleme. Reklam alanı için ideal.
            </p>
            <div className="mt-4 flex h-24 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
              Reklam Alanı (Placeholder)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
