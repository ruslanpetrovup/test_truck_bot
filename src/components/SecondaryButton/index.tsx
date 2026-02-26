import type { ButtonHTMLAttributes } from 'react'
import { hapticLight } from '@/lib/telegram'
import styles from './style.module.scss'

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

export default function SecondaryButton({
  children,
  onClick,
  className = '',
  disabled,
  ...rest
}: SecondaryButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    hapticLight()
    onClick?.(e)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`${styles.btn} ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  )
}
