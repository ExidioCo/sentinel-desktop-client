import {
    ComposableMap,
    Geographies,
    Geography, Marker, ZoomableGroup,
} from 'react-simple-maps';
import { connect } from 'react-redux';
import Icon from '../../../../../components/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './index.module.css';

const geoUrl =
  'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';

const AllIndividualHostsMap = ({ nodes }) => {
    return (
        <>
            <ComposableMap projectionConfig={{ scale: 200 }}>
                <ZoomableGroup zoom={1}>
                    <Geographies fill="#193254" geography={geoUrl} stroke="#193254">
                        {({ geographies }) => geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                            />
                        ))}
                    </Geographies>
                    {nodes.map((node) => (
                        <Marker
                            key={node.address}
                            coordinates={[node.status.location.longitude, node.status.location.latitude]}
                        >
                            <Icon
                                className={styles.marker}
                                icon="marker"
                                width={20}
                            />
                        </Marker>
                    ))}
                </ZoomableGroup>
            </ComposableMap>
        </>
    );
};

AllIndividualHostsMap.propTypes = {
    nodes: PropTypes.arrayOf(
        PropTypes.shape({
            address: PropTypes.string.isRequired,
            status: PropTypes.shape({
                location: PropTypes.shape({
                    latitude: PropTypes.number.isRequired,
                    longitude: PropTypes.number.isRequired,
                }).isRequired,
            }).isRequired,
        }).isRequired,
    ),
};

const stateToProps = (state) => ({
    nodes: Object.values(state.nodes.items),
});

const actionsToProps = {
};

export default connect(stateToProps, actionsToProps)(AllIndividualHostsMap);
