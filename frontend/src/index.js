import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from './contexts/ConfigContext';
import { PersistGate } from 'redux-persist/integration/react';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { store, persister } from './store';
import { CookiesProvider } from 'react-cookie';
import {ApolloClient,InMemoryCache,ApolloProvider,HttpLink} from '@apollo/client'
const client=new ApolloClient({
    cache:new InMemoryCache,
    link:new HttpLink({
        uri:"http://localhost:8000/graphql",
        credentials: "include",
    })
})
ReactDOM.render(
    
    <ApolloProvider client={client}>
    <Provider store={store}>
            <PersistGate loading={null} persistor={persister}>
                <CookiesProvider>
                <ConfigProvider>
                <App />
                </ConfigProvider>
                </CookiesProvider>
            </PersistGate>
    </Provider>
    </ApolloProvider>,
    document.getElementById('root')
);
reportWebVitals();
