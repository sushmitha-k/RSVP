import { X, Search } from "lucide-react";
import type { ISearchInput } from "../types";
import styles from "./index.module.scss";

export const SearchInput = ({
  value,
  placeholder = "Search",
  onChange,
  onClear,
}: ISearchInput) => {
  return (
    <div className={styles.wrapper}>
      <Search size={18} className={styles.searchIcon} />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={styles.search}
      />

      {value && (
        <button
          type="button"
          className={styles.clearBtn}
          onClick={() => {
            onChange("");
            onClear?.();
          }}
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
