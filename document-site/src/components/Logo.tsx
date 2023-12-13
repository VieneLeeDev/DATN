export function Logo(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
      <svg viewBox="0 0 140 24" aria-hidden="true" {...props}>
          <text x="0" y="18" className="fill-zinc-900 dark:fill-white">Document Site</text>
      </svg>
  )
}
