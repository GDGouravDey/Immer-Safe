import { mobile } from "../assets";
import styles, { layout } from "../style";

const Pic1 = () => (
  <section className={`${layout.section} flex-col relative`}>
    <div className="absolute z-[0] w-[60%] h-[80%] -left-[65%] rounded-full pink__gradient bottom-40" />
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
        Get immediate notification <br className="sm:block hidden" /> in case of emergency.
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Stay informed and receive immediate notifications during emergency situations. Our advanced alert system ensures you are aware and can take necessary actions promptly.
      </p>

    </div>

    <div className={layout.sectionImg}>
      <img src={mobile} alt="mobile" className="w-[100%] h-[100%] relative z-[5] ml-1 pr-5 rounded-[3.5rem]" />
    </div>
  </section>
);

export default Pic1;
