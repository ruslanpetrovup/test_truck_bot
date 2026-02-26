import { useNavigate } from "react-router-dom";
import TopBar from "@/components/TopBar";
import PrimaryButton from "@/components/PrimaryButton";
import SvgIcon from "@/components/SvgIcon";
import { useStore } from "@/store";
import styles from "./style.module.scss";

const TRUCK_BG = "/images/main-photo.png";

export default function Home() {
  const navigate = useNavigate();
  const tap = useStore((s) => s.tap);

  const handleStart = () => {
    tap();
    navigate("/missions");
  };

  return (
    <div className={styles.root}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${TRUCK_BG})` }}
      >
        <div className={styles.overlay} />
      </div>
      <div className={styles.topBarWrap}>
        <TopBar />
      </div>
      <div className={styles.ctaWrap}>
        <div className={styles.ctaBtnBlock}>
          <PrimaryButton
            className={styles.ctaBtn}
            icon={<SvgIcon name="truck" className={styles.ctaIcon} />}
            onClick={handleStart}
          >
            Start Expedition
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
