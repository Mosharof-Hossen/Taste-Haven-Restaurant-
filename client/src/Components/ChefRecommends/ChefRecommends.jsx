import useFetchMenu from "../../API/useFetchMenu";
import SectionTitle from "../SectionTitle/SectionTitle";
import ItemCard from "./ItemCard";

const ChefRecommends = () => {
    const { data, isLoading } = useFetchMenu("/menu/salad");
    if (isLoading) {
        return
    }
    const filtered = data.slice(0, 3);
    return (
        <div className="p-5 space-y-10">
            <SectionTitle heading={'chef recommended'} subHeading={'Should Try'}></SectionTitle>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 col-span-1 gap-5">
                {
                    filtered?.map(item => <ItemCard key={item._id} item={item}></ItemCard>)
                }
            </div>
        </div>
    );
};

export default ChefRecommends;