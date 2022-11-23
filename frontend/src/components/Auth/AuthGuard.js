import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { errorActions } from '../../store/error-slice';
const AuthGuard = ({ children }) => {
    const dispatch=useDispatch()
    const loginState = useSelector((state) => state.login);
    const { isAuthenticated } = loginState;
    dispatch(errorActions.Message(''))
console.log('guard')
console.log(isAuthenticated)
    if (isAuthenticated) {
        return <Redirect to="/signin" />;
    }

    return children;
};

export default AuthGuard;
