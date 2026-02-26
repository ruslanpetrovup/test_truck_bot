import SvgIcon from '@/components/SvgIcon'
import styles from './style.module.scss'

interface RewardPillProps {
  value: number
  className?: string
}

export default function RewardPill({ value, className = '' }: RewardPillProps) {
  return (
    <span className={`${styles.pill} ${className}`.trim()}>
      <SvgIcon name="diamond" className={styles.icon} />
      +{value}
    </span>
  )
}
