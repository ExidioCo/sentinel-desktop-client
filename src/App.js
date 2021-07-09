import './App.css';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import React from 'react';
import Snackbar from './containers/common/Snackbar';
import routes from './routes';

const App = () => {
    return (
        <>
            <Switch>
                {
                    routes.map((route) => {
                        return (
                            <Route
                                key={route.path}
                                component={withRouter(route.component)}
                                exact={route.exact}
                                path={route.path}
                            />
                        );
                    })
                }
                <Redirect to={'/'}/>
            </Switch>
            <Snackbar/>
        </>
    );
};

export default App;
