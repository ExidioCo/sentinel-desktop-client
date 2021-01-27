import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Splash from './containers/Splash';

const routes = [{
    path: '/',
    component: Splash,
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
