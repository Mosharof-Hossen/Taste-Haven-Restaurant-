import Banner from "../../Components/Banner/Banner";
import ChefRecommends from "../../Components/ChefRecommends/ChefRecommends";
import ItemDisplay from "../../Components/ItemDisplay/ItemDisplay";
import OnlineOrder from "../../Components/OnlineOrder/OnlineOrder";
import PopularMenu from "../../Components/PopularMenu/PopularMenu";
import ShortContact from "../../Components/ShortContact/ShortContact";
import TasteHaven from "../../Components/TasteHaven/TasteHaven";
import Testimonials from "../../Components/Testimonials/Testimonials";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <OnlineOrder></OnlineOrder>
            <TasteHaven></TasteHaven>
            <PopularMenu></PopularMenu>
            <ShortContact></ShortContact>
            <ChefRecommends></ChefRecommends>
            <ItemDisplay></ItemDisplay>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;