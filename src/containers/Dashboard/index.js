import * as PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getConfiguration, putConfiguration } from '../../actions/configuration';
import { getKeys } from '../../actions/keys';
import Async from 'async';
import Loader from '../../components/Loader';
import React, { useEffect, useState } from 'react';
import SidebarDashboard from './SidebarDashboard';
import Wallet from '../Wallet';

const Dashboard = (props) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Async.waterfall([
            (next) => {
                props.getConfiguration(
                    props.history,
                    next,
                );
            }, (next) => {
                props.getKeys(
                    props.history,
                    next,
                );
            }, (next) => {
                props.putConfiguration(
                    '',
                    next,
                );
            }, (next) => {
                setLoading(false);
                next(null);
            },
        ], () => ({}));
    }, []);

    if (loading) {
        return <Loader/>;
    }

    return (
        <div className="root">
            <SidebarDashboard
                history={props.history}
                location={props.location}
            />
            <div className="content">
                <Switch>
                    <Route
                        key="wallet"
                        component={withRouter(Wallet)}
                        path={`${props.match.path}/wallet`}
                    />
                </Switch>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    getConfiguration: PropTypes.func.isRequired,
    getKeys: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    match: PropTypes.shape({
        path: PropTypes.string.isRequired,
    }).isRequired,
    putConfiguration: PropTypes.func.isRequired,
};

const actionsToProps = {
    getConfiguration: getConfiguration,
    getKeys: getKeys,
    putConfiguration: putConfiguration,
};

export default connect(null, actionsToProps)(Dashboard);
