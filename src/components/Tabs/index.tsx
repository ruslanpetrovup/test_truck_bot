import { hapticLight } from '@/lib/telegram'
import styles from './style.module.scss'

export interface TabItem {
  id: string
  label: string
}

interface TabsProps {
  tabs: TabItem[]
  activeId: string
  onSelect: (id: string) => void
  className?: string
}

export default function Tabs({ tabs, activeId, onSelect, className = '' }: TabsProps) {
  return (
    <div className={`${styles.tabs} ${className}`.trim()} role="tablist">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              hapticLight()
              onSelect(tab.id)
            }}
            className={isActive ? `${styles.tab} ${styles.active}` : styles.tab}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
