import styles from "@/App.module.scss";
import MainFooter from "@/modules/mainFooter/MainFooter";
import MainHeader from "@/modules/mainHeader/MainHeader";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className={styles.container}>
      <MainHeader />
      <main className={styles.content}>
        <Outlet />
      </main>
      <MainFooter />
    </div>
  );
};

export default RootLayout;
