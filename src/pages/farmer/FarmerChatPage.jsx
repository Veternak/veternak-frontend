import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getConsultationById, getChatHistory } from "../../services/farmerCoreService";
import { useChatSocket } from "../../services/socket";

export default function FarmerChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const chatBottomRef = useRef(null);

  // Fetch consultation and history
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError("");

    Promise.all([
      getConsultationById(id),
      getChatHistory(id)
    ])
      .then(([consultRes, chatRes]) => {
        if (!isMounted) return;
        const consultData = consultRes?.data?.consultation || consultRes?.consultation || consultRes;
        
        // If PENDING, must pay first
        if (consultData?.status === "PENDING") {
          navigate(`/peternak/konsultasi/${id}/pembayaran`);
          return;
        }

        setConsultation(consultData);
        setMessages(chatRes?.data?.messages || chatRes || []);
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || "Gagal memuat konsultasi.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  // Scroll to bottom on new messages
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle socket incoming message
  const handleIncomingMessage = useCallback((message) => {
    setMessages((current) => {
      if (current.some((m) => m.id === message.id)) return current;
      return [...current, message];
    });
  }, []);

  const { isConnected, sendMessage } = useChatSocket(id, handleIncomingMessage);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;

    sendMessage(draft.trim());
    setDraft("");
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-md p-8 text-center bg-white border border-gray-100 rounded-3xl shadow-sm my-12">
        <p className="text-sm font-semibold text-gray-500">Menghubungkan ke ruang chat...</p>
      </div>
    );
  }

  if (error || !consultation) {
    return (
      <div className="mx-auto max-w-md p-8 text-center bg-white border border-gray-100 rounded-3xl shadow-sm my-12">
        <h2 className="text-xl font-bold text-primary-dark mb-3">Konsultasi Tidak Ditemukan</h2>
        <p className="text-sm text-gray-600 mb-6">{error || "Data ruang chat tidak valid."}</p>
        <button
          onClick={() => navigate("/peternak/konsultasi")}
          className="bg-brand-green text-white px-5 py-2.5 rounded-xl font-bold text-sm"
        >
          Kembali ke Konsultasi
        </button>
      </div>
    );
  }

  const vet = consultation.vet || {};
  const animal = consultation.animal || {};

  return (
    <div className="mx-auto grid max-w-6xl gap-6 xl:grid-cols-[1.45fr_0.85fr] pb-10 animate-fade-in">
      {/* Chat Area */}
      <section className="rounded-[32px] border border-[#E5EAE6] bg-white p-5 shadow-sm md:p-6 flex flex-col min-h-[580px]">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between border-b border-[#E5EAE6] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`inline-flex h-2.5 w-2.5 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
              <span className="text-xs font-bold text-gray-500">
                {isConnected ? "Terhubung" : "Menghubungkan..."}
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold text-primary-dark">Sesi Chat {vet.name}</h1>
            <p className="text-xs text-[#69736C]">Konsultasi untuk hewan: <span className="font-bold text-brand-green">{animal.name} ({animal.species})</span></p>
          </div>
          <Link
            to="/peternak/konsultasi"
            className="text-xs font-bold text-brand-green border border-[#E5EAE6] px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
          >
            ← Kembali
          </Link>
        </div>

        {/* Message Flow */}
        <div className="mt-6 flex-1 space-y-4 rounded-[24px] bg-neutral-bg p-4 overflow-y-auto max-h-[380px] min-h-[300px]">
          {messages.length === 0 ? (
            <p className="text-center text-xs font-semibold text-gray-400 py-12">
              Belum ada percakapan. Kirim pesan pertama Anda di bawah untuk memulai konsultasi.
            </p>
          ) : (
            messages.map((message) => {
              const isFarmer = message.senderRole === "FARMER";
              const isSystem = message.senderRole === "SYSTEM";

              return (
                <div
                  key={message.id || Math.random()}
                  className={[
                    "max-w-[80%] rounded-2xl p-4 text-sm leading-relaxed shadow-xs",
                    isFarmer ? "ml-auto bg-brand-green text-white" : "",
                    isSystem ? "mx-auto border border-standard-border bg-white text-primary-dark text-xs" : "",
                    !isFarmer && !isSystem ? "bg-white border border-gray-100 text-primary-dark" : "",
                  ].join(" ")}
                >
                  {!isSystem && (
                    <p className="font-bold text-[10px] opacity-75 mb-0.5">
                      {isFarmer ? "Anda" : vet.name}
                    </p>
                  )}
                  <p className="font-medium">{message.message || message.body}</p>
                  <p className="mt-1.5 text-[9px] opacity-70 text-right">
                    {new Date(message.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              );
            })
          )}
          <div ref={chatBottomRef} />
        </div>

        {/* Form Input */}
        <form className="mt-5 flex gap-3 items-center" onSubmit={handleSend}>
          <label className="sr-only" htmlFor="chat-input-farmer">Pesan</label>
          <input
            id="chat-input-farmer"
            type="text"
            className="flex-1 min-h-[48px] rounded-xl border border-[#D4DCD6] px-4 text-sm font-semibold outline-none focus:border-brand-green focus:ring-4 focus:ring-[#D8EDAC] transition-all"
            placeholder="Ketik pesan Anda disini..."
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
          <button
            type="submit"
            disabled={!draft.trim()}
            className="min-h-[48px] rounded-xl bg-brand-lime px-6 text-sm font-bold text-primary-dark hover:scale-105 active:scale-95 transition-all shadow-md disabled:opacity-60 disabled:scale-100"
          >
            Kirim
          </button>
        </form>
      </section>

      {/* Info Sidebar */}
      <aside className="space-y-6">
        <div className="rounded-[2.5rem] border border-[#E5EAE6] bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-primary-dark mb-4">Informasi Laporan</h2>
          <div className="space-y-3 text-sm">
            <div className="p-3 bg-neutral-bg rounded-xl">
              <span className="text-xs text-[#8D978F] font-bold block">Status Ruangan</span>
              <span className="font-bold text-brand-green mt-1 block">Aktif (Sudah Dibayar)</span>
            </div>
            <div className="p-3 bg-neutral-bg rounded-xl">
              <span className="text-xs text-[#8D978F] font-bold block">Hasil Diagnosis Awal AI</span>
              <p className="text-xs leading-relaxed text-[#505B53] mt-1.5 font-medium whitespace-pre-wrap">
                {consultation.aiDiagnosisSummary || "Tidak ada detail diagnosis awal."}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
