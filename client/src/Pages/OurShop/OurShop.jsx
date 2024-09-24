import { useState } from "react";
import useFetchProductCount from "../../API/useFetchProductCount";
import PageCover from "../../Shared/PageCover/PageCover";
import shopBanner from "../../assets/shop/banner2.jpg"
import useFetchShopItem from "../../API/useFetchShopItem";
const OurShop = () => {
    // const { data, isLoading } = useFetchProductCount("item-count")
    const [itemPerPage, setItemPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1);
    const [activeTab, setActiveTab] = useState("");

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1)
    }
    const { data, isError, isLoading } = useFetchShopItem(activeTab, currentPage, itemPerPage);

    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }

    const numberOfPages = Math.ceil(56 / itemPerPage);
    const pages = [...Array(numberOfPages).keys()]
    console.log(currentPage, itemPerPage);


    return (
        <div>
            <PageCover title={'our shop'} img={shopBanner}></PageCover>
            <div>
                <div role="tablist" className="tabs font-bold tabs-bordered max-w-3xl mx-auto mt-12 p-5">
                    <input onClick={() => handleTabChange("")} type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="ALL" defaultChecked />
                    <input onClick={() => handleTabChange("salad")} type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="SALAD " />
                    <input onClick={() => handleTabChange("pizza")} type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="PIZZA" />
                    <input onClick={() => handleTabChange("soup")} type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="SOUPS " />
                    <input onClick={() => handleTabChange("dessert")} type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="DESSERTS" />
                    <input onClick={() => handleTabChange("drink")} type="radio" name="my_tabs_1" role="tab" className="tab" aria-label="DRINKS" />
                </div>
            </div>
            <div className="flex justify-center">
                {
                    pages.map(page => <button
                        className={currentPage == page + 1 ? "bg-[#bb8506] border-2 mx-1 py-3 rounded-full px-5 text-white text-xl" : "border-[#bb8506] border-2 mx-1 py-3 rounded-full px-5 text-black text-xl"}
                        key={page}
                        onClick={() => setCurrentPage(page + 1)}
                    >
                        {page + 1}
                    </button>)
                }
            </div>
        </div>
    );
};

export default OurShop;