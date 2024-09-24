import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const useAuthContext = () => {
    return useContext(AuthContext);
};

export default useAuthContext;