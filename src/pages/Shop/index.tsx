import { useNavigate } from 'react-router-dom'
import Tabs, { type TabItem } from '@/components/Tabs'
import ProductCard from '@/components/ProductCard'
import SkeletonCard from '@/components/SkeletonCard'
import { useProducts, useBuyProduct } from '@/api/hooks'
import styles from './style.module.scss'

const shopTabs: TabItem[] = [
  { id: 'shop', label: 'Shop' },
  { id: 'yard', label: 'Yard' },
]

export default function Shop() {
  const navigate = useNavigate()
  const { data: products, isLoading } = useProducts()
  const buyProduct = useBuyProduct()

  const handleTab = (id: string) => {
    if (id === 'yard') navigate('/trucks/yard')
  }

  const handleBuy = (productId: string) => {
    buyProduct.mutate(productId)
  }

  return (
    <div className={styles.root}>
      <Tabs
        tabs={shopTabs}
        activeId="shop"
        onSelect={handleTab}
        className={styles.tabs}
      />
      {isLoading ? (
        <div className={styles.list}>
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} className={styles.skeleton} />
          ))}
        </div>
      ) : (
        <div className={styles.list}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={handleBuy} />
          ))}
        </div>
      )}
    </div>
  )
}
