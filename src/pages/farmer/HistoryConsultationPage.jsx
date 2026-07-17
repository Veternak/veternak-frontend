import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCompletedConsultations } from "../../services/farmerCoreService";

export default function HistoryConsultationPage() {
  const navigate = useNavigate();
  const [historyConsultations, setHistoryConsultations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [uniqueConsultations, setUniqueConsultations] = useState([]);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setError("");

    getCompletedConsultations()
      .then((res) => {
        if (!isMounted) return;
        
        const consultations = res?.data?.consultations || [];
        setHistoryConsultations(consultations);

        // Remove duplicates: keep only latest for each vet
        const vetMap = new Map();
        consultations.forEach((c) => {
          const vetId = c.vet?.id;
          if (vetId) {
            const existing = vetMap.get(vetId);
            if (!existing || new Date(c.createdAt) > new Date(existing.createdAt)) {
              vetMap.set(vetId, c);
            }
          }
        });
        
        setUniqueConsultations(Array.from(vetMap.values()));
      })
      .catch((err) => {
        if (isMounted) setError(err?.message || "Gagal memuat riwayat konsultasi.");
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-neutral-bg px-4 py-8 sm:py-10">
        <section className="mx-auto max-w-7xl">
          <p className="rounded-4xl border border-gray-100 bg-white p-8 text-center text-sm font-semibold text-gray-500 shadow-sm">
            Memuat riwayat konsultasi...
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-neutral-bg px-4 py-8 sm:py-10">
      <section className="mx-auto max-w-7xl pb-10">
        <div className="mb-8 rounded-4xl border border-[#E5EAE6] bg-white p-6 shadow-sm md:p-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-green">Riwayat Konsultasi</p>
          <h1 className="text-3xl font-bold leading-tight text-primary-dark md:text-4xl">Konsultasi yang sudah selesai</h1>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-[#69736C] md:text-base">
            Riwayat lengkap konsultasi dengan dokter hewan yang telah ditutup atau waktu sesinya habis.
          </p>
        </div>

        {error && (
          <p className="rounded-4xl border border-red-100 bg-red-50 p-8 text-center text-sm font-semibold text-red-700 shadow-sm">
            {error}
          </p>
        )}

        {!error && uniqueConsultations.length === 0 && (
          <div className="rounded-4xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
            <h3 className="text-xl font-bold text-primary-dark">Belum ada riwayat konsultasi</h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Semua konsultasi yang selesai atau waktu sesinya habis akan muncul di sini.
            </p>
            <Link
              to="/peternak/konsultasi"
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-xl bg-brand-lime px-5 py-3 text-sm font-bold text-primary-dark"
            >
              Mulai Konsultasi Baru
            </Link>
          </div>
        )}

        {!error && uniqueConsultations.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {uniqueConsultations.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                      Selesai
                    </span>
                    <span className="text-[10px] text-gray-400 font-semibold">
                      {new Date(c.createdAt).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <h4 className="font-bold text-primary-dark text-base">{c.vet?.name || "Dokter Hewan"}</h4>
                  <p className="text-xs text-[#69736C] mt-0.5">
                    Pasien: <span className="font-bold">{c.animal?.name || "Ternak"}</span>
                  </p>
                  <p className="text-xs text-[#69736C] mt-2">
                    Spesialis: Ruminansia
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/peternak/konsultasi/${c.id}`}
                    className="flex-1 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 bg-brand-green hover:bg-brand-green/90 text-white"
                  >
                    Lihat Chat
                  </Link>
                  <Link
                    to={`/peternak/konsultasi/dokter/${c.vet?.id}`}
                    className="px-3 py-2.5 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-colors"
                  >
                    Profil
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/peternak/konsultasi"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-green border border-[#E5EAE6] px-5 py-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            ← Kembali ke Konsultasi Aktif
          </Link>
        </div>
      </section>
    </main>
  );
}
