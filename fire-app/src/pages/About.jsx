import React from 'react';
import styles from '../style';
import { Navbar, Footer } from '../components';
import LoginPage from '../components/LoginPage';
const About = () => {
  return (
    <>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      </div>
      <div>
        <h1>This is the About Us Page</h1>
      </div>
      <div className={`bg-primary w-full ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default About;
