import React from "react";
import styles from "../style";
import { Navbar, Notif, Footer, Chatbot } from "../components";

const Notification = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Notif />
      </div>
    </div>
    <div className={`bg-primary w-full ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
          <Chatbot />
        </div>
      </div>
  </div>
);

export default Notification;
