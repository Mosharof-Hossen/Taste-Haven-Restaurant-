import SectionTitle from "../SectionTitle/SectionTitle";
import {
    useQuery,
} from '@tanstack/react-query'
import useFetchMenu from "../../API/useFetchMenu";


const PopularMenu = () => {
const fetchMenu = useFetchMenu("/menu")
const { data,isLoading } = useQuery({
    queryKey: ["popularItem"],
    queryFn: fetchMenu
})
if(isLoading){
    return
}
console.log(data);

return (
    <div>
        <SectionTitle subHeading={"Check it Out"} heading={"form our menu"}></SectionTitle>
        <div>

        </div>
    </div>
);
};

export default PopularMenu;