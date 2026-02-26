import type { Task } from '@/types'
import RewardPill from '@/components/RewardPill'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import SvgIcon from '@/components/SvgIcon'
import styles from './style.module.scss'

interface TaskCardProps {
  task: Task
  onComplete: (taskId: string) => void
  onConnect?: (taskId: string) => void
}

export default function TaskCard({ task, onComplete, onConnect }: TaskCardProps) {
  const isConnect = task.type === 'connect'

  return (
    <article className={styles.card}>
      <div className={styles.body}>
        <h3 className={styles.title}>{task.title}</h3>
        <p className={styles.description}>{task.description}</p>
      </div>
      <div className={styles.actions}>
        <RewardPill value={task.reward} />
        {task.completed ? (
          <span className={styles.completedIcon}>
            <SvgIcon name="check" className={styles.checkIcon} />
          </span>
        ) : isConnect ? (
          <SecondaryButton className={styles.btnSmall} onClick={() => onConnect?.(task.id)}>
            Connect
          </SecondaryButton>
        ) : (
          <PrimaryButton className={styles.btnSmall} onClick={() => onComplete(task.id)}>
            Complete
          </PrimaryButton>
        )}
      </div>
    </article>
  )
}
