import PropTypes from 'prop-types';

const PopularItem = ({ item }) => {
    console.log(item);
    const { image, name, recipe,price } = item;
    return (
        <div className='flex gap-5'>
            <img src={image} alt="" className='w-24 aspect-square' style={{borderRadius:"0px 200px 200px 200px"}}/>
            <div>
                <h3 className='font-cinzel-c text-xl font-bold'>{name} --------</h3>
                <p className='text-gray-500 text-sm text-justify'>{recipe}</p>
            </div>
            <p className='text-[#BB8506] text-xl'>${price}</p>
        </div>
    );
};

PopularItem.propTypes = {
    item: PropTypes.object,
};

export default PopularItem;