import styles from './style.module.scss'

interface SkeletonCardProps {
  className?: string
}

export default function SkeletonCard({ className = '' }: SkeletonCardProps) {
  return <div className={`${styles.card} ${className}`.trim()} aria-hidden />
}
