import Banner from "../../Components/Banner/Banner";
import ChefRecommends from "../../Components/ChefRecommends/ChefRecommends";
import OnlineOrder from "../../Components/OnlineOrder/OnlineOrder";
import PopularMenu from "../../Components/PopularMenu/PopularMenu";
import ShortContact from "../../Components/ShortContact/ShortContact";
import TasteHaven from "../../Components/TasteHaven/TasteHaven";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <OnlineOrder></OnlineOrder>
            <TasteHaven></TasteHaven>
            <PopularMenu></PopularMenu>
            <ShortContact></ShortContact>
            <ChefRecommends></ChefRecommends>
        </div>
    );
};

export default Home;