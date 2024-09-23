import Banner from "../../Components/Banner/Banner";
import OnlineOrder from "../../Components/OnlineOrder/OnlineOrder";
import PopularMenu from "../../Components/PopularMenu/PopularMenu";
import TasteHaven from "../../Components/TasteHaven/TasteHaven";

const Home = () => {
    return (
        <div className="">
            <Banner></Banner>
            <OnlineOrder></OnlineOrder>
            <TasteHaven></TasteHaven>
            <PopularMenu></PopularMenu>
        </div>
    );
};

export default Home;