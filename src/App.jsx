import React, { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Loader2, Mail, Package, Sparkles, Eye, ChevronRight } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { petitions } from "./petitionConfig";
import dejavuBase64 from "./fonts/dejavuBase64.txt?raw";

const STORAGE_KEY = "dilekcepro_state_v1";

const loadState = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {};
  } catch (e) {
    return {};
  }
};

const saveState = (payload) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    // ignore storage errors
  }
};

const formatDate = (val) => (val ? new Date(val).toLocaleDateString("tr-TR") : "");

const ensureDejavu = (doc) => {
  // Embed DejaVuSans to avoid bozuk karakter aralığı ve Türkçe sorunları
  doc.addFileToVFS("DejaVuSans.ttf", dejavuBase64);
  doc.addFont("DejaVuSans.ttf", "DejaVuSans", "normal");
  doc.setFont("DejaVuSans", "normal");
};

const buildLetterPdf = (template, data) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  ensureDejavu(doc);
  doc.setFontSize(11);
  doc.setTextColor(30, 36, 45);
  doc.setLineHeightFactor(1.35);

  doc.text(`Tarih: ${formatDate(data.tarih)}`, 170, 20, { align: "right" });
  doc.text(`Konu: ${template.title}`, 20, 32);

  autoTable(doc, {
    head: [["Alan", "Bilgi"]],
    body: [
      ["Ad Soyad", `${data.ad || ""} ${data.soyad || ""}`.trim()],
      ["TCKN", data.tckn || "-"],
      ["Adres", data.adres || "-"],
      ["Kurum", data.kurumAdi || data.kurum || "-"],
      ["Telefon", data.telefon || "-"],
      ["E-posta", data.email || "-"],
    ],
    startY: 42,
    styles: { font: "DejaVuSans", fontStyle: "normal", fontSize: 10, textColor: [30, 36, 45], lineColor: [230, 235, 242] },
    headStyles: { fillColor: [59, 130, 246], textColor: 255, fontStyle: "bold" },
    alternateRowStyles: { fillColor: [245, 247, 250] },
    columnStyles: { 0: { cellWidth: 45 }, 1: { cellWidth: 125 } },
  });

  const bodyStart = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 60;
  const body = template.templateText(data);
  const lines = doc.splitTextToSize(body, 170);
  doc.text(lines, 20, bodyStart, { lineHeightFactor: 1.35 });

  doc.text("İmza:", 20, 270);
  doc.text(`${data.ad || ""} ${data.soyad || ""}`, 20, 278);
  doc.save(`${template.id}-dilekce.pdf`);
};

const buildEnvelopePdf = (data) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  ensureDejavu(doc);
  doc.setFontSize(13);

  const alici = data.alici || data.kurumAdi || data.kurum || "Kurum / Alıcı";
  const adres = data.aliciAdres || data.adres || "Adres bilgisi";
  const senderName = `${data.ad || ""} ${data.soyad || ""}`.trim() || "Ad Soyad";

  // Gönderici kutusu (sol üst)
  doc.rect(20, 30, 100, 55);
  doc.text("Gönderici", 25, 40);
  doc.setFontSize(12);
  doc.text(senderName, 25, 48);
  doc.text(`Adres: ${data.adres || "Adres bilgisi"}`, 25, 56);
  if (data.telefon) doc.text(`Tel: ${data.telefon}`, 25, 64);

  // Alıcı kutusu (sağ alt, daha geniş)
  doc.setFontSize(13);
  doc.rect(110, 120, 130, 80);
  doc.text("Alıcı", 115, 132);
  doc.setFontSize(12);
  doc.text(alici, 115, 140);
  doc.text(adres, 115, 148);
  if (data.aliciTelefon) doc.text(`Tel: ${data.aliciTelefon}`, 115, 156);

  doc.save("zarf-etiketi.pdf");
};

const buildCargoPdf = (data) => {
  const doc = new jsPDF({ unit: "mm", format: [100, 150] }); // dikey
  ensureDejavu(doc);
  doc.setFontSize(16);
  doc.text("PTT Kargo Formu", 50, 12, { align: "center" });

  doc.setFontSize(12);
  const alici = data.alici || data.kurumAdi || data.kurum || "Kurum / Alıcı";
  const adres = data.adres || data.aliciAdres || "Adres bilgisi";

  doc.rect(10, 20, 80, 40);
  doc.text("Gönderici", 12, 28);
  doc.text(`${data.ad || ""} ${data.soyad || ""}`.trim() || "Ad Soyad", 12, 36);
  doc.text(`Adres: ${adres}`, 12, 44);
  if (data.telefon) doc.text(`Tel: ${data.telefon}`, 12, 52);

  doc.rect(10, 65, 80, 50);
  doc.text("Alıcı", 12, 73);
  doc.text(alici, 12, 81);
  doc.text(adres, 12, 89);
  if (data.aliciTelefon) doc.text(`Tel: ${data.aliciTelefon}`, 12, 97);

  doc.text("İçerik: Resmi Evrak", 12, 122);
  doc.save("ptt-kargo-etiketi.pdf");
};

