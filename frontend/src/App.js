import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import routes, { renderRoutes } from './routes';
import { BASENAME } from './config/constant';
import { useDispatch,useSelector } from 'react-redux';
import { checkSession } from './store/authhttp';
const App = () => {
  const dispatch=useDispatch()
useEffect(()=>{
    dispatch(checkSession())
},[])
    return (
        <React.Fragment>
            <Router basename={BASENAME}>{renderRoutes(routes)}</Router>
        </React.Fragment>
    );
};

export default App;
