import React from "react";
import styles from "../style";
import { Navbar, HomeFire, ElectricFire, Emergency, Footer } from "../components";

const Tips = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>
    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <HomeFire />
        <ElectricFire />
        <Emergency />
      </div>
    </div>
    <div className={`bg-primary w-full ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
  </div>
);

export default Tips;
