import { useEffect, useState } from 'react'
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
  animateFromOppositeTab?: boolean
}

export default function Tabs({
  tabs,
  activeId,
  onSelect,
  className = '',
  animateFromOppositeTab = false,
}: TabsProps) {
  const activeIndex = tabs.findIndex((t) => t.id === activeId)
  const [mounted, setMounted] = useState(animateFromOppositeTab === false)

  const startOffset =
    activeIndex === 0 ? (tabs.length - 1) * 100 : 0

  useEffect(() => {
    if (!animateFromOppositeTab) return
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [animateFromOppositeTab])

  return (
    <div className={`${styles.tabs} ${className}`.trim()} role="tablist">
      <div
        className={styles.indicator}
        style={{
          width: `${100 / tabs.length}%`,
          transform: `translateX(${mounted ? activeIndex * 100 : startOffset}%)`,
        }}
        aria-hidden
      />
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
