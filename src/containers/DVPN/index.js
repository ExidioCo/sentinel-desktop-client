import * as PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getStatus } from '../../actions/status';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Nodes from './Nodes';
import React, { useEffect } from 'react';
import Sessions from './Sessions';
import styles from './index.module.css';

const DVPN = (props) => {
    useEffect(() => {
        props.getStatus();
    }, []);

    const handleClick = () => {
    };

    return (
        <Grid
            container
            className={styles.root}
        >
            <Grid
                item
                md={4}
                xs={12}
            >
                <div className={styles.connectionStatus}>
                    {props.inProgress
                        ? <Loader />
                        : (
                            <>
                                <p>Your connection is {!props.connected && 'not'} secure!</p>
                                <p>Your IP: <span className={props.connected ? styles.connected : styles.notConnected}>
                                    {props.address}
                                </span>
                                </p>
                                <Button
                                    className="btn button-primary button-large"
                                    disabled={false}
                                    inProgress={false}
                                    type="button"
                                    value="Quick Connect"
                                    onClick={handleClick}
                                />
                            </>
                        )}
                </div>
                <Sessions />
            </Grid>
            <Grid
                item
                className={styles.connectionOptions}
                md={8}
                xs={12}
            >
                <Nodes />
            </Grid>
        </Grid>
    );
};

DVPN.propTypes = {
    address: PropTypes.string.isRequired,
    connected: PropTypes.bool.isRequired,
    getStatus: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.status.inProgress,
        connected: state.status.info.connected,
        address: state.status.info.address,
    };
};

const actionsToProps = {
    getStatus,
};

export default connect(stateToProps, actionsToProps)(DVPN);
