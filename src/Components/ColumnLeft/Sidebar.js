

import React from 'react';
import PropTypes from 'prop-types';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        const { children } = this.props;

        return <div className='sidebar'>{children}</div>;
    }
}

Sidebar.propTypes = {};

export default Sidebar;
