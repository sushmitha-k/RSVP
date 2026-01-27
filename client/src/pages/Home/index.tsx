import { Header } from "../../components/Header";
import { AddGuest } from "../../pages/Home/AddGuest";
import GuestList from "./GuestList";
import { GuestProvider } from "../../context";
import { Toaster } from "react-hot-toast";
import { useGetGuestsList } from "../../hooks/useGetGuestsList";

import styles from "./index.module.scss";

const Home = () => {
  const { fetchGuests } = useGetGuestsList();

  return (
    <div className={styles.container}>
      <GuestProvider refetchList={() => fetchGuests()}>
        <Toaster />
        <Header />
        <AddGuest />
        <GuestList />
      </GuestProvider>
    </div>
  );
};

export default Home;
