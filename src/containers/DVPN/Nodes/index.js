import { Grid, Tab } from '@material-ui/core';
import { TabContext, TabList } from '@material-ui/lab';
import { connect } from 'react-redux';
import { getNodes } from '../../../actions/nodes';
import { getPlans } from '../../../actions/plans';
import { getProviders } from '../../../actions/providers';
import { getSubscriptions } from '../../../actions/subscriptions/data';
import { setSelectedTab, setShowMap, toggleShowSubscribed } from '../../../actions/ui/dvpn';
import AllIndividualHostsMap from './IndividualHosts/AllIndividualHostsMap';
import AllIndividualHostsTable from './IndividualHosts/AllIndividualHostsTable';
import AllNodeProvidersTable from './NodeProviders/AllNodeProvidersTable';
import Icon from '../../../components/Icon';
import PropTypes from 'prop-types';
import React, { createElement, useEffect } from 'react';
import SubscribedIndividualHostsMap from './IndividualHosts/SubscribedIndividualHostsMap';
import SubscribedIndividualHostsTable from './IndividualHosts/SubscribedIndividualHostsTable';
import SubscribedNodeProvidersTable from './NodeProviders/SubscribedNodeProvidersTable';
import clsx from 'clsx';
import styles from './index.module.css';

const views = [
    AllNodeProvidersTable, <></>, SubscribedNodeProvidersTable, <></>,
    AllIndividualHostsTable, AllIndividualHostsMap,
    SubscribedIndividualHostsTable, SubscribedIndividualHostsMap,
];

const Nodes = (props) => {
    useEffect(() => {
        props.getNodes();
        props.getProviders().then((res) => {
            const providers = res.data || {};
            providers.map((provider) => props.getPlans(provider.address));
        });
        props.getSubscriptions();
    }, []);

    const getViewMask = () => {
        return (props.selectedTab << 2) + (props.showSubscribed << 1) + (props.showMap << 0);
    };

    return (
        <>
            <TabContext value={props.selectedTab}>
                <Grid
                    container
                    alignItems="center"
                    className={styles.tabBar}
                >
                    <Grid
                        item
                        md={6}
                        xs={12}
                    >
                        <TabList
                            classes={{
                                indicator: styles.selectedTabIndicator,
                            }}
                            onChange={(_, t) => props.setSelectedTab(t)}
                        >
                            <Tab
                                disableRipple
                                classes={{
                                    root: styles.tab,
                                    selected: styles.selectedTab,
                                }}
                                label={
                                    <Grid
                                        container
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Icon
                                                className={styles.tabIcon}
                                                icon="server"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <div className={styles.tabIconLabel}>
                                                Node Providers
                                            </div>
                                        </Grid>
                                    </Grid>
                                }
                            />
                            <Tab
                                disableRipple
                                classes={{
                                    root: styles.tab,
                                    selected: styles.selectedTab,
                                }}
                                label={
                                    <Grid
                                        container
                                        alignItems="center"
                                    >
                                        <Grid item>
                                            <Icon
                                                className={styles.tabIcon}
                                                icon="person"
                                            />
                                        </Grid>
                                        <Grid item>
                                            <div className={styles.tabIconLabel}>
                                                Individual Hosts
                                            </div>
                                        </Grid>
                                    </Grid>
                                }
                            />
                        </TabList>
                    </Grid>
                    <Grid
                        container
                        item
                        justify="flex-end"
                        md={6}
                        spacing={1}
                        xs={12}
                    >
                        <Grid item>
                            <div
                                className={clsx({
                                    [styles.cornerIconContainer]: true,
                                    [styles.selectedCornerIcon]: !props.showMap,
                                })}
                                onClick={() => props.setShowMap(0)}
                            >
                                <Icon
                                    className={styles.cornerIcon}
                                    icon="table"
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <div
                                className={clsx({
                                    [styles.cornerIconContainer]: true,
                                    [styles.selectedCornerIcon]: props.showMap,
                                    [styles.disabledCornerIcon]: props.selectedTab === 0,
                                })}
                                onClick={() => props.setShowMap(1)}
                            >
                                <Icon
                                    className={styles.cornerIcon}
                                    icon="location"
                                />
                            </div>
                        </Grid>
                        <Grid item>
                            <div
                                className={clsx({
                                    [styles.cornerIconContainer]: true,
                                    [styles.selectedCornerIcon]: props.showSubscribed,
                                })}
                                onClick={props.toggleShowSubscribed}
                            >
                                <Icon
                                    className={styles.cornerIcon}
                                    icon="heart"
                                />
                                <div className={styles.cornerIconLabel}>
                                    Subscribed
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <div className={styles.tabContentContainer}>
                    {createElement(views[getViewMask()])}
                </div>
            </TabContext>
        </>);
};

Nodes.propTypes = {
    getNodes: PropTypes.func.isRequired,
    getPlans: PropTypes.func.isRequired,
    getProviders: PropTypes.func.isRequired,
    getSubscriptions: PropTypes.func.isRequired,
    selectedTab: PropTypes.number.isRequired,
    setSelectedTab: PropTypes.func.isRequired,
    setShowMap: PropTypes.func.isRequired,
    showMap: PropTypes.number.isRequired,
    showSubscribed: PropTypes.number.isRequired,
    toggleShowSubscribed: PropTypes.func.isRequired,
};

const stateToProps = (state) => {
    return {
        selectedTab: state.ui.dvpn.activeView.selectedTab,
        showMap: state.ui.dvpn.activeView.showMap,
        showSubscribed: state.ui.dvpn.activeView.showSubscribed,
    };
};

const actionsToProps = {
    getNodes,
    getPlans,
    getProviders,
    getSubscriptions,
    setSelectedTab,
    toggleShowSubscribed,
    setShowMap,
};

export default connect(stateToProps, actionsToProps)(Nodes);
