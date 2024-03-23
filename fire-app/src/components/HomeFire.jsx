import { hometips } from "../constants";
import styles from "../style";
import { home_safety } from "../assets";
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

const HomeFire = () => {
    return (
        <>
            <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`}>
                <div className={`flex-1 ${styles.flexStart} flex-col sm:px-16 px-6`}>

                    <div className="flex flex-row justify-between items-center w-full lg:mt-[140px]">
                        <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100.8px] leading-[75px] sm:mt-[-50px] md:mt-[-100px] lg:mt-[-150px] xl:mt-[-60px]">
                            <span className="text-gradient">Fire Safety Tips</span>{" "}
                        </h1>

                    </div>
                </div>

            </section>
            <section className={layout.section2}>
                <div className={layout.sectionInfo}>
                    <h2 className={`${styles.heading2} flex justify-center items-center mb-[-40px] md:ml-[-15px]`}>Home Fire Safety</h2>
                    <section id="hometips" className={layout.section}>
                        <div className={`${layout.sectionImg2} flex-col`}>
                            {hometips.map((tip, index) => (
                                <FeatureCard key={tip.id} {...tip} index={index} />
                            ))}
                        </div>
                        {/* <div className={`${layout.sectionImg} flex-col`}>
                            {features2.map((feature, index) => (
                                <FeatureCard key={feature.id} {...feature} index={index} />
                            ))}
                        </div> */}
                    </section>
                    <div className="absolute z-[0] w-[100%] h-[50%] right-[80%] bottom-40 white__gradient" />
                </div>

                <div className={layout.sectionImg}>
                    <img src={home_safety} alt="home_safety" className="w-[100%] xl:w-[90%] h-[80%] relative z-[5] mb-12 pr-5 rounded-[3.5rem]" />
                </div>
            </section>
        </>
    );
};

export default HomeFire;
