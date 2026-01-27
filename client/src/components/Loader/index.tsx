import { LoaderCircle } from "lucide-react";

import styles from "./index.module.scss";
import type { IButtonLoaderProps } from "../types";

export const Loader = () => {
  return <LoaderCircle className={styles.spin} />;
};

export const ButtonLoader = ({
  isLoading,
  children,
  ...rest
}: IButtonLoaderProps) => {
  return (
    <button {...rest} disabled={isLoading}>
      {isLoading ? <Loader /> : children}
    </button>
  );
};