const defaultAnswers = (template) =>
  template?.steps.reduce((acc, step) => {
    acc[step.key] = step.type === "date" ? new Date().toISOString().slice(0, 10) : "";
    return acc;
  }, {}) || {};

export default function App() {
  const saved = useMemo(loadState, []);
  const [selectedId, setSelectedId] = useState(saved.selectedId || null);
  const [answers, setAnswers] = useState(saved.answers || {});
  const [stepIndex, setStepIndex] = useState(saved.stepIndex || 0);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const [bannerHidden, setBannerHidden] = useState(saved.bannerHidden || false);
  const [modal, setModal] = useState({ open: false, countdown: 5, action: null });
  const [categoryFilter, setCategoryFilter] = useState("Hepsi");
  const wizardRef = useRef(null);

  const selectedTemplate = useMemo(() => petitions.find((p) => p.id === selectedId), [selectedId]);
  const currentAnswers = useMemo(() => answers[selectedId] || defaultAnswers(selectedTemplate), [answers, selectedId, selectedTemplate]);
  const steps = selectedTemplate?.steps || [];
  const currentStep = steps[stepIndex] || steps[0];
  const categories = useMemo(() => ["Hepsi", ...Array.from(new Set(petitions.map((p) => p.category)))], []);
  const filteredPetitions = useMemo(
    () => petitions.filter((p) => (categoryFilter === "Hepsi" ? true : p.category === categoryFilter)),
    [categoryFilter]
  );

  useEffect(() => {
    saveState({ selectedId, answers, stepIndex, bannerHidden });
  }, [selectedId, answers, stepIndex, bannerHidden]);

  useEffect(() => {
    if (!selectedTemplate) return;
    // Template değişince adımı başa al; form yazarken tetiklenmesin diye yalnızca template/id'ye bak.
    setStepIndex(0);
    setAnswers((prev) => (prev[selectedId] ? prev : { ...prev, [selectedId]: defaultAnswers(selectedTemplate) }));
    requestAnimationFrame(() => {
      wizardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [selectedTemplate, selectedId]);

  useEffect(() => {
    if (!modal.open) return;

    if (modal.countdown <= 0) {
      if (modal.action) {
        modal.action();
      }
      setModal((prev) => ({ ...prev, open: false, action: null }));
      return;
    }

    const timer = setTimeout(() => {
      setModal((prev) => ({ ...prev, countdown: prev.countdown - 1 }));
    }, 1000);

    return () => clearTimeout(timer);
  }, [modal.countdown, modal.open, modal.action]);

  const handleSelect = (id) => {
    setSelectedId(id);
    setShowPreviewMobile(false);
  };

  const updateAnswer = (key, value) => {
    setAnswers((prev) => ({
      ...prev,
      [selectedId]: { ...(prev[selectedId] || {}), [key]: value },
    }));
  };

  const goNext = () => setStepIndex((i) => Math.min(i + 1, steps.length - 1));
  const goPrev = () => setStepIndex((i) => Math.max(i - 1, 0));

  const clearAll = () => {
    setAnswers({});
    setStepIndex(0);
    setShowPreviewMobile(false);
    setBannerHidden(false);
    saveState({});
  };

  const startDownload = (action) => {
    setModal({ open: true, countdown: 5, action });
  };

  const isNextDisabled = currentStep?.required && !currentAnswers?.[currentStep.key];

  const renderInput = (step) => {
    const common = {
      value: currentAnswers?.[step.key] || "",
      onChange: (e) => updateAnswer(step.key, e.target.value),
      className:
        "w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none",
      placeholder: step.placeholder,
      required: step.required,
    };
    if (step.type === "textarea") {
      return <textarea {...common} rows={4} />;
    }
    if (step.type === "date") {
      return <input type="date" {...common} />;
    }
    if (step.type === "select") {
      return (
        <select {...common}>
          <option value="">Seçiniz</option>
          {(step.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
    }
    return <input type="text" {...common} />;
  };

  const renderPreview = () => {
    if (!selectedTemplate) return null;
    return (
      <div className="rounded-xl border border-slate-100 bg-white p-6 shadow-lg">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <FileText className="h-4 w-4" />
          Canlı Önizleme
        </div>
        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-800">{selectedTemplate.templateText(currentAnswers)}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen text-slate-900">
      <header className="sticky top-0 z-30 border-b border-white/20 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-lg font-bold shadow-lg shadow-blue-500/20">
              DP
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">DilekcePro</p>
              <p className="text-xs font-medium text-slate-500">30 saniyede dilekçen hazır</p>
            </div>
          </div>
          <div className="hidden items-center gap-2 text-sm font-medium text-slate-600 sm:flex">
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50/50 px-3 py-1 text-emerald-600 ring-1 ring-emerald-500/20">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Üyeliksiz</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        <section>
          <h1 className="text-2xl font-semibold text-slate-900">Dilekçe Türünü Seç</h1>
          <p className="text-sm text-slate-500">İhtiyacınız olan dilekçe türünü seçin, soruları cevaplayın ve resmi evrakınızı saniyeler içinde indirin.</p>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`whitespace-nowrap rounded-full border px-5 py-2 text-sm font-medium transition-all duration-200 ${categoryFilter === cat
                    ? "border-blue-500/20 bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20 ring-offset-2"
                    : "border-slate-200/60 bg-white/50 text-slate-600 hover:bg-white hover:shadow-md"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="mt-4 space-y-3">
            {filteredPetitions.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleSelect(tpl.id)}
                className={`group relative w-full overflow-hidden rounded-2xl border bg-white/60 p-5 text-left shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 ${selectedId === tpl.id ? "border-blue-500 ring-2 ring-blue-500/20" : "border-white/50 hover:border-blue-200"
                  }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {tpl.title}
                      </p>
                      <span className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm shadow-blue-500/20">
                        <Sparkles className="mr-1 h-3 w-3" />
                        AI
                      </span>
                    </div>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-blue-600/80">{tpl.category}</span>
                      <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                      <p className="text-sm text-slate-500">{tpl.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Hemen oluştur
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {selectedTemplate && (
          <section ref={wizardRef} className="mt-10 grid gap-8 lg:grid-cols-2">
            <div className="rounded-3xl border border-white/50 bg-white/80 p-6 shadow-xl shadow-blue-500/5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-blue-600">Adım adım sihirbaz</p>
                  <h2 className="text-xl font-semibold text-slate-900">{selectedTemplate.title}</h2>
                  <p className="text-sm text-slate-500">Soru bazlı ilerleyin, sağda önizleme görün.</p>
                </div>
                <div className="flex flex-col items-end gap-2 text-xs text-slate-500">
                  <span>
                    {stepIndex + 1} / {steps.length}
                  </span>
                  <button
                    onClick={clearAll}
                    className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 shadow-sm transition hover:bg-blue-100 hover:border-blue-300"
                  >
                    Temizle (Tüm Yanıtlar)
                  </button>
                </div>
              </div>

              <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500 ease-out"
                  style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                />
              </div>

              <div className="mt-6 space-y-3">
                <p className="text-sm font-medium text-slate-800">{currentStep?.question}</p>
                {currentStep?.helper && <p className="text-xs text-slate-500">{currentStep.helper}</p>}
                {renderInput(currentStep)}
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={goPrev}
                  disabled={stepIndex === 0}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Geri
                </button>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setShowPreviewMobile((v) => !v)}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 lg:hidden"
                  >
                    <Eye className="h-4 w-4" />
                    Önizleme
                  </button>
                  <button
                    onClick={goNext}
                    disabled={stepIndex >= steps.length - 1 || isNextDisabled}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    İleri
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <button
                  onClick={() => startDownload(() => buildLetterPdf(selectedTemplate, currentAnswers))}
                  className="flex items-center justify-center gap-2 rounded-xl border border-transparent bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-blue-500/25 transition-all hover:shadow-blue-500/40 hover:brightness-110"
                >
                  <Download className="h-4 w-4" />
                  Dilekçeyi İndir (PDF)
                </button>
                <button
                  onClick={() => startDownload(() => buildEnvelopePdf(currentAnswers))}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  Zarf Etiketi
                </button>
                <button
                  onClick={() => startDownload(() => buildCargoPdf(currentAnswers))}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3 text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Package className="h-4 w-4 text-blue-600" />
                  PTT Kargo Formu
                </button>
              </div>
            </div>

            <div className={`space-y-3 ${showPreviewMobile ? "block" : "hidden"} lg:block`}>
              {renderPreview()}
              <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-sm font-semibold text-slate-700">Oto-kayıt</p>
                <p className="text-xs text-slate-500">
                  Yanıtlarınız tarayıcınızda saklanır (localStorage). Üyelik yok, veri dışarı çıkmaz.
                </p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="mx-auto max-w-5xl px-4 pb-10 text-center text-xs text-slate-500">
        <p>Verileriniz kaydedilmez. PDF’ler tarayıcınızda, cihazınızda oluşturulur.</p>
      </footer>

      {!bannerHidden && (
        <div className="fixed bottom-4 left-1/2 z-40 w-[95%] max-w-3xl -translate-x-1/2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Bu hizmet ücretsizdir ve reklamlarla desteklenmektedir.</span>
            </div>
            <button
              onClick={() => setBannerHidden(true)}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      {modal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
          <div className="w-[90%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-3 text-blue-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="font-semibold">Dilekçeniz hazırlanıyor...</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">İndirme otomatik başlayacak. Lütfen {modal.countdown} saniye bekleyin.</p>
            <div className="mt-4 flex h-24 items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 text-sm text-slate-400">
              REKLAM ALANI (Google Ads)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







