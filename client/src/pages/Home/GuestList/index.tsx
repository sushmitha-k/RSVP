/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useGuestList } from "../../../context/GuestListContext";
import { useDebounceValue } from "../../../hooks/usedebounceValue";
import { SearchInput } from "../../../components/Search";
import { ButtonLoader } from "../../../components/Loader";
import { GuestList as List } from "./List";
import { exportToCSV } from "../../../utils";

import styles from "./index.module.scss";

const GuestList = () => {
  const [searchVal, setSearchVal] = useState("");
  const { guests, isLoading, fetchGuests } = useGuestList();
  const debouncedSearch = useDebounceValue(searchVal, 1000);

  useEffect(() => {
    fetchGuests(debouncedSearch);
  }, [debouncedSearch]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Guest List</h2>

        <SearchInput value={searchVal} onChange={setSearchVal} />

        <ButtonLoader
          onClick={(e) => {
            e.preventDefault();
            exportToCSV(guests, "Guest List");
          }}
          isLoading={false}
          className={styles.exportButton}
        >
          <Download className={styles.icon} />
          Export CSV
        </ButtonLoader>
      </div>

      <List guests={guests} isLoading={isLoading} />
    </div>
  );
};

export default GuestList;
