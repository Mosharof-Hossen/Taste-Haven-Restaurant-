import PropTypes from 'prop-types';

const ItemCard = ({ item }) => {
    const { image , name,recipe } = item;
    return (
        <div className="card card-compact bg-base-100 rounded shadow-xl">
            <figure>
                <img
                    src={image}
                    alt="salad" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <button className='text-[#BB8506] text-xl px-3 py-2  border-b-4 border-[#BB8506] rounded-lg bg-gray-100 '>Add To cart</button>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired
};

export default ItemCard;