import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getConsultationById, getChatHistory, completeConsultation } from "../../services/farmerCoreService";
import { useChatSocket } from "../../services/socket";

const SESSION_DURATION = 3600; // 1 hour in seconds

export default function FarmerChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [sessionTimeLeft, setSessionTimeLeft] = useState(SESSION_DURATION);
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const [hasVetResponded, setHasVetResponded] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
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

  // Detect if vet has responded and start timer
  useEffect(() => {
    if (messages.length > 0 && !hasVetResponded) {
      const vetMessage = messages.find((m) => m.senderRole === "VET");
      if (vetMessage) {
        setHasVetResponded(true);
        setTimerStarted(true);
      }
    }
  }, [messages, hasVetResponded]);

  // Timer countdown effect - only runs if vet has responded
  useEffect(() => {
    if (!timerStarted || isSessionEnded || isLoading) return;

    const interval = setInterval(() => {
      setSessionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsSessionEnded(true);
          handleSessionTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timerStarted, isSessionEnded, isLoading]);

  const handleSessionTimeout = async () => {
    try {
      await completeConsultation(id);
      alert("Waktu sesi chat Anda (1 jam) telah berakhir. Sesi ditutup dan dipindahkan ke riwayat konsultasi.");
      navigate("/peternak/riwayat-konsultasi");
    } catch (err) {
      console.error("Error completing consultation:", err);
      navigate("/peternak/konsultasi");
    }
  };

  const handleEndSession = async () => {
    if (window.confirm("Akhiri sesi chat? Anda tidak akan bisa melanjutkan percakapan setelah ini.")) {
      try {
        setIsSessionEnded(true);
        await completeConsultation(id);
        alert("Sesi chat berhasil diakhiri dan dipindahkan ke riwayat konsultasi.");
        navigate("/peternak/riwayat-konsultasi");
      } catch (err) {
        console.error("Error ending session:", err);
        alert("Gagal mengakhiri sesi: " + (err.message || "Unknown error"));
        setIsSessionEnded(false);
      }
    }
  };

  const formatTimeLeft = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  function MessageBody({ text }) {
    return <p className="mt-1 font-semibold whitespace-pre-wrap">{text}</p>;
  }

  function getMessageRole(message) {
    if (message?.senderRole) return String(message.senderRole).toUpperCase();
    if (message?.vetSenderId) return 'VET';
    if (message?.farmerSenderId) return 'FARMER';
    return 'SYSTEM';
  }

  // Handle socket incoming message
  const handleIncomingMessage = useCallback((message) => {
    setMessages((current) => {
      if (current.some((m) => m.id === message.id)) return current;
      return [...current, message];
    });
  }, []);

  const { isConnected, sendMessage, socketError } = useChatSocket(id, handleIncomingMessage);

  const handleSend = (e) => {
    e.preventDefault();
    if (!draft.trim()) return;

    const sent = sendMessage(draft.trim());
    if (!sent) return;
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
          
          <div className="flex flex-col gap-2 md:items-end">
            {/* Timer Display */}
            <div className={`text-xs font-bold px-3 py-2 rounded-lg ${
              hasVetResponded
                ? sessionTimeLeft <= 300 
                  ? "bg-red-100 text-red-700" 
                  : "bg-blue-100 text-blue-700"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {hasVetResponded 
                ? `Sisa waktu: ${formatTimeLeft(sessionTimeLeft)}`
                : "Menunggu dokter merespon..."}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={handleEndSession}
                className="text-xs font-bold text-red-600 border border-red-300 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Akhiri Sesi
              </button>
              <Link
                to="/peternak/konsultasi"
                className="text-xs font-bold text-brand-green border border-[#E5EAE6] px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors"
              >
                ← Kembali
              </Link>
            </div>
          </div>
        </div>

        {/* Message Flow */}
        <div className="mt-6 flex-1 space-y-4 rounded-[24px] bg-neutral-bg p-4 overflow-y-auto max-h-[380px] min-h-[300px]">
          {messages.length === 0 ? (
            <p className="text-center text-xs font-semibold text-gray-400 py-12">
              Belum ada percakapan. Kirim pesan pertama Anda di bawah untuk memulai konsultasi.
            </p>
          ) : (
            messages.map((message) => {
              const role = getMessageRole(message);
              const isFarmer = role === "FARMER";
              const isSystem = role === "SYSTEM";

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
                  <MessageBody text={message.message || message.body} />
                  <p className="mt-1.5 text-[9px] opacity-70 text-right">
                    {new Date(message.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              );
            })
          )}
          <div ref={chatBottomRef} />
        </div>

        {socketError && (
          <div className="mt-3 rounded-2xl border border-[#F6CACA] bg-[#FDEBEC] p-3 text-sm font-semibold text-[#912525]">
            {socketError}
          </div>
        )}

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
            disabled={!isConnected}
          />
          <button
            type="submit"
            disabled={!isConnected || !draft.trim()}
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
              <span className="text-xs text-[#8D978F] font-bold block mb-1.5">Hasil Diagnosis Awal AI</span>
              <div className="max-h-[220px] overflow-y-auto pr-1">
                <p className="text-xs leading-relaxed text-[#505B53] font-medium whitespace-pre-wrap">
                  {consultation.aiDiagnosisSummary || "Tidak ada detail diagnosis awal."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}
