import './index.css';
import * as PropTypes from 'prop-types';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Icon from '../Icon';
import React from 'react';

const Copy = ({ text }) => {
    return (
        <CopyToClipboard text={text}>
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
