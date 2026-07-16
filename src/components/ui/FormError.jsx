export default function FormError({ children, id }) {
  if (!children) return null

  return (
    <p className="mt-2 text-sm font-medium text-[#B42318]" id={id} role="alert">
      {children}
    </p>
  )
}
