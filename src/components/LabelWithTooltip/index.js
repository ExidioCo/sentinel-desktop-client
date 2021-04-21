import './index.css';
import * as PropTypes from 'prop-types';
import ButtonBase from '@material-ui/core/ButtonBase';
import Icon from '../Icon';
import Label from '../Label';
import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import helpText from '../../assets/helpText.json';

const LabelWithTooltip = ({ label }) => (
    <div className="label-icon">
        <Label
            className="label"
            label={label}
        />
        <Tooltip
            className="tooltip-section"
            title={helpText[label]}
        >
            <ButtonBase>
                <Icon
                    className="icon"
                    icon="tooltip"
                />
            </ButtonBase>
        </Tooltip>
    </div>
);

LabelWithTooltip.propTypes = {
    label: PropTypes.string.isRequired,
};

export default LabelWithTooltip;
