import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { showBackButton } from '@/lib/telegram'
import { useStore } from '@/store'
import DepositSwitch, { type DepositMode } from '@/components/DepositSwitch'
import PrimaryButton from '@/components/PrimaryButton'
import SvgIcon from '@/components/SvgIcon'
import styles from './style.module.scss'

export default function Deposit() {
  const navigate = useNavigate()
  const balance = useStore((s) => s.balance)
  const [mode, setMode] = useState<DepositMode>('TON')
  const [walletConnected, setWalletConnected] = useState(false)

  useEffect(() => {
    const cleanup = showBackButton(() => navigate(-1))
    return cleanup
  }, [navigate])

  return (
    <div className={styles.root}>
      <div className={styles.headerCard}>
        <h1 className={styles.headerTitle}>Complete Tasks And Get Reward</h1>
        <p className={styles.headerDesc}>
          <SvgIcon name="diamond" className={styles.headerIcon} />
          You get x2 penalty for vacations. From sponsored channels.
        </p>
      </div>

      <DepositSwitch value={mode} onChange={setMode} className={styles.switch} />

      <div className={styles.section}>
        <span className={styles.label}>Deposit</span>
        <div className={styles.balanceRow}>
          <SvgIcon name="diamond" className={styles.balanceIcon} />
          <span className={styles.balanceValue}>{balance.coins.toLocaleString()}</span>
        </div>
        {mode === 'TON' && (
          <>
            <p className={styles.networkLabel}>TON Mars</p>
            <div className={styles.walletCard}>
              {walletConnected ? (
                <span className={styles.walletConnected}>Wallet connected</span>
              ) : (
                <button
                  type="button"
                  className={styles.connectBtn}
                  onClick={() => setWalletConnected(true)}
                >
                  Connect
                </button>
              )}
            </div>
          </>
        )}
        {mode === 'Stars' && (
          <div className={styles.starsCard}>
            <SvgIcon name="star" className={styles.starsIcon} />
            <span className={styles.starsValue}>{balance.stars}</span>
          </div>
        )}
      </div>

      <div className={styles.ctaWrap}>
        <PrimaryButton
          className={styles.ctaBtn}
          icon={<SvgIcon name="plus" className={styles.ctaIcon} />}
          onClick={() => {}}
        >
          Deposit
        </PrimaryButton>
      </div>
    </div>
  )
}
