import * as PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Lodash from 'lodash';
import React from 'react';

const AutocompleteSelectField = ({
    className,
    items,
    value,
    onChange,
}) => {
    return (
        <Autocomplete
            disableClearable
            className={className}
            getOptionLabel={(option) => {
                // TODO: figure out why this function is inconsistent, i.e.
                // option should always be a validator object (see options prop)
                // but for rendering the label of the selected option
                // it is passed the "value" (option.address)
                if (Lodash.isString(option)) {
                    option = Lodash.find(items, (item) => item.address === option);
                }
                return Lodash.get(option, 'description.moniker', '');
            }}
            getOptionSelected={(option, value) => option.address === value}
            options={items}
            renderInput={(params) => <TextField {...params} variant="standard" />}
            value={value}
            onChange={(event, newValue) => onChange(newValue.address)}
        />
    );
};

AutocompleteSelectField.propTypes = {
    className: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    menuItemClassName: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AutocompleteSelectField;
