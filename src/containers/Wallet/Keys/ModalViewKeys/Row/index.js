import Collapse from '@material-ui/core/Collapse';
import Delete from '../DeleteKey/Delete';
import Icon from '../../../../../components/Icon';
import IconButton from '@material-ui/core/IconButton';
import Label from '../../../../../components/Label';
import Password from '../DeleteKey/Password';
import PropTypes from 'prop-types';
import React from 'react';
import SelectKey from './SelectKey';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const Row = ({ item }) => {
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment>
            <TableRow>
                <TableCell component="th" scope="row">
                    {item.name}
                </TableCell>
                <TableCell >{item.address}</TableCell>
                <TableCell><SelectKey/></TableCell>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        <Icon className="delete" icon="delete"/>
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
                    <Collapse unmountOnExit in={open} timeout="auto">
                        <Typography gutterBottom component="div" variant="h6">
                            <div className="form-group">
                                <Label className="label" label="password"/>
                                <Password/>
                            </div>
                            <Delete/>
                        </Typography>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

Row.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
    }).isRequired,
};

export default Row;
