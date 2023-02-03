

import React from 'react';
import PropTypes from 'prop-types';
import RichText from '../RichText/RichText';

function Anchor(props) {
    return <a id={props.name} />;
}

Anchor.propTypes = {
    name: PropTypes.string.isRequired
};

export default Anchor;
