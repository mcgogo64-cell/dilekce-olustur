import React, { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, Loader2, Mail, Package, Sparkles, Eye } from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { petitions } from "./petitionConfig";

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

const buildLetterPdf = (template, data) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFont("helvetica", ""); // Built-in font with geniş Latin desteği
  doc.setFontSize(12);

  doc.text(`Tarih: ${formatDate(data.tarih)}`, 190 - 20, 20, { align: "right" });
  doc.text(`Konu: ${template.title}`, 20, 32);

  // Kimlik bilgilerini tablo şeklinde göstermek için autotable
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
    styles: { font: "helvetica", fontSize: 10 },
    headStyles: { fillColor: [59, 130, 246] },
  });

  const bodyStart = doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 60;
  const body = template.templateText(data);
  const lines = doc.splitTextToSize(body, 170);
  doc.text(lines, 20, bodyStart);

  doc.text("İmza:", 20, 270);
  doc.text(`${data.ad || ""} ${data.soyad || ""}`, 20, 278);
  doc.save(`${template.id}-dilekce.pdf`);
};

const buildEnvelopePdf = (data) => {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  doc.setFont("helvetica", "");
  doc.setFontSize(14);

  const alici = data.alici || data.kurumAdi || data.kurum || "Kurum / Alıcı";
  const adres = data.adres || data.aliciAdres || "Adres bilgisi";

  doc.rect(10, 10, 90, 60);
  doc.text("Gönderici", 15, 20);
  doc.text(`${data.ad || ""} ${data.soyad || ""}`.trim() || "Ad Soyad", 15, 30);
  doc.text(`Adres: ${adres}`, 15, 40);
  if (data.telefon) doc.text(`Tel: ${data.telefon}`, 15, 50);

  doc.rect(110, 90, 90, 80);
  doc.text("Alıcı", 115, 100);
  doc.text(alici, 115, 110);
  doc.text(adres, 115, 120);

  doc.save("zarf-etiketi.pdf");
};

const buildCargoPdf = (data) => {
  const doc = new jsPDF({ unit: "mm", format: [100, 150] }); // dikey
  doc.setFont("helvetica", "");
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

  const selectedTemplate = useMemo(() => petitions.find((p) => p.id === selectedId), [selectedId]);
  const currentAnswers = useMemo(() => answers[selectedId] || defaultAnswers(selectedTemplate), [answers, selectedId, selectedTemplate]);
  const steps = selectedTemplate?.steps || [];
  const currentStep = steps[stepIndex] || steps[0];

  useEffect(() => {
    saveState({ selectedId, answers, stepIndex, bannerHidden });
  }, [selectedId, answers, stepIndex, bannerHidden]);

  useEffect(() => {
    if (!selectedTemplate) return;
    // reset step index if template changes
    setStepIndex(0);
    if (!answers[selectedId]) {
      setAnswers((prev) => ({ ...prev, [selectedId]: defaultAnswers(selectedTemplate) }));
    }
  }, [selectedTemplate, selectedId, answers]);

  useEffect(() => {
    if (!modal.open || !modal.action) return;
    setModal((m) => ({ ...m, countdown: 5 }));
    const interval = setInterval(() => {
      setModal((m) => {
        if (m.countdown <= 1) {
          clearInterval(interval);
          m.action();
          return { open: false, countdown: 5, action: null };
        }
        return { ...m, countdown: m.countdown - 1 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [modal.open, modal.action]);

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
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <FileText className="h-4 w-4" />
          Canlı Önizleme
        </div>
        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{selectedTemplate.templateText(currentAnswers)}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 text-slate-900">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white text-lg font-semibold shadow-sm">DP</div>
          <div>
            <p className="text-lg font-semibold text-slate-900">DilekcePro</p>
            <p className="text-sm text-slate-500">30 saniyede dilekçen hazır</p>
          </div>
        </div>
        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          Giriş yok · Üyelik yok
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-24">
        <section>
          <h1 className="text-2xl font-semibold text-slate-900">Dilekçe Türünü Seç</h1>
          <p className="text-sm text-slate-500">Tamamen config ile yönetilir; yeni dilekçe eklemek için sadece JSON listesine ekleme yapın.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {petitions.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => handleSelect(tpl.id)}
                className={`rounded-2xl border p-4 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                  selectedId === tpl.id ? "border-blue-600 bg-white" : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-base font-semibold text-slate-900">{tpl.title}</p>
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-blue-600">{tpl.category}</p>
                <p className="mt-2 text-sm text-slate-500 line-clamp-2">{tpl.description}</p>
              </button>
            ))}
          </div>
        </section>

        {selectedTemplate && (
          <section className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-blue-600">Adım adım sihirbaz</p>
                  <h2 className="text-xl font-semibold text-slate-900">{selectedTemplate.title}</h2>
                  <p className="text-sm text-slate-500">Soru bazlı ilerleyin, sağda önizleme görün.</p>
                </div>
                <div className="text-xs text-slate-500">
                  {stepIndex + 1} / {steps.length}
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all"
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
                    className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    İleri
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid gap-3 md:grid-cols-3">
                <button
                  onClick={() => startDownload(() => buildLetterPdf(selectedTemplate, currentAnswers))}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-blue-600 px-3 py-3 text-white shadow-sm transition hover:bg-blue-700"
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
