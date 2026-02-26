import { useStore } from '@/store'
import { hapticLight } from '@/lib/telegram'
import { useTasks, useCompleteTask } from '@/api/hooks'
import TaskCard from '@/components/TaskCard'
import SkeletonCard from '@/components/SkeletonCard'
import PrimaryButton from '@/components/PrimaryButton'
import SecondaryButton from '@/components/SecondaryButton'
import SvgIcon from '@/components/SvgIcon'
import styles from './style.module.scss'

export default function Tasks() {
  const balance = useStore((s) => s.balance)
  const setWalletSheetOpen = useStore((s) => s.setWalletSheetOpen)
  const { data: tasks, isLoading } = useTasks()
  const completeTask = useCompleteTask()

  const handleComplete = (taskId: string) => {
    completeTask.mutate(taskId)
  }

  const handleConnect = (_taskId: string) => {
    hapticLight()
    setWalletSheetOpen(true)
  }

  const canWithdraw = balance.ton > 0

  return (
    <div className={styles.root}>
      <div className={styles.headerCard}>
        <h1 className={styles.headerTitle}>Complete Tasks And Get Reward</h1>
        <p className={styles.headerDesc}>
          <SvgIcon name="diamond" className={styles.headerIcon} />
          You get x2 penalty for vacations. From sponsored channels.
        </p>
      </div>

      {isLoading ? (
        <div className={styles.taskList}>
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.taskList}>
          {tasks?.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={handleComplete}
              onConnect={handleConnect}
            />
          ))}
        </div>
      )}

      <div className={styles.actionBar}>
        <div className={styles.balanceWrap}>
          <span className={styles.balanceLabel}>Balance</span>
          <span className={styles.balanceValue}>
            <SvgIcon name="diamond" className={styles.balanceIcon} />
            {balance.coins.toLocaleString()}
          </span>
          <SecondaryButton className={styles.connectBtn}>Connect</SecondaryButton>
        </div>
        <div className={styles.actionsWrap}>
          <PrimaryButton
            className={styles.depositBtn}
            icon={<SvgIcon name="plus" className={styles.depositIcon} />}
            onClick={() => setWalletSheetOpen(true)}
          >
            Deposit
          </PrimaryButton>
          <SecondaryButton className={styles.withdrawBtn} disabled={!canWithdraw}>
            <SvgIcon name="minus" className={styles.withdrawIcon} />
            Withdraw
          </SecondaryButton>
        </div>
      </div>
    </div>
  )
}
