import React from 'react';
import styles from '../style';
import { Navbar, Footer } from '../components';
import LoginPage from '../components/LoginPage';
const Signin = () => {
    return (
        <>
            <div className="bg-primary w-full overflow-hidden">
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                    <div className={`${styles.boxWidth}`}>
                        <Navbar />
                    </div>
                </div>
            </div>
            <div className="bg-primary flex items-center justify-center h-[80vh]">
                <LoginPage />
            </div>
            <div className={`bg-primary w-full ${styles.paddingX} ${styles.flexCenter}`}>
                <div className={`${styles.boxWidth}`}>
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Signin;
