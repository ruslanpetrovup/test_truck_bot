import { useState } from 'react'
import { useStore } from '@/store'
import DepositSwitch, { type DepositMode } from '@/components/DepositSwitch'
import SvgIcon from '@/components/SvgIcon'
import { hapticLight } from '@/lib/telegram'
import styles from './style.module.scss'

interface WalletBottomSheetProps {
  onClose: () => void
}

export default function WalletBottomSheet({ onClose }: WalletBottomSheetProps) {
  const balance = useStore((s) => s.balance)
  const [showDepositForm, setShowDepositForm] = useState(false)
  const [depositMode, setDepositMode] = useState<DepositMode>('TON')
  const [walletConnected, setWalletConnected] = useState(false)
  const [depositAmount, setDepositAmount] = useState('')
  const canWithdraw = balance.ton > 0

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      hapticLight()
      onClose()
    }
  }

  const handleDepositClick = () => {
    hapticLight()
    setShowDepositForm(true)
  }

  const handleBackFromDeposit = () => {
    hapticLight()
    setShowDepositForm(false)
  }

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.handle} aria-hidden />

        {!showDepositForm ? (
          <>
            <div className={styles.topRow}>
              <div className={styles.balanceBadge}>
                <SvgIcon name="diamond" className={styles.balanceIcon} />
                <div className={styles.balanceText}>
                  <span className={styles.balanceLabel}>Balance</span>
                  <span className={styles.balanceValue}>{balance.coins.toLocaleString()}</span>
                </div>
              </div>
              <button
                type="button"
                className={styles.connectBtn}
                onClick={() => {
                  hapticLight()
                  setWalletConnected(true)
                }}
              >
                {walletConnected ? 'Connected' : 'Connect'}
              </button>
            </div>
            <div className={styles.actionsRow}>
              <button type="button" className={styles.depositBtn} onClick={handleDepositClick}>
                <SvgIcon name="plus" className={styles.actionIcon} />
                Deposit
              </button>
              <button type="button" className={styles.withdrawBtn} disabled={!canWithdraw}>
                <SvgIcon name="minus" className={styles.actionIcon} />
                Withdraw
              </button>
            </div>
          </>
        ) : (
          <div className={styles.depositForm}>
            <button type="button" className={styles.backBtn} onClick={handleBackFromDeposit}>
              ← Back
            </button>
            <DepositSwitch value={depositMode} onChange={setDepositMode} className={styles.currencyTabs} />
            <span className={styles.depositLabel}>Deposit</span>
            <div className={styles.depositBalanceRow}>
              <div className={styles.balanceBadge}>
                <SvgIcon name="diamond" className={styles.balanceIcon} />
                <div className={styles.balanceText}>
                  <span className={styles.balanceLabel}>Balance</span>
                  <span className={styles.balanceValue}>{balance.coins.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className={styles.depositInputWrap}>
              {depositMode === 'TON' ? (
                <SvgIcon name="diamond" className={styles.depositInputIcon} />
              ) : (
                <SvgIcon name="star" className={`${styles.depositInputIcon} ${styles.depositInputIconStar}`} />
              )}
              <input
                type="text"
                className={styles.depositInput}
                placeholder="0"
                value={depositAmount || (depositMode === 'Stars' ? String(balance.stars) : '')}
                onChange={(e) => setDepositAmount(e.target.value)}
                inputMode="decimal"
              />
            </div>
            <button type="button" className={styles.depositCta} onClick={() => hapticLight()}>
              <SvgIcon name="plus" className={styles.actionIcon} />
              Deposit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
