

import React from 'react';
import PropTypes from 'prop-types';
import './StubMessage.css';

class StubMessage extends React.Component {

    render() {

        return (
            <div className='stub-message'>
                {this.props.children}
            </div>
        );
    }

}

StubMessage.propTypes = {};

export default StubMessage;