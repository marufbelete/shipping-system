import React, { createContext, useReducer } from 'react';
import * as actionType from '../store/actions';
import { CONFIG } from '../config/constant';
import { useSelector } from 'react-redux';

const initialState = {
    ...CONFIG,
    isOpen: [], //for active default menu
    isTrigger: [] //for active default menu, set blank for horizontal
};
const ConfigContext = createContext(initialState);
const { Provider } = ConfigContext;

const ConfigProvider = ({ children }) => {
    console.log(children)
    let trigger = [];
    let open = [];
    const shownav=useSelector(state=>state.dashboard.show)
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case actionType.COLLAPSE_MENU:
                console.log(state.collapseMenu)
                return {
                    ...state,
                    collapseMenu:shownav
                };
            case actionType.COLLAPSE_TOGGLE:
                if (action.menu.type === 'sub') {
                    open = state.isOpen;
                    trigger = state.isTrigger;

                    const triggerIndex = trigger.indexOf(action.menu.id);
                    if (triggerIndex > -1) {
                        open = open.filter((item) => item !== action.menu.id);
                        trigger = trigger.filter((item) => item !== action.menu.id);
                    }

                    if (triggerIndex === -1) {
                        open = [...open, action.menu.id];
                        trigger = [...trigger, action.menu.id];
                    }
                } else {
                    open = state.isOpen;
                    const triggerIndex = state.isTrigger.indexOf(action.menu.id);
                    trigger = triggerIndex === -1 ? [action.menu.id] : [];
                    open = triggerIndex === -1 ? [action.menu.id] : [];
                }

                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger
                };

            case actionType.NAV_COLLAPSE_LEAVE:
                if (action.menu.type === 'sub') {
                    open = state.isOpen;
                    trigger = state.isTrigger;

                    const triggerIndex = trigger.indexOf(action.menu.id);
                    if (triggerIndex > -1) {
                        open = open.filter((item) => item !== action.menu.id);
                        trigger = trigger.filter((item) => item !== action.menu.id);
                    }
                    return {
                        ...state,
                        isOpen: open,
                        isTrigger: trigger
                    };
                }
                return { ...state };
            case actionType.NAV_CONTENT_LEAVE:
                return {
                    ...state,
                    isOpen: open,
                    isTrigger: trigger
                };

            default:
                throw new Error();
        }
    }, initialState);

    return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { ConfigContext, ConfigProvider };
