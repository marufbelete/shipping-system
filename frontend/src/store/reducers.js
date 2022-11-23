import { combineReducers } from '@reduxjs/toolkit';
import { reducer as formReducer } from 'redux-form';
import loginSlice from './login-slice';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loadingSlice from './loading-slice';
import errorSlice from './error-slice';
import userinfoSlice from './userinfo-slice';
import modalSlice from './modal-slice';
import tablemodalSlice from './tablemodal-slice'
import shipmentSlice from './shipment-slice';
import userSlice from './user-slice';
import locationSlice from './location-slice';
import hubSlice from './hub-slice';
import customerSlice from './customer-slice';
import dashboardSlice from './dashboard-slice';

const reducers = combineReducers({
    login: persistReducer(
        {
            key: 'account',
            storage,
            keyPrefix: 'datta-'
        },
        loginSlice
    ),
   loading:loadingSlice,
   message:errorSlice,
   dashboard:dashboardSlice,
   modal:modalSlice,
   tablemodal:tablemodalSlice,
   shipment:shipmentSlice,
   users:userSlice,
   customer:customerSlice,
   location:locationSlice,
   hub:hubSlice,
   userinfo:persistReducer(
    {
        key: 'user',
        storage,
        keyPrefix: 'datta-'
    },
    userinfoSlice
),
  
});

export default reducers;
