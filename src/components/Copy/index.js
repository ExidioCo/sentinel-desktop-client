import './index.css';
import * as PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { showSnackbar } from '../../actions/snackbar';
import { useDispatch } from 'react-redux';
import Icon from '../Icon';
import React from 'react';

const Copy = ({ text }) => {
    const dispatch = useDispatch();

    const showSnack = () => {
        dispatch(showSnackbar({
            message: `Copied to clipboard: ${text}`,
        }));
    };

    return (
        <CopyToClipboard
            text={text}
            onCopy={showSnack}
        >
            <div className="copy-section">
                <div className="flex-center">
                    <Icon
                        className="icon"
                        icon="copy"
                    />
                </div>
            </div>
        </CopyToClipboard>
    );
};

Copy.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Copy;
