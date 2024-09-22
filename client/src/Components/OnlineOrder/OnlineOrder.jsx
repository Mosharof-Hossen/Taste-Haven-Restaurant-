import SectionTitle from "../SectionTitle/SectionTitle";
import { Swiper, SwiperSlide } from 'swiper/react';
import slide1 from "../../assets/home/slide1.jpg"
import slide2 from "../../assets/home/slide2.jpg"
import slide3 from "../../assets/home/slide3.jpg"
import slide4 from "../../assets/home/slide4.jpg"
import slide5 from "../../assets/home/slide5.jpg"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { Pagination } from 'swiper/modules';

const OnlineOrder = () => {
    return (
        <div className="p-5">
            <SectionTitle heading={"order online"} subHeading={"From 11:00am to 10:00pm"}></SectionTitle>

            <div>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper "
                >
                    <SwiperSlide>
                        <img src={slide1} className=""/>
                        <h4 className="uppercase text-center -m-8 font-semibold font-cinzel-c">salad</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide2} />
                        <h4 className="uppercase text-center -m-8 font-semibold font-cinzel-c">Pizzas</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide3} />
                        <h4 className="uppercase text-center -m-8 font-semibold font-cinzel-c">desserts</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide4} />
                        <h4 className="uppercase text-center -m-8 font-semibold font-cinzel-c">Dry Cake</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide5} />
                        <h4 className="uppercase text-center -m-8 font-semibold font-cinzel-c">salad</h4>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={slide5} />
                    </SwiperSlide>
                    
                </Swiper>
            </div>
        </div>
    );
};

export default OnlineOrder;