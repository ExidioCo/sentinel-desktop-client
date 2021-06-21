import * as PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { getSessions, setSessionsSort } from '../../../actions/sessions';
import Loader from '../../../components/Loader';
import Lodash from 'lodash';
import React, { useEffect } from 'react';
import Row from './Row';
import Table from '../../../components/Table';
import TextBox from '../../../components/TextBox';
import moment from 'moment';
import prettyBytes from 'pretty-bytes';
import styles from './index.module.css';

const columns = [{
    id: 'id',
    key: 'id',
    label: 'ID',
    sort: true,
}, {
    id: 'data',
    key: 'bandwidth.download',
    label: 'Received',
    sort: true,
}, {
    id: 'duration',
    key: 'duration',
    label: 'Duration',
    sort: true,
}, {
    id: '',
    key: '',
    label: '',
    sort: false,
}];

const Sessions = ({
    inProgress,
    sessions,
    sessionsCount,
    sessionsDuration,
    sessionsData,
    getSessions,
    setSessionsSort,
    sort,
}) => {
    useEffect(() => {
        getSessions();
    }, []);

    const onClick = (by) => {
        const order = by === sort.by ? sort.order === 'asc' ? 'desc' : 'asc' : 'asc';
        setSessionsSort({
            by,
            order,
        });
    };

    const items = Lodash.orderBy(sessions, [sort.by], [sort.order]);

    return (
        <>
            <TextBox
                className={styles.title}
                value="dVPN Session History"
            />
            <div className={styles.container}>
                {inProgress
                    ? <Loader />
                    : <>
                        <Grid container>
                            <Grid
                                item
                                xs={3}
                            >
                                <div className={styles.figure}>{sessionsCount}</div>
                                <div className={styles.label}>Sessions</div>
                            </Grid>
                            <Grid
                                item
                                xs={6}
                            >
                                <div className={styles.figure}>
                                    {moment.duration(sessionsDuration * 1e-6, 'millisecond').format('h [h] m [m] s [s]')}
                                </div>
                                <div className={styles.label}>Duration</div>
                            </Grid>
                            <Grid
                                item
                                xs={3}
                            >
                                <div className={styles.figure}>{prettyBytes(sessionsData)}</div>
                                <div className={styles.label}>Received</div>
                            </Grid>
                        </Grid>
                        <Table
                            className={`validators-table ${styles.sessionsTable}`}
                            columns={columns}
                            items={items}
                            row={Row}
                            sort={sort}
                            onClick={onClick}
                        />
                    </>}
            </div>
        </>
    );
};

Sessions.propTypes = {
    getSessions: PropTypes.func.isRequired,
    inProgress: PropTypes.bool.isRequired,
    sessions: PropTypes.array.isRequired,
    sessionsCount: PropTypes.number.isRequired,
    sessionsData: PropTypes.number.isRequired,
    sessionsDuration: PropTypes.number.isRequired,
    setSessionsSort: PropTypes.func.isRequired,
    sort: PropTypes.shape({
        by: PropTypes.string.isRequired,
        order: PropTypes.string.isRequired,
    }).isRequired,
};

const stateToProps = (state) => {
    return {
        inProgress: state.sessions.inProgress,
        sessions: state.sessions.items,
        sort: state.sessions.sort,
        sessionsCount: state.sessions.items.length,
        sessionsDuration: Lodash.sumBy(state.sessions.items, (s) => s.duration),
        sessionsData: Lodash.sumBy(state.sessions.items, (s) => s.bandwidth.download),
    };
};

const actionsToProps = {
    setSessionsSort,
    getSessions,
};

export default connect(stateToProps, actionsToProps)(Sessions);
