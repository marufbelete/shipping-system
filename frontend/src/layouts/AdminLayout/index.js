import React, { useContext, useEffect, useRef } from 'react';

import Navigation from './Navigation';
import NavBar from './NavBar';
import Breadcrumb from './Breadcrumb';

import useWindowSize from '../../hooks/useWindowSize';
import useOutsideClick from '../../hooks/useOutsideClick';
import { ConfigContext } from '../../contexts/ConfigContext';
import * as actionType from '../../store/actions';
import { useDispatch } from 'react-redux';
import { dashboardActions } from '../../store/dashboard-slice';
const AdminLayout = ({ children }) => {
    const windowSize = useWindowSize();
    const ref = useRef();
    const configContext = useContext(ConfigContext);
    const dispatc=useDispatch()
    const { collapseMenu } = configContext.state;
    const { dispatch } = configContext;

    useOutsideClick(ref, () => {
        if (collapseMenu) {
            dispatch({ type: actionType.COLLAPSE_MENU });
            dispatc(dashboardActions.setSideNav(false))
        }
    });

    useEffect(() => {
        if (windowSize.width > 992 && windowSize.width <= 1024) {
            dispatch({ type: actionType.COLLAPSE_MENU });
            dispatc(dashboardActions.setSideNav(false))
        }
    }, [dispatch, windowSize]);

    const mobileOutClickHandler = () => {
        if (windowSize.width < 992 && collapseMenu) {
            dispatch({ type: actionType.COLLAPSE_MENU });
            dispatc(dashboardActions.setSideNav(false))
        }
    };

    let mainClass = ['pcoded-wrapper'];

    let common = (
        <React.Fragment>
            <Navigation />
        </React.Fragment>
    );

    let mainContainer = (
        <React.Fragment>
            <NavBar />
            <div className="pcoded-main-container">
                <div className={mainClass.join(' ')}>
                    <div className="pcoded-content">
                        <div className="pcoded-inner-content">
                            <Breadcrumb />
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );

    if (windowSize.width < 992) {
        let outSideClass = ['nav-outside'];
        if (collapseMenu) {
            outSideClass = [...outSideClass, 'mob-backdrop'];
        }

        common = (
            <div className={outSideClass.join(' ')} ref={ref}>
                {common}
            </div>
        );

        mainContainer = (
            <div className="pcoded-outside" onClick={() => mobileOutClickHandler}>
                {mainContainer}
            </div>
        );
    }

    return (
        <React.Fragment>
            {common}
            {mainContainer}
        </React.Fragment>
    );
};

export default AdminLayout;