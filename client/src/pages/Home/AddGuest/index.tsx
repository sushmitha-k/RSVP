import { UserRoundPlus } from "lucide-react";
import { useGuestContext } from "../../../context";
import Form from "./Form";

import styles from "./index.module.scss";

export const AddGuest = () => {
  const { editingGuest } = useGuestContext();

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>
        <UserRoundPlus className={styles.icon} />{" "}
        {editingGuest ? "Edit Guest" : "Add New Guest"}
      </h4>

      <Form />
    </div>
  );
};
