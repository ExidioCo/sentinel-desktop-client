import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import AccountCreation from './pages/AccountCreation';
import AccountDetails from './pages/AccountDetails';
import Authentication from './pages/Authentication';
import Configuration from './pages/Configuration';
import Splash from './pages/Splash';

const routes = [{
    path: '/',
    component: Splash,
}, {
    path: '/authentication',
    component: Authentication,
}, {
    path: '/configuration',
    component: Configuration,
}, {
    path: '/keys',
    component: AccountCreation,
}, {
    path: '/keys/:name',
    component: AccountDetails,
}];

const App = () => {
    return (
        <Switch>
            {
                routes.map((route) =>
                    <Route
                        key={route.path}
                        exact
                        component={withRouter(route.component)}
                        path={route.path}/>,
                )
            }
        </Switch>
    );
};

export default App;
