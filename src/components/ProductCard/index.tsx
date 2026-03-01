import type { Product } from "@/types";
import SvgIcon from "@/components/SvgIcon";
import PrimaryButton from "@/components/PrimaryButton";
import { formatNumberWithCommas } from "@/utils/format";
import styles from "./style.module.scss";

const statIconMap: { icon: "ton" | "trips" }[] = [
  { icon: "ton" },
  { icon: "ton" },
  { icon: "trips" },
];

interface ProductCardProps {
  product: Product;
  onBuy?: (productId: string) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.contentBlock}>
          <h3 className={styles.title}>{product.title}</h3>
          <div className={styles.stats}>
            {product.stats.map((stat, i) => {
              const { icon } = statIconMap[i] ?? statIconMap[0];
              return (
                <div key={stat.label} className={styles.statRow}>
                  <span className={styles.statIcon}>
                    <SvgIcon name={icon} />
                  </span>
                  <div className={styles.statText}>
                    <span className={styles.label}>{stat.label}</span>
                    <span className={styles.value}>{stat.value}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {onBuy && (
          <PrimaryButton
            className={styles.buyBtn}
            onClick={() => onBuy(product.id)}
          >
            <div className={styles.priceIconBlock}>
            <SvgIcon name="ton" className={styles.priceIcon} />
            </div>
            <span className={styles.priceValue}>
              {formatNumberWithCommas(product.price, " ")}
            </span>
          </PrimaryButton>
        )}
      </div>
      <div className={styles.imageWrap}>
        <img src={product.imageUrl} alt="" />
      </div>
      <button type="button" className={styles.infoBtn} aria-label="Info">
        <SvgIcon name="info" />
      </button>
    </article>
  );
}
