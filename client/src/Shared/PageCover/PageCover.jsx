import PropTypes from 'prop-types';



const PageCover = ({ title, description, img }) => {
    return (
        <div
            className="hero h-[500px]"
            style={{
                backgroundImage: `url(${img})`,
            }}>
            <div className="hero-overlay lg:max-w-3xl md:max-w-2xl  h-[250px] rounded-lg bg-opacity-70"></div>
            <div className=" hero-content text-neutral-content text-center">
                <div className="max-w-md">
                    <h1 className="mb-5 text-5xl font-bold uppercase font-cinzel-c">{title}</h1>
                    <p className='font-cinzel-c'>{description}</p>
                </div>
            </div>
        </div>
    );
};

PageCover.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    img: PropTypes.string,
};

export default PageCover;