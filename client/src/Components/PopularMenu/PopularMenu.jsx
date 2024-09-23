import SectionTitle from "../SectionTitle/SectionTitle";
import useFetchMenu from "../../API/useFetchMenu";
import PopularItem from "./PopularItem";
import { Link } from "react-router-dom";


const PopularMenu = () => {
    const { data, isLoading } = useFetchMenu("/menu/popular")

    if (isLoading) {
        return
    }
    console.log(data);

    return (
        <div className="p-5 space-y-10">
            <SectionTitle subHeading={"Check it Out"} heading={"from our menu"}></SectionTitle>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                {
                    data?.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                }
            </div>
            <div className=" text-center">
                <Link to={"/our-menu"}>
                    <button className="text-xl uppercase border-b-4 rounded border-black px-4 py-1">View Full menu</button>
                </Link>
            </div>
        </div>
    );
};

export default PopularMenu;