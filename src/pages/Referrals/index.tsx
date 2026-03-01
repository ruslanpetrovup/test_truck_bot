import { useCallback } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import SkeletonCard from "@/components/SkeletonCard";
import SvgIcon from "@/components/SvgIcon";
import { useReferralLevels } from "@/api/hooks";
import { hapticLight } from "@/lib/telegram";
import styles from "./style.module.scss";

const REFERRAL_LINK = "https://t.me/telegram_gama/t23000";

export default function Referrals() {
  const { data: referralLevels, isLoading } = useReferralLevels();

  const copyLink = useCallback(() => {
    hapticLight();
    navigator.clipboard.writeText(REFERRAL_LINK);
  }, []);

  const tonEarned = 14.6;
  const referralsCount = referralLevels?.reduce(
    (sum, lvl) => sum + lvl.referrals.length,
    0
  ) ?? 0;

  return (
    <div className={styles.root}>
      <div className={styles.linkSection}>
        <span className={styles.linkLabel}>Referral Link</span>
        <div className={styles.linkField}>
          <span className={styles.link}>{REFERRAL_LINK}</span>
          <button
            type="button"
            className={styles.copyBtn}
            onClick={copyLink}
            aria-label="Copy link"
          >
            <SvgIcon name="copy" className={styles.copyIcon} />
          </button>
        </div>
      </div>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <SvgIcon name="users" className={styles.statCardIcon} />
          <div className={styles.statCardText}>
            <span className={styles.statCardLabel}>Referrals</span>
            <span className={styles.statCardValue}>{referralsCount}</span>
          </div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statCardIconTonBlock}>
            <SvgIcon name="ton" className={styles.statCardIconTon} />
          </div>
          <div className={styles.statCardText}>
            <span className={styles.statCardLabel}>Ton Earned</span>
            <span className={styles.statCardValue}>{tonEarned}</span>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className={styles.referrals}>
          <div className={styles.referralsItem}>
            <div className={styles.referralsItemHeader}>
              <span className={styles.percentBadge}>5%</span>
              <div className={styles.referralsItemText}>
                <p className={styles.referralsItemTitle}>Your referrals</p>
                <p className={styles.referralsItemLvl}>Lvl 1</p>
              </div>
            </div>
            <div className={styles.friendList}>
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} className={styles.skeleton} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.referrals}>
          {referralLevels?.map((level) => (
            <div key={level.level} className={styles.referralsItem}>
              <div className={styles.referralsItemHeader}>
                <span className={styles.percentBadge}>{level.percent}%</span>
                <div className={styles.referralsItemText}>
                  <p className={styles.referralsItemTitle}>Your referrals</p>
                  <p className={styles.referralsItemLvl}>Lvl {level.level}</p>
                </div>
              </div>

              <ul className={styles.friendList}>
                {level.referrals.map((friend) => (
                  <li key={friend.id} className={styles.friendItem}>
                    <div className={styles.avatar}>
                      {friend.avatarUrl ? (
                        <img src={friend.avatarUrl} alt="" />
                      ) : (
                        <span className={styles.avatarLetter}>
                          {friend.name.slice(0, 1)}
                        </span>
                      )}
                    </div>
                    <div className={styles.friendText}>
                      <p className={styles.name}>{friend.name}</p>
                      <div className={styles.earned}>
                        <div className={styles.earnedIcon}>
                          <SvgIcon name="ton" />
                        </div>
                        <p className={styles.earnedText}>{friend.reward}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      <div className={styles.inviteWrap}>
        <div className={styles.inviteBtnBlock}>
          <PrimaryButton
            className={styles.inviteBtn}
            icon={<SvgIcon name="plus" className={styles.inviteBtnIcon} />}
            onClick={() => hapticLight()}
          >
            Invite Friend
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
