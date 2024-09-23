import SectionTitle from '../SectionTitle/SectionTitle';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FaQuoteLeft } from "react-icons/fa";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'

// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import useFetchReviews from '../../API/useFetchReviews';

const Testimonials = () => {
    const { data, isLoading } = useFetchReviews('/reviews');
    if (isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }

    return (
        <div>
            <SectionTitle heading={"testimonials"} subHeading={'What Our Clients Say'}></SectionTitle>
            <div className="lg:px-28 md:px-12 px-2">
                <Swiper
                    navigation={true}
                    modules={[ Navigation]}
                    className="mySwiper"
                >
                    {
                        data.map(review => <SwiperSlide key={review._id}>
                            <div className='px-12 text-center space-y-5'>
                                <Rating
                                    style={{ maxWidth: 180 }}
                                    value={review.rating}
                                    readOnly
                                    className='mx-auto'
                                />
                                <FaQuoteLeft className='mx-auto text-4xl'/>
                                <p>{review.details}</p>
                                <h3 className='text-2xl md:text-3xl uppercase text-[#CD9003]'>{review.name}</h3>
                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>
        </div>
    );
};

export default Testimonials;