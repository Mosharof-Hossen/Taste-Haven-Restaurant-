import { Link } from "react-router-dom";
import useFetchMenu from "../../API/useFetchMenu";
import PopularItem from "../../Components/PopularMenu/PopularItem";
import SectionTitle from "../../Components/SectionTitle/SectionTitle";
import PageCover from "../../Shared/PageCover/PageCover";
import img1 from "../../assets/menu/banner3.jpg"
import dessertImg from "../../assets/menu/dessert-bg.jpeg"

const OurMenu = () => {
    const { data: dessert } = useFetchMenu("/menu/dessert")
    const { data: pizza } = useFetchMenu("/menu/pizza")
    const { data: salads } = useFetchMenu("/menu/salad")
    const { data: soups } = useFetchMenu("/menu/soup")
    const { data: offered, isLoading } = useFetchMenu("/menu/offered");
    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }
    return (
        <div className="mb-14">
            <PageCover title={'our menu'} img={img1} description={'would you like to try a dish?'}></PageCover>
            <div className="p-5 space-y-10">
                <SectionTitle heading={"today's offer"} subHeading={"Don't Miss"}></SectionTitle>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                    {
                        offered?.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                    }
                </div>
                <div className="mt-8 text-center">
                    <Link to={"/our-shop"}>
                        <button className="text-xl hover:text-[#BB8506] hover:bg-black uppercase border-b-4 rounded-lg border-black px-4 py-2">Order your favorite food</button>
                    </Link>
                </div>
            </div>

            {/* Desserts */}
            <div className="p-5 space-y-10">
                <PageCover title={'desserts'} img={dessertImg} description={'At Taste Haven, our desserts are the perfect ending to any meal. Indulge in our rich, velvety chocolate lava cake, or savor the creamy goodness of our classic New York cheesecake. '}></PageCover>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                    {
                        dessert?.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                    }
                </div>
                <div className="mt-8 text-center">
                    <Link to={"/our-shop"}>
                        <button className="text-xl hover:text-[#BB8506] hover:bg-black uppercase border-b-4 rounded-lg border-black px-4 py-2">Order your favorite food</button>
                    </Link>
                </div>
            </div>
            {/* Pizza */}
            <div className="p-5 space-y-10">
                <PageCover title={'pizza'} img={dessertImg} description={'Our pizzas are crafted with love and precision at Taste Haven, starting with hand-stretched dough that’s baked to golden perfection.'}></PageCover>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                    {
                        pizza?.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                    }
                </div>
                <div className="mt-8 text-center">
                    <Link to={"/our-shop"}>
                        <button className="text-xl hover:text-[#BB8506] hover:bg-black uppercase border-b-4 rounded-lg border-black px-4 py-2">Order your favorite food</button>
                    </Link>
                </div>
            </div>
            {/* Salads */}
            <div className="p-5 space-y-10">
                <PageCover title={'salads'} img={dessertImg} description={'Our salads are a celebration of freshness and flavor. Each one is made with crisp, seasonal greens, hand-selected vegetables, and house-made dressings.'}></PageCover>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                    {
                        salads?.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                    }
                </div>
                <div className="mt-8 text-center">
                    <Link to={"/our-shop"}>
                        <button className="text-xl hover:text-[#BB8506] hover:bg-black uppercase border-b-4 rounded-lg border-black px-4 py-2">Order your favorite food</button>
                    </Link>
                </div>
            </div>
            {/* Soups */}
            <div className="p-5 space-y-10">
                <PageCover title={'soups'} img={dessertImg} description={'Warm and comforting, our soups at Taste Haven are made fresh daily with quality ingredients. From the creamy richness of our Tomato Basil Soup to the hearty goodness of our Chicken Noodle, '}></PageCover>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-10">
                    {
                        soups?.map(item => <PopularItem key={item._id} item={item}></PopularItem>)
                    }
                </div>
                <div className="mt-8 text-center">
                    <Link to={"/our-shop"}>
                        <button className="text-xl hover:text-[#BB8506] hover:bg-black uppercase border-b-4 rounded-lg border-black px-4 py-2">Order your favorite food</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default OurMenu;