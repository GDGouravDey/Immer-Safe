import React from "react";
import styles from "../style";
import { Pic2, Features, Pic1, Footer, Navbar, Testimonials, Hero, Chatbot } from "../components";

const Home = () => (
  <div className="bg-primary w-full overflow-hidden">
    <div className={`${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Navbar />
      </div>
    </div>

    <div className={`bg-primary ${styles.flexStart}`}>
      <div className={`${styles.boxWidth}`}>
        <Hero />
      </div>
    </div>

    <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
      <div className={`${styles.boxWidth}`}>
        <Features />
        <Pic1 />
        <Pic2 />
        <Testimonials />
        <Footer />
        <Chatbot />
      </div>
    </div>
  </div>
);

export default Home;
