import { useNavigate } from 'react-router-dom'
import Tabs, { type TabItem } from '@/components/Tabs'
import ProductCard from '@/components/ProductCard'
import SkeletonCard from '@/components/SkeletonCard'
import { useOwnedTrucks } from '@/api/hooks'
import styles from './style.module.scss'

const tabs: TabItem[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'yard', label: 'Yard' },
]

export default function TrucksYard() {
  const navigate = useNavigate()
  const { data: ownedTrucks, isLoading } = useOwnedTrucks()

  const handleTab = (id: string) => {
    if (id === 'shop') navigate('/trucks/shop')
  }

  return (
    <div className={styles.root}>
      <Tabs tabs={tabs} activeId="yard" onSelect={handleTab} className={styles.tabs} />
      {isLoading ? (
        <div className={styles.list}>
          {[1, 2].map((i) => (
            <SkeletonCard key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : ownedTrucks && ownedTrucks.length > 0 ? (
        <div className={styles.list}>
          {ownedTrucks.map((truck) => (
            <ProductCard key={truck.id} product={truck} />
          ))}
        </div>
      ) : (
        <p className={styles.empty}>Your purchased trucks will appear here.</p>
      )}
    </div>
  )
}
