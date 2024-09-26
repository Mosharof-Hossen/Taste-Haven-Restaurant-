import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import auth from '../Firebase/Firebase';
import useAxios from '../Hooks/useAxios';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
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
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
            const jwt = { email: currentUser?.email }
            if (currentUser) {
                axios.post("/jwt", jwt, { withCredentials: true })
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
        loginByGithub
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