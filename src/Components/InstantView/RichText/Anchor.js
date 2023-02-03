

import React from 'react';
import PropTypes from 'prop-types';
import RichText from './RichText';

function Anchor(props) {
    const { name, text } = props;

    return (
        <a id={name}>
            {text && <RichText text={text} />}
        </a>
    );
}

Anchor.propTypes = {
    name: PropTypes.string.isRequired,
    text: PropTypes.object
};

export default Anchor;
