import type { ButtonHTMLAttributes } from 'react'
import { hapticLight } from '@/lib/telegram'
import styles from './style.module.scss'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  icon?: React.ReactNode
}

export default function PrimaryButton({
  children,
  icon,
  onClick,
  className = '',
  disabled,
  ...rest
}: PrimaryButtonProps) {
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
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  )
}
