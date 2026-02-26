import { useStore } from "@/store";
import SvgIcon from "@/components/SvgIcon";
import { hapticLight } from "@/lib/telegram";
import { formatNumberWithCommas } from "@/utils/format";
import styles from "./style.module.scss";

export default function TopBar() {
  const balance = useStore((s) => s.balance);
  const user = useStore((s) => s.user);
  const setWalletSheetOpen = useStore((s) => s.setWalletSheetOpen);

  const openWallet = () => {
    hapticLight();
    setWalletSheetOpen(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.statsPill}>
        <div className={styles.iconTonBlock}>
          <SvgIcon name="ton" className={styles.iconTon} />
          <span className={styles.iconTonBlur}></span>
        </div>
        <div className={styles.balance}>
          <p className={styles.balanceText}>Balance</p>
          <p className={styles.balanceValue}>
            {formatNumberWithCommas(balance.coins)}
          </p>
        </div>

        <button
          type="button"
          className={styles.addBtn}
          aria-label="Wallet"
          onClick={openWallet}
        >
          <SvgIcon name="plus" className={styles.iconAdd} />
        </button>
      </div>
      <div className={styles.avatar}>
        <img
          src={user?.avatarUrl || "/images/avatar.png"}
          alt=""
        />
      </div>
    </header>
  );
}
