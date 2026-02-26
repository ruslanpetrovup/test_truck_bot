import { create } from 'zustand'
import type { User, Balance, Task, Product, Friend } from '@/types'
import { hapticLight } from '@/lib/telegram'

interface AppState {
  user: User | null
  balance: Balance
  tasks: Task[]
  products: Product[]
  invited: Friend[]
  walletSheetOpen: boolean
  setUser: (user: User | null) => void
  setBalance: (balance: Partial<Balance>) => void
  setTasks: (tasks: Task[]) => void
  setProducts: (products: Product[]) => void
  setInvited: (invited: Friend[]) => void
  setWalletSheetOpen: (open: boolean) => void
  tap: () => void
}

const defaultBalance: Balance = {
  coins: 2298,
  energy: 100,
  ton: 0,
  stars: 644,
}

export const useStore = create<AppState>((set) => ({
  user: null,
  balance: defaultBalance,
  tasks: [],
  products: [],
  invited: [],
  setUser: (user) => set({ user }),
  setBalance: (balance) =>
    set((s) => ({ balance: { ...s.balance, ...balance } })),
  setTasks: (tasks) => set({ tasks }),
  setProducts: (products) => set({ products }),
  setInvited: (invited) => set({ invited }),
  walletSheetOpen: false,
  setWalletSheetOpen: (open) => set({ walletSheetOpen: open }),
  tap: () => {
    hapticLight()
    set((s) => ({ balance: { ...s.balance, coins: s.balance.coins + 1 } }))
  },
}))
