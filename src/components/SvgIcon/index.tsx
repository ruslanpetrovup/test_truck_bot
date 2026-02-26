import type { SVGProps } from 'react'
import { DiamondIcon } from './icons/DiamondIcon'
import { PlusIcon } from './icons/PlusIcon'
import { UserIcon } from './icons/UserIcon'
import { MainIcon } from './icons/MainIcon'
import { HomeIcon } from './icons/HomeIcon'
import { ShopIcon } from './icons/ShopIcon'
import { UsersIcon } from './icons/UsersIcon'
import { TasksIcon } from './icons/TasksIcon'
import { TonIcon } from './icons/TonIcon'
import { WalletIcon } from './icons/WalletIcon'
import { TruckIcon } from './icons/TruckIcon'
import { CheckIcon } from './icons/CheckIcon'
import { CopyIcon } from './icons/CopyIcon'
import { StarIcon } from './icons/StarIcon'
import { MinusIcon } from './icons/MinusIcon'

const icons = {
  diamond: DiamondIcon,
  plus: PlusIcon,
  user: UserIcon,
  main: MainIcon,
  home: HomeIcon,
  shop: ShopIcon,
  users: UsersIcon,
  tasks: TasksIcon,
  ton: TonIcon,
  wallet: WalletIcon,
  truck: TruckIcon,
  check: CheckIcon,
  copy: CopyIcon,
  star: StarIcon,
  minus: MinusIcon,
}

export type IconName = keyof typeof icons

function SvgIcon({ name, ...props }: { name: IconName } & SVGProps<SVGSVGElement>) {
  const Icon = icons[name]
  if (!Icon) return null
  return <Icon aria-hidden {...props} />
}

export default SvgIcon
