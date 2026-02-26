import { hapticLight } from '@/lib/telegram'
import styles from './style.module.scss'

export type DepositMode = 'TON' | 'Stars'

interface DepositSwitchProps {
  value: DepositMode
  onChange: (value: DepositMode) => void
  className?: string
}

export default function DepositSwitch({ value, onChange, className = '' }: DepositSwitchProps) {
  return (
    <div className={`${styles.switch} ${className}`.trim()} role="tablist">
      {(['TON', 'Stars'] as const).map((mode) => {
        const isActive = value === mode
        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              hapticLight()
              onChange(mode)
            }}
            className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
          >
            {mode}
          </button>
        )
      })}
    </div>
  )
}
