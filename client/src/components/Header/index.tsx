import { useMemo } from "react";
import classNames from "classnames";
import { getTotalsByStatus } from "../../utils";
import { useGuestList } from "../../context/GuestListContext";
import styles from "./index.module.scss";

export const Header = () => {
  const { guests } = useGuestList();

  const statusTotals = useMemo(() => {
    return getTotalsByStatus(guests);
  }, [guests]);

  const renderStatusDetails = (totals: Record<string, number>) => {
    return Object.entries(totals).map(([status, count]) => (
      <div key={`status-${status}`} className={styles.detailItem}>
        <h4 className={classNames(styles.status, styles[status])}>{status}</h4>
        <p className={styles.count}>{count}</p>
      </div>
    ));
  };

  return (
    <div className={styles.header}>
      <div>
        <h2 className={styles.title}>RSVP Dashboard</h2>
        <p className={styles.info}>Annual Gala 2026 • June 15, 2026</p>
      </div>

      <div className={styles.details}>{renderStatusDetails(statusTotals)}</div>
    </div>
  );
};
