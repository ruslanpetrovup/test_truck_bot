import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { initTelegram } from '@/lib/telegram'
import { useUser } from '@/api/hooks'
import { useStore } from '@/store'
import BottomNav from '@/components/BottomNav'
import WalletBottomSheet from '@/components/WalletBottomSheet'
import styles from './style.module.scss'

const ROUTES_WITH_BOTTOM_NAV = ['/main', '/trucks/shop', '/trucks/yard', '/referrals', '/missions']

export default function AppShell() {
  const location = useLocation()
  const { data: user } = useUser()
  const setUser = useStore((s) => s.setUser)
  const walletSheetOpen = useStore((s) => s.walletSheetOpen)
  const setWalletSheetOpen = useStore((s) => s.setWalletSheetOpen)

  useEffect(() => {
    initTelegram()
  }, [])

  useEffect(() => {
    if (user) setUser(user)
  }, [user, setUser])

  const showBottomNav = ROUTES_WITH_BOTTOM_NAV.includes(location.pathname)

  return (
    <div className={styles.shell}>
      <main className={styles.main}>
        <Outlet />
      </main>
      {showBottomNav && <BottomNav />}
      {walletSheetOpen && (
        <WalletBottomSheet onClose={() => setWalletSheetOpen(false)} />
      )}
    </div>
  )
}
