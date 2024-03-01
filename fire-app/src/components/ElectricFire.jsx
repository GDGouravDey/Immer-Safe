import { electricaltips } from "../constants";
import styles from "../style";
import { electrical_safety } from "../assets";
import { layout } from "../style";
import { bullet } from "../assets";

const FeatureCard = ({ icon, title, content, index }) => (
    <div className={`flex flex-row p-4 rounded-[20px] feature-card`}>
        <div className={`w-[40px] h-[40px] -mt-2 rounded-full ${styles.flexCenter}`}>
            <img src={bullet} alt="bullet" className="w-[50%] h-[50%] object-contain" />
        </div>
        <div className="flex-1 flex flex-col">
            <h4 className="font-poppins font-semibold text-white text-[19px] leading-[23.4px] mb-1">
                {title}
            </h4>
        </div>
    </div>
);

const ElectricFire = () => {
    return (
        <>
            <section className={`${layout.section2} relative`}>
                <div className="absolute z-[0] w-[60%] h-[60%] -right-[50%] rounded-full orange__gradient bottom-40" />
                <div className={`${layout.sectionImg} md:ml-7`}>
                    <img src={electrical_safety} alt="electrical_safety" className="w-[100%] h-[80%] relative z-[5] ml-1 mb-12 pr-5 rounded-[3.5rem]" />
                </div>
                <div className={layout.sectionInfo}>
                    <h2 className={`${styles.heading2} flex justify-center items-center mb-[-40px] md:ml-[-15px]`}>Electrical Fire Safety</h2>
                    <section id="electricaltips" className={layout.section}>
                        <div className={`${layout.sectionImg2} flex-col `}>
                            {electricaltips.map((tip, index) => (
                                <FeatureCard key={tip.id} {...tip} index={index} />
                            ))}
                        </div>
                        {/* <div className={`${layout.sectionImg} flex-col`}>
                            {features2.map((feature, index) => (
                                <FeatureCard key={feature.id} {...feature} index={index} />
                            ))}
                        </div> */}
                    </section>

                </div>
            </section>
        </>
    );
};

export default ElectricFire;
