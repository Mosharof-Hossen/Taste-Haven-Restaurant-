import useAuthContext from '../Hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';
import useFetchGetAdmin from '../API/useFetchGetAdmin';
import PropTypes from 'prop-types';

const PrivateAdminRoute = ({ children }) => {
    const { user, loading } = useAuthContext();
    const { data, isLoading } = useFetchGetAdmin()
    console.log(data.admin)
    const location = useLocation();

    if (loading || isLoading) {
        return <div className='text-center mt-32'><span className='loading loading-bars loading-lg'></span></div>
    }

    if (user && data.admin) {
        return children
    }

    return <Navigate to={"/login"} state={location.pathname} ></Navigate>
};

PrivateAdminRoute.propTypes = {
    children: PropTypes.node,
};


export default PrivateAdminRoute;