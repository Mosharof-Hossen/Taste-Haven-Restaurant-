import chef from "../../assets/home/chef-service.jpg"

const TasteHaven = () => {
    return (
        <div className="my-10 bg-fixed bg-cover bg-center h-[450px] flex items-center" style={{ backgroundImage: `url(${chef})`}}>
            <div className="md:mx-14 mx-5 px-10 rounded-lg py-14  md:my-32 space-y-5 bg-white  text-black text-center">
                <h3 className="text-2xl md:text-3xl uppercase font-cinzel-c font-bold">Taste Haven</h3>
                <p className="text-center">At Taste Haven, every detail of the dining experience has been thoughtfully designed. From the cozy, welcoming atmosphere to the attentive service, our goal is to ensure that each visit feels like a special occasion. The restaurant’s décor blends modern aesthetics with warm, rustic touches, creating an environment that is both stylish and comfortable.</p>
            </div>
        </div>
    );
};

export default TasteHaven;