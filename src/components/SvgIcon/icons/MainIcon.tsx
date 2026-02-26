import type { SVGProps } from 'react'

export function MainIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 20 L8 20 L10 8 L6 8 Z" />
      <path d="M16 20 L20 20 L18 8 L14 8 Z" />
      <line x1="6" y1="8" x2="18" y2="8" />
    </svg>
  )
}
