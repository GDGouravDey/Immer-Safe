import styles from "../style";
import { discount, robot } from "../assets";
import GetStarted from "./GetStarted";

const Notif = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
      <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>

        <div className="flex flex-row justify-between items-center w-full">
          <div className="flex-1 flex-col xl:px-0 sm:px-16 px-6">
            <div className="flex flex-row justify-between items-center w-full">
              <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[45px] text-white ss:leading-[100.8px] leading-[75px] sm:mt-[-50px] md:mt-[-100px] lg:mt-[-270px] mb-[10px] xl:mt-[-60px]">
                <span className="text-gradient">Notifications</span>{" "}
              </h1>
            </div>

            <div className="mt-4">
              <div className="bg-red-700 text-white p-5 rounded-[20px] shadow-lg mb-6 cursor-pointer">
                <h2 className="text-2xl font-bold mb-2">Possible Fire in Kitchen Area</h2>
                <p className="text-lg">Smoke and High Temperatures Detected.</p>
              </div>
              <div className="bg-red-700 text-white p-5 rounded-[20px] shadow-lg mb-6 cursor-pointer">
                <h2 className="text-2xl font-bold mb-2">Possible Fire in Living Room</h2>
                <p className="text-lg">High Temperatures Detected.</p>
              </div>
            </div>
          </div>
          {/* <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted />
          </div> */}
        </div>
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

export default Notif;
