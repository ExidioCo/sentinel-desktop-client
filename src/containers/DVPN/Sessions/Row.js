import * as PropTypes from 'prop-types';
import Icon from '../../../components/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import moment from 'moment';
import prettyBytes from 'pretty-bytes';
import styles from './index.module.css';

const Row = ({
    item,
}) => {
    return (
        <TableRow key={item.id}>
            <TableCell>
                {item.id}
            </TableCell>
            <TableCell>
                {prettyBytes(item.bandwidth.download)}
            </TableCell>
            <TableCell>
                {moment.duration(item.duration * 1e-6, 'millisecond').format('h [h] m [m] s [s]')}
            </TableCell>
            <TableCell>
                <Tooltip title={moment(item.status_at).format('llll')}>
                    <IconButton>
                        <Icon
                            className={`icon ${styles.time}`}
                            icon="time"
                        />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </TableRow>
    );
};

Row.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number.isRequired,
        bandwidth: PropTypes.shape({
            download: PropTypes.number.isRequired,
        }).isRequired,
        duration: PropTypes.number.isRequired,
        status_at: PropTypes.string.isRequired,
    }).isRequired,
};

export default Row;
