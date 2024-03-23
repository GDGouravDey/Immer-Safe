import styles from "../style";
import { robot } from "../assets";
import GetStarted from "./GetStarted";

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] sm:mt-[-50px] md:mt-[-100px] lg:mt-[-150px] xl:mt-[-60px]">
            Welcome to <br className="sm:block hidden" />{" "}
            <span className="text-gradient">Smart Fire</span>{" "}
            <span className="text-gradient">Safety System</span>{" "}
          </h1>
          {/* <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div> */}
        </div>
        <p className={`${styles.paragraph} max-w-[470px] mt-8`}>
          At Smart Fire Safety, we go beyond traditional fire safety measures. Our cutting-edge system not only provides real-time notifications to building occupants but also ensures a rapid and coordinated response from rescue teams.
        </p>
      </div>

      <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative`}>
        <img src={robot} alt="billing" className="w-[100%] h-[100%] relative z-[5]" />

        {/* gradient start */}
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 orange__gradient" />
        <div className="absolute z-[0] w-[100%] h-[50%] right-20 bottom-40 white__gradient" />
        {/* gradient end */}
      </div>

      {/* <div className={`ss:hidden ${styles.flexCenter}`}>
        <GetStarted />
      </div> */}
    </section>
  );
};

export default Hero;
