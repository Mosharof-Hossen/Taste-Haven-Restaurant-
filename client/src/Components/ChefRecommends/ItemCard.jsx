import PropTypes from 'prop-types';
import useAuthContext from '../../Hooks/useAuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import useFetchPostCartItem from '../../API/useFetchPostCartItem';

const ItemCard = ({ item }) => {
    const { image, name, recipe } = item;
    const { user } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();
    const cartsMutation = useFetchPostCartItem()
    const handleCart = (item) => {
        if (!user) {
            navigate("/login", { state: location.pathname });
        }
        else {
            cartsMutation.mutate({
                userEmail: user.email,
                itemId: item._id,
                itemName: item.name,
                price: item.price,
                image: item.image,
                category: item.category
            })
        }
    }
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
                <button onClick={() => handleCart(item)} className='text-[#BB8506] text-xl px-3 py-2  border-b-4 border-[#BB8506] rounded-lg bg-gray-100 '>Add To cart</button>
            </div>
        </div>
    );
};

ItemCard.propTypes = {
    item: PropTypes.object.isRequired
};

export default ItemCard;