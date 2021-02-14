import Button from '../../../../components/Button';
import React from 'react';

const Add = () => {
    const onClick = () => {
    };
    return (
        <Button
            className="btn button-primary"
            disabled={false}
            inProgress={false}
            value="Add new key"
            onClick={onClick}
        />
    );
};

export default Add;
