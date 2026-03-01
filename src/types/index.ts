export interface User {
  id: string
  name: string
  avatarUrl: string
}

export interface Balance {
  coins: number
  energy: number
  ton: number
  stars: number
}

export interface Task {
  id: string
  title: string
  description: string
  reward: number
  completed: boolean
  type: 'complete' | 'connect'
}

export interface Product {
  id: string
  title: string
  imageUrl: string
  price: number
  stats: {
    label: string
    value: string
    icon?: string
  }[]
}

export interface Friend {
  id: string
  name: string
  avatarUrl: string
  reward: number
}

export interface ReferralLevel {
  percent: number
  level: number
  referrals: Friend[]
}
