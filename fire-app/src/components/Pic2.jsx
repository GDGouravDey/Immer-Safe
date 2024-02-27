import { apple, fire_fighter, google } from "../assets";
import styles, { layout } from "../style";

const Pic2 = () => (
  <section id="product" className={layout.sectionReverse}>
    <div className={layout.sectionImgReverse}>
      <img src={fire_fighter} alt="fire_fighter" className="w-[100%] h-[100%] relative z-[5] ml-1 pr-5 rounded-[3.5rem]" />

      {/* gradient start */}
      <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient" />
      <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient" />
      {/* gradient end */}
    </div>

    <div className={layout.sectionInfo}>
      <h2 className={`${styles.heading2} ml-8`}>
      Stay Informed. <br className="sm:block hidden" /> Stay Safe.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-6 ml-6`}>
      Our website provides real-time updates on recent fire incidents, safety tips, and contact information for emergency services. Join us in building a safer world where everyone is informed, prepared, and protected against the threat of fire.
      </p>

    </div>
  </section>
);

export default Pic2;
