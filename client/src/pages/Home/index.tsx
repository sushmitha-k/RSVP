import { Header } from "../../components/Header";
import { AddGuest } from "../../pages/Home/AddGuest";
import GuestList from "./GuestList";
import { GuestProvider } from "../../context";
import { Toaster } from "react-hot-toast";
import { GuestListProvider } from "../../context/GuestListContext";

import styles from "./index.module.scss";

const Home = () => {
  return (
    <div className={styles.container}>
      <GuestProvider>
        <GuestListProvider>
          <Toaster />
          <Header />
          <AddGuest />
          <GuestList />
        </GuestListProvider>
      </GuestProvider>
    </div>
  );
};

export default Home;
