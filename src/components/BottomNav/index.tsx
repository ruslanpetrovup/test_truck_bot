import { NavLink, useLocation } from 'react-router-dom'
import SvgIcon, { type IconName } from '@/components/SvgIcon'
import { hapticLight } from '@/lib/telegram'
import { useStore } from '@/store'
import styles from './style.module.scss'

const navItems: { to: string | null; label: string; icon: IconName; openWallet?: boolean; activePaths?: string[] }[] = [
  { to: '/main', label: 'Main', icon: 'main' },
  { to: '/trucks/shop', label: 'Trucks', icon: 'truck', activePaths: ['/trucks'] },
  { to: '/referrals', label: 'Referrals', icon: 'referrals' },
  { to: '/missions', label: 'Missions', icon: 'tasks' },
  { to: null, label: 'Wallet', icon: 'wallet', openWallet: true },
]

export default function BottomNav() {
  const setWalletSheetOpen = useStore((s) => s.setWalletSheetOpen)
  const location = useLocation()

  const handleWalletClick = () => {
    hapticLight()
    setWalletSheetOpen(true)
  }

  const isItemActive = (item: (typeof navItems)[0]) => {
    if (item.activePaths) {
      return item.activePaths.some((path) => location.pathname === path || location.pathname.startsWith(path + '/'))
    }
    return false
  }

  return (
    <nav className={styles.nav}>
      {navItems.map((item, index) => (
        <span key={item.label} className={styles.itemWrapper}>
          {index > 0 && <span className={styles.divider} aria-hidden />}
          {item.openWallet ? (
            <button
              type="button"
              className={styles.item}
              onClick={handleWalletClick}
              aria-label={item.label}
            >
              <span className={styles.iconWrap}>
                <SvgIcon name={item.icon} className={styles.icon} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </button>
          ) : (
            <NavLink
              to={item.to!}
              onClick={() => hapticLight()}
              className={({ isActive }) => {
                const active = isActive || isItemActive(item)
                return active ? `${styles.item} ${styles.active}` : styles.item
              }}
              end={item.to === '/main'}
            >
              <span className={styles.iconWrap}>
                <SvgIcon name={item.icon} className={styles.icon} />
              </span>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          )}
        </span>
      ))}
    </nav>
  )
}
