import SectionTitle from "../SectionTitle/SectionTitle";
import img from "../../assets/home/featured.jpg"

const ItemDisplay = () => {
    return (
        <div
            className="hero  bg-fixed bg-center bg-cover my-10"
            style={{
                backgroundImage: `url('${img}')`,
            }}>
            <div className="hero-overlay bg-opacity-70"></div>
            <div className="hero-content flex flex-col text-neutral-content ">
                <div className="max-w-4xl space-y-10">
                    <SectionTitle heading={"from our menu"} subHeading={"Check It Out"}></SectionTitle>
                    <div className="flex gap-8 flex-col md:flex-row items-center">
                        <div>
                            <img src={img} alt="" className="rounded-lg" />
                        </div>
                        <div className="space-y-2">
                            <p className="text-2xl">March 20, 2024</p>
                            <p className="text-2xl">Where can i get some?</p>
                            <p className="text-lg">From the cozy, welcoming atmosphere to the attentive service, our goal is to ensure that each visit feels like a special occasion. The restaurant’s décor blends modern aesthetics with warm, rustic touches, creating an environment that is both stylish and comfortable.</p>
                            <button className='text-[#BB8506] text-xl px-3 py-2  border-b-4 border-[#BB8506] rounded-lg '>Read More</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ItemDisplay;