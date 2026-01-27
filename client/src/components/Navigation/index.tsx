import { Link } from "react-router-dom";
import { CalendarCheck, Loader } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

import styles from "./index.module.scss";

const Navigation = () => {
  const { user, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className={styles.navigation}>
      <div className={styles.navContent}>
        <Link to={user ? "/" : "#"} className={styles.logo}>
          <CalendarCheck />
        </Link>

        {!isLoaded ? (
          <Loader />
        ) : user ? (
          <div className={styles.userSection}>
            <UserButton />
            <p>Hello, {user.firstName}!</p>
          </div>
        ) : (
          <button onClick={() => openSignIn()} className={styles.signInButton}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
