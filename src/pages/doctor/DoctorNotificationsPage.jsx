import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import DoctorStatusBadge from '../../components/doctor/DoctorStatusBadge'
import EmptyState from '../../components/shared/EmptyState'
import { doctorDemoNotifications } from '../../data/doctorDemoData'

export default function DoctorNotificationsPage() {
  const [notifications, setNotifications] = useState(doctorDemoNotifications)
  const unread = useMemo(() => notifications.filter((item) => !item.read), [notifications])
  const read = useMemo(() => notifications.filter((item) => item.read), [notifications])

  function markAsRead(id) {
    setNotifications((current) => current.map((item) => (
      item.id === id ? { ...item, read: true } : item
    )))
  }

  function renderNotification(item) {
    return (
      <article
        className={[
          'rounded-[24px] border bg-white p-5 shadow-[0_16px_42px_rgba(19,59,38,0.09),0_2px_8px_rgba(19,59,38,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_54px_rgba(19,59,38,0.13),0_4px_12px_rgba(19,59,38,0.06)]',
          item.read ? 'border-[#E7EFE4]' : 'border-[#D8EDAC] ring-2 ring-brand-green/10',
        ].join(' ')}
        key={item.id}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap gap-2">
              <DoctorStatusBadge status={item.read ? 'RESOLVED' : 'NEW'} />
              {!item.read ? (
                <span className="inline-flex rounded-full bg-[#FFF7D6] px-3 py-1 text-xs font-bold text-[#725300]">
                  Belum dibaca
                </span>
              ) : null}
            </div>
            <h3 className="mt-4 text-lg font-bold text-primary-dark">{item.title}</h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{item.body}</p>
            <p className="mt-2 text-xs font-semibold text-gray-500">{item.timestamp}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-2 md:w-44">
            <Link className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand-lime px-4 py-2 text-sm font-bold text-primary-dark" to={item.to}>
              Buka
            </Link>
            {!item.read ? (
              <button className="min-h-11 rounded-xl border border-standard-border bg-white px-4 py-2 text-sm font-bold text-primary-dark hover:bg-brand-soft" onClick={() => markAsRead(item.id)} type="button">
                Tandai dibaca
              </button>
            ) : null}
          </div>
        </div>
      </article>
    )
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <header className="rounded-[28px] border border-[#E7EFE4] bg-gradient-to-br from-white to-[#F8FCEF] p-6 shadow-[0_18px_48px_rgba(19,59,38,0.10),0_2px_8px_rgba(19,59,38,0.04)] md:p-8">
        <span className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-xs font-extrabold uppercase tracking-[0.18em] text-brand-green">
          Inbox dokter
        </span>
        <h1 className="mt-4 text-3xl font-extrabold text-primary-dark">Notifikasi dokter</h1>
        <p className="mt-3 max-w-2xl leading-7 text-gray-600">
          Update kasus, chat, kunjungan, jadwal, dan status verifikasi tanpa menampilkan detail medis sensitif berlebihan.
        </p>
      </header>

      {notifications.length === 0 ? (
        <EmptyState
          description="Belum ada update kasus, chat, atau kunjungan untuk akun dokter ini."
          title="Belum ada notifikasi"
        />
      ) : (
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-primary-dark">Belum dibaca</h2>
            {unread.length > 0 ? unread.map(renderNotification) : (
              <p className="rounded-2xl border border-standard-border bg-white p-4 text-sm text-gray-600">Semua notifikasi sudah dibaca.</p>
            )}
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-primary-dark">Sudah dibaca</h2>
            {read.map(renderNotification)}
          </section>
        </div>
      )}
    </div>
  )
}
