import * as PropTypes from 'prop-types';
import React from 'react';
import ChipButton from '../../components/ChipButton';

const options = [
    {
        key: 'Simulate',
        option: true,
        value: 'Yes',
    },
    {
        key: 'Execute',
        option: false,
        value: 'No',
    },
];

const SimulateExecute = (props) => {
    const onClick = (value) => {
    };

    return (
        <div className="button-group">
            {
                options.map((item) => {
                    return (
                        <ChipButton
                            key={item.key}
                            className={props.value === item.option ? 'selected' : 'primary'}
                            type="button"
                            value={item.value}
                            onClick={() => onClick(item.option)}
                        />
                    );
                })
            }
        </div>
    );
};

SimulateExecute.propTypes = {
    value: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SimulateExecute;
