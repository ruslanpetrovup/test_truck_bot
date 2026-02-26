import { useNavigate } from 'react-router-dom'
import { useCallback } from 'react'
import Tabs, { type TabItem } from '@/components/Tabs'
import PrimaryButton from '@/components/PrimaryButton'
import SkeletonCard from '@/components/SkeletonCard'
import SvgIcon from '@/components/SvgIcon'
import { useInvites } from '@/api/hooks'
import { hapticLight } from '@/lib/telegram'
import styles from './style.module.scss'

const shopTabs: TabItem[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'yard', label: 'Yard' },
]

const REFERRAL_LINK = 'https://t.me/telegram_gama/t23000'

export default function Yard() {
  const navigate = useNavigate()
  const { data: invites, isLoading } = useInvites()

  const handleTab = (id: string) => {
    if (id === 'shop') navigate('/trucks/shop')
  }

  const copyLink = useCallback(() => {
    hapticLight()
    navigator.clipboard.writeText(REFERRAL_LINK)
  }, [])

  const tonEarned = 14.6

  return (
    <div className={styles.root}>
      <Tabs tabs={shopTabs} activeId="yard" onSelect={handleTab} className={styles.tabs} />

      <div className={styles.referralCard}>
        <div className={styles.linkRow}>
          <span className={styles.link}>{REFERRAL_LINK}</span>
          <button type="button" className={styles.copyBtn} onClick={copyLink} aria-label="Copy link">
            <SvgIcon name="copy" className={styles.copyIcon} />
          </button>
        </div>
        <div className={styles.pills}>
          <div className={styles.pill}>
            <SvgIcon name="users" className={styles.pillIcon} />
            <span className={styles.pillLabel}>Referrals</span>
            <span className={styles.pillValue}>{invites?.length ?? 0}</span>
          </div>
          <div className={styles.pill}>
            <SvgIcon name="diamond" className={styles.pillIconDiamond} />
            <span className={styles.pillLabel}>Ton Earned</span>
            <span className={styles.pillValue}>{tonEarned}</span>
          </div>
        </div>
      </div>

      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Your referrals</h2>
        <span className={styles.levelLabel}>5% Level 1</span>
      </div>

      {isLoading ? (
        <div className={styles.friendList}>
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <ul className={styles.friendList}>
          {invites?.map((friend) => (
            <li key={friend.id} className={styles.friendItem}>
              <div className={styles.avatar}>
                {friend.avatarUrl ? (
                  <img src={friend.avatarUrl} alt="" />
                ) : (
                  <span className={styles.avatarLetter}>{friend.name.slice(0, 1)}</span>
                )}
              </div>
              <span className={styles.name}>{friend.name}</span>
              <span className={styles.reward}>
                +{friend.reward}
                <SvgIcon name="diamond" className={styles.rewardIcon} />
              </span>
            </li>
          ))}
        </ul>
      )}

      <PrimaryButton className={styles.inviteBtn} icon={<SvgIcon name="plus" className={styles.rewardIcon} />} onClick={() => hapticLight()}>
        Invite Friend
      </PrimaryButton>

      <p className={styles.footerNote}>10% Level 2</p>
    </div>
  )
}
