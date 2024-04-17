import React, { useEffect, useRef } from 'react';
import styles from '../style';
import { Navbar, Footer } from '../components';
import { Priyam, Gourav, Aishik, Trisha, Pritam, Suman } from '../assets';
import animationData from '../Animation.json';
import lottie from 'lottie-web';

const Card = ({ imgSrc, description, title }) => (
  <article className="card__article">
    <img src={imgSrc} alt="image" className="card__img" />
    <div className="card__data">
      <h2 className="card__title">{title}</h2>
    </div>
  </article>
);

const About = () => {
  const animationContainerRef = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: animationData // Pass the animation JSON data here
    });

    return () => {
      anim.destroy(); // Clean up animation when component unmounts
    };
  }, []);

  return (
    <div className='bg-primary'>
      <div className="w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Navbar />
          </div>
        </div>
      </div>
      <div className={`flex-1 ${styles.flexStart} flex-col mt-6 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full lg:mt-[140px]">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] sm:mt-[-50px] md:mt-[-100px] lg:mt-[-150px] xl:mt-[-60px]">
            <span className="text-gradient">About Immer Safe</span>{" "}
          </h1>
        </div>
      </div>
      <div className="text-white py-16">
        <div className={`${styles.paddingX} flex flex-wrap justify-between`}>
          <div className={`${styles.boxWidth} max-w-[800px] flex-grow-1 mr-4 mb-4`}>
            <p className="text-lg mb-6">
              Immer Safe is a project dedicated to ensuring the safety and security of individuals and
              properties by leveraging use of advanced technologies such as Internet
              of Things (IoT).
            </p>
            <p className="text-lg mb-6">
              Our mission is to develop innovative solutions that can detect and prevent potential
              hazards such as fires, intrusions, and accidents, thereby creating safer environments
              for communities and businesses.
            </p>
            <p className="text-lg">
              Through continuous research, development, and collaboration with industry experts, we
              strive to make Immer Safe a leading platform for enhancing safety and security standards
              worldwide.
            </p>
          </div>
          <div ref={animationContainerRef} className="sm:mt-[-150px]" style={{ maxWidth: '500px' }}></div>
        </div>
      </div>
      <div className={`flex-1 ${styles.flexStart} flex-col mt-6 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full lg:mt-[140px]">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] sm:mt-[-50px] md:mt-[-100px] lg:mt-[-150px] xl:mt-[-60px]">
            <span className="text-gradient">Meet Our Team</span>{" "}
          </h1>
        </div>
      </div>
      <div className="flex justify-center mb-4">
        <div className="card__container">
          <Card
            imgSrc={Priyam}
            title="Priyam Das"
          />
          <Card
            imgSrc={Aishik}
            title="Aishik Paul"
          />
          <Card
            imgSrc={Gourav}
            title="Gourav Dey"
          />
          <Card
            imgSrc={Trisha}
            title="Trisha Sengupta"
          />
          <Card
            imgSrc={Pritam}
            title="Pritam Pramanik"
          />
          <Card
            imgSrc={Suman}
            title="Suman Majee"
          />
        </div>
      </div>
      <div className={`w-full ${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div >
  );
};

export default About;
