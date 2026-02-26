import type { Product } from '@/types'
import { hapticLight } from '@/lib/telegram'
import SvgIcon from '@/components/SvgIcon'
import styles from './style.module.scss'

interface ProductCardProps {
  product: Product
  onBuy?: (productId: string) => void
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={product.imageUrl} alt="" />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.stats}>
          {product.stats.map((stat) => (
            <div key={stat.label} className={styles.statRow}>
              <span className={styles.label}>{stat.label}:</span>
              <span className={styles.value}>{stat.value}</span>
            </div>
          ))}
        </div>
        {onBuy && (
          <button
            type="button"
            className={styles.buyBtn}
            onClick={() => {
              hapticLight()
              onBuy(product.id)
            }}
          >
            <SvgIcon name="diamond" className={styles.priceIcon} />
            <span className={styles.priceValue}>{product.price.toLocaleString()}</span>
          </button>
        )}
      </div>
    </article>
  )
}
