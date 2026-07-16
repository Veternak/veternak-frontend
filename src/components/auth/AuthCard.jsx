export default function AuthCard({ children }) {
  return (
    <section className="w-full rounded-[30px] border border-white/70 bg-white/92 p-6 shadow-[0_28px_80px_rgba(19,59,38,0.16),0_6px_18px_rgba(19,59,38,0.06)] backdrop-blur-xl sm:p-9">
      {children}
    </section>
  )
}
