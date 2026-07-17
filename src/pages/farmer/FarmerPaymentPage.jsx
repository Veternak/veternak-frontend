import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getConsultationById, payTransaction, cancelConsultation } from "../../services/farmerCoreService";

function ProfileAvatarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-8 w-8 text-brand-green" aria-hidden="true">
      <path
        d="M12 12.2a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M4.5 19.5c1.7-3.2 4.4-4.8 7.5-4.8s5.8 1.6 7.5 4.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.18" strokeWidth="1.2" />
    </svg>
  );
}

export default function FarmerPaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [consultation, setConsultation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("qris");

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError("");

    getConsultationById(id)
      .then((res) => {
        if (!isMounted) return;
        const data = res?.data?.consultation || res?.consultation;
        setConsultation(data);
        
        // If already paid, direct straight to chat
        const pendingTx = data?.transactions?.find(tx => tx.status === "PENDING");
        if (!pendingTx && data?.status !== "PENDING") {
          navigate(`/peternak/konsultasi/${id}`);
        }
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || "Gagal memuat detail pembayaran.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id, navigate]);

  const handlePayment = async () => {
    const pendingTx = consultation?.transactions?.find(tx => tx.status === "PENDING");
    if (!pendingTx) {
      alert("Tidak ada transaksi pending ditemukan.");
      return;
    }

    setIsPaying(true);
    setError("");
    try {
      await payTransaction(pendingTx.id);
      alert("Pembayaran Berhasil! Mengalihkan ke ruang chat...");
      navigate(`/peternak/konsultasi/${id}`);
    } catch (err) {
      setError(err?.message || "Pembayaran gagal. Silakan coba lagi.");
    } finally {
      setIsPaying(false);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Apakah Anda yakin ingin membatalkan pesanan konsultasi ini?")) return;
    setIsPaying(true);
    setError("");
    try {
      await cancelConsultation(id);
      alert("Konsultasi berhasil dibatalkan.");
      navigate("/peternak/konsultasi");
    } catch (err) {
      setError(err?.message || "Gagal membatalkan konsultasi.");
    } finally {
      setIsPaying(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-md p-8 text-center bg-white border border-gray-100 rounded-3xl shadow-sm my-12">
        <p className="text-sm font-semibold text-gray-500">Memproses informasi tagihan...</p>
      </div>
    );
  }

  if (error || !consultation) {
    return (
      <div className="mx-auto max-w-md p-8 text-center bg-white border border-gray-100 rounded-3xl shadow-sm my-12">
        <h2 className="text-xl font-bold text-primary-dark mb-3">Tagihan Tidak Ditemukan</h2>
        <p className="text-sm text-gray-600 mb-6">{error || "Data pembayaran tidak valid."}</p>
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
  const pendingTx = consultation.transactions?.find(tx => tx.status === "PENDING") || {};
  const amount = pendingTx.amount || vet.chatPrice || 35000;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 animate-fade-in">
      <div className="mb-6">
        <button
          onClick={() => navigate("/peternak/konsultasi")}
          className="text-sm font-bold text-brand-green flex items-center gap-2"
        >
          ← Batal & Kembali
        </button>
      </div>

      <div className="rounded-[2.5rem] border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-green mb-2">Checkout Konsultasi</p>
        <h1 className="text-2xl md:text-3xl font-extrabold text-primary-dark mb-6">Pembayaran Sederhana</h1>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Tagihan Summary */}
          <div className="space-y-6">
            <div className="rounded-2xl bg-neutral-bg p-5 border border-gray-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Detail Dokter</h3>
              <div className="flex gap-4 items-center">
                {vet.profilePicture ? (
                  <img
                    src={vet.profilePicture}
                    alt={vet.name}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                ) : (
                  <div className="h-16 w-16 rounded-xl bg-neutral-bg border border-[#E5EAE6] flex items-center justify-center">
                    <ProfileAvatarIcon />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-primary-dark">{vet.name}</h4>
                  <p className="text-xs text-[#69736C]">{vet.experienceYears || 0} Tahun Pengalaman</p>
                  <p className="mt-1 text-xs font-bold text-brand-green">★ {vet.rating || "4.8"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-brand-soft/20 p-5 border border-brand-green/10">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-green mb-3">Rincian Pembayaran</h3>
              <div className="flex justify-between text-sm py-2 border-b border-brand-green/5 text-gray-600">
                <span>Biaya Konsultasi Chat</span>
                <span className="font-semibold text-primary-dark">Rp {Number(amount).toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-sm py-2 border-b border-brand-green/5 text-gray-600">
                <span>Biaya Layanan</span>
                <span className="font-semibold text-primary-dark">Rp 0</span>
              </div>
              <div className="flex justify-between text-base py-3 font-bold text-primary-dark">
                <span>Total Bayar</span>
                <span className="text-brand-green text-lg">Rp {Number(amount).toLocaleString("id-ID")}</span>
              </div>
            </div>
          </div>

          {/* Metode Pembayaran */}
          <div className="space-y-5">
            <div>
              <label className="text-sm font-bold text-primary-dark block mb-3">Pilih Metode Pembayaran</label>
              <div className="grid gap-2">
                {[
                  { id: "qris", name: "QRIS (Gopay, OVO, ShopeePay)", desc: "Proses Instan & Otomatis" },
                  { id: "va", name: "Virtual Account Mandiri/BCA", desc: "Dicek otomatis dalam 1 menit" },
                  { id: "tf", name: "Transfer Bank Manual", desc: "Konfirmasi chat manual" }
                ].map(method => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setSelectedMethod(method.id)}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedMethod === method.id 
                        ? "border-brand-green bg-brand-soft" 
                        : "border-[#E5EAE6] bg-white hover:border-[#B7DC72]"
                    }`}
                  >
                    <p className="text-sm font-bold text-primary-dark">{method.name}</p>
                    <p className="text-xs text-[#69736C] mt-0.5">{method.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={isPaying}
              className="w-full min-h-12 bg-brand-lime hover:bg-[#78B916] text-primary-dark font-extrabold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-4"
            >
              {isPaying ? "Memproses Pembayaran..." : "Bayar Sekarang"}
            </button>

            <button
              onClick={handleCancel}
              disabled={isPaying}
              type="button"
              className="w-full min-h-12 bg-white hover:bg-red-50 text-red-600 font-extrabold text-sm rounded-2xl border border-red-200 transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-2"
            >
              Batalkan Konsultasi
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
