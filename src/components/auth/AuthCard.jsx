export default function AuthCard({ children }) {
  return (
    <section className="w-full rounded-[22px] border border-standard-border bg-white/90 p-6 shadow-[0_18px_50px_rgba(47,107,60,0.12)] backdrop-blur-sm sm:p-10">
      {children}
    </section>
  )
}
