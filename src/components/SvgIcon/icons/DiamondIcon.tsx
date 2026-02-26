import type { SVGProps } from 'react'

export function DiamondIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 2L2 9l4 11h12l4-11L12 2zm0 3.5L18 9H6l6-3.5zM4.5 10h15L17 18H7L4.5 10z" />
    </svg>
  )
}
