import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase';
import useAxios from '../Hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [admin, setAdmin] = useState({})
    const [cartData, setCartData] = useState([]);
    const [cartLoading ,setCartLoading] = useState(false)

    const axios = useAxios();
    // CreateUser
    const createUserByEmailPass = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    // LoginByEmailPassword
    const loginByEmailPass = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // Google Login 
    const loginByGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const loginByGithub = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider);
    }

    // logout
    const logout = () => {
        setLoading(true)
        return signOut(auth);
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
            const jwt = { email: currentUser?.email }
            if (currentUser) {
                console.log(currentUser);
                axios.post("/jwt", jwt, { withCredentials: true })
                    .then(async () => {
                        const res = await axios.get(`/user/admin/${currentUser.email}`);
                        setAdmin(res.data)
                        setCartLoading(true)
                        const cartData = await axios.get(`/carts/${currentUser.email}`);
                        setCartData(cartData.data)
                    })
            }
            else {
                axios.post("/logout", jwt, { withCredentials: true })
                // .then(res => console.log(res))
            }
            return () => {
                return unSubscribe()
            }
        })
    }, [axios])
    const authInfo = {
        user,
        createUserByEmailPass,
        logout,
        loginByEmailPass,
        loginByGoogle,
        loading,
        loginByGithub,
        admin,
        cartData,
        cartLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node,
};

export default AuthProvider;