import type { User, Product, Task, Friend } from '@/types'

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms))
const randomDelay = () => delay(200 + Math.random() * 200)

const mockUser: User = {
  id: '1',
  name: 'Driver',
  avatarUrl: '',
}

const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Renault F-034S',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400',
    price: 10880,
    stats: [
      { label: 'Earn', value: '0.22/H' },
      { label: 'Energy', value: '0/100' },
      { label: 'Durability', value: '89/90' },
    ],
  },
  {
    id: '2',
    title: 'Scania R-500',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400',
    price: 15800,
    stats: [
      { label: 'Earn', value: '0.35/H' },
      { label: 'Energy', value: '0/100' },
      { label: 'Durability', value: '100/100' },
    ],
  },
  {
    id: '3',
    title: 'Volvo FH16',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=400',
    price: 22500,
    stats: [
      { label: 'Earn', value: '0.48/H' },
      { label: 'Energy', value: '0/100' },
      { label: 'Durability', value: '100/100' },
    ],
  },
]

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'CRDO',
    description: 'Our official Telegram channel',
    reward: 14.6,
    completed: false,
    type: 'complete',
  },
  {
    id: '2',
    title: 'Partner Channel',
    description: 'Subscribe and get reward',
    reward: 8.2,
    completed: true,
    type: 'complete',
  },
  {
    id: '3',
    title: 'Connect Wallet',
    description: 'Connect TON wallet to withdraw',
    reward: 5,
    completed: false,
    type: 'connect',
  },
]

const mockFriends: Friend[] = [
  { id: '1', name: 'Benji', avatarUrl: '', reward: 100 },
  { id: '2', name: 'Alex', avatarUrl: '', reward: 80 },
  { id: '3', name: 'Sam', avatarUrl: '', reward: 60 },
]

const mockOwnedTrucks: Product[] = [
  {
    id: 'owned-1',
    title: 'Renault F-034S',
    imageUrl: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400',
    price: 10880,
    stats: [
      { label: 'Earn', value: '0.22/H' },
      { label: 'Energy', value: '78/100' },
      { label: 'Durability', value: '85/90' },
    ],
  },
  {
    id: 'owned-2',
    title: 'Scania R-500',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=400',
    price: 15800,
    stats: [
      { label: 'Earn', value: '0.35/H' },
      { label: 'Energy', value: '100/100' },
      { label: 'Durability', value: '100/100' },
    ],
  },
]

export async function fetchUser(): Promise<User> {
  await randomDelay()
  return mockUser
}

export async function fetchProducts(): Promise<Product[]> {
  await randomDelay()
  return mockProducts
}

export async function fetchTasks(): Promise<Task[]> {
  await randomDelay()
  return mockTasks
}

export async function fetchInvites(): Promise<Friend[]> {
  await randomDelay()
  return mockFriends
}

export async function fetchOwnedTrucks(): Promise<Product[]> {
  await randomDelay()
  return mockOwnedTrucks
}

export async function completeTask(_taskId: string): Promise<{ success: boolean }> {
  await randomDelay()
  return { success: true }
}

export async function buyProduct(_productId: string): Promise<{ success: boolean }> {
  await randomDelay()
  return { success: true }
}
