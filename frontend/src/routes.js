import React, { Suspense, Fragment, lazy } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import AdminLayout from './layouts/AdminLayout';
import AuthGuard from './components/Auth/AuthGuard';

import { BASE_URL } from './config/constant';

export const renderRoutes = (routes = []) => (
    <Suspense fallback={<Loader />}>
        <Switch>
            {routes.map((route, i) => {
                const Guard = route.guard || Fragment;
                const Layout = route.layout || Fragment;
                const Component = route.component;

                return (
                    <Route
                        key={i}
                        path={route.path}
                        exact={route.exact}
                        render={(props) => (
                            <Guard>
                                <Layout>{route.routes ? renderRoutes(route.routes) : <Component {...props} />}</Layout>
                            </Guard>
                        )}
                    />
                );
            })}
        </Switch>
    </Suspense>
);

const routes = [
    {
        exact: true,
        path: '/signin',
        component: lazy(() => import('./views/auth/signin/SignIn'))
    },
    {
        exact: true,
        path: '/forgotpassword',
        component: lazy(() => import('./views/auth/reset/Forgotpassword'))
    },
    {
        exact: true,
        path: '/checkemail',
        component: lazy(() => import('./views/auth/reset/CheckEmail'))
    },

    {
        exact: true,
        path: '/resetpassword/:token',
        component: lazy(() => import('./views/auth/reset/Resetpassword'))
    },
    {
        path: '*',
        layout: AdminLayout,
        guard: AuthGuard,
        routes: [
            {
                exact: true,
                path: '/dashboard',
                component: lazy(() => import('./views/dashboard/DashDefault'))
            },
            {
                exact: true,
                path: '/changepassword',
                component: lazy(() => import('./views/auth/reset/Changepassword'))
            },

            {
                exact: true,
                path: '/allshipment',
                component: lazy(() => import('./views/shipment/Allshipment'))
            },
            {
                exact: true,
                path: '/customer',
                component: lazy(() => import('./views/shipment/Customer'))
            },
            {
                exact: true,
                path: '/shipmentdispatch',
                component: lazy(() => import('./views/shipment/Dispatch&Assignment'))
            },
            {
                exact: true,
                path: '/manualassignment',
                component: lazy(() => import('./views/shipment/Manualassignment'))
            },
            {
                exact: true,
                path: '/shipmentreturned',
                component: lazy(() => import('./views/shipment/Shipmentreturned'))
            },
            {
                exact: true,
                path: '/warehouse',
                component: lazy(() => import('./views/shipment/Warehouse'))
            },
            {
                exact: true,
                path: '/driver',
                component: lazy(() => import('./views/shipment/Driver'))
            },

            {
                exact: true,
                path: '/adduser',
                component: lazy(() => import('./views/shipment/Adduser'))
            },
            {
                exact: true,
                path: '/codbalance',
                component: lazy(() => import('./views/shipment/CODBalance'))
            },
            {
                exact: true,
                path: '/ticket&support',
                component: lazy(() => import('./views/shipment/Ticket'))
            },
            {
                exact: true,
                path: '/profile',
                component: lazy(() => import('./views/main/profile'))
            },
            
            {
                exact: true,
                path: '/manageuser',
                component: lazy(() => import('./views/shipment/Manageuser'))
            },
            {
                exact: true,
                path: '/location&hub',
                component: lazy(() => import('./views/shipment/Location&Hub'))
            },
            {
                exact: true,
                path: '/ticket&support/:ticketid',
                component: lazy(() => import('./views/shipment/Ticketdetail'))
            },
            {
                exact: true,
                path: '/coddetail/:codid',
                component: lazy(() => import('./views/shipment/CODdetail'))
            },
            {
                exact: true,
                path: '/userdetail/:userid',
                component: lazy(() => import('./views/shipment/Userdetail'))
            },
            {
                path: '*',
                exact: true,
                component: () => <Redirect to={BASE_URL} />
            }
        ]
    }
];

export default routes;
