

import React from 'react';
import PropTypes from 'prop-types';
import KeyboardButton from './KeyboardButton';
import './KeyboardRow.css';

class KeyboardRow extends React.Component {
    render() {
        const { row } = this.props;
        if (!row) return null;
        if (!row.length) return null;

        return (
            <div className='keyboard-row'>
                {row.map((x, i) => (<KeyboardButton key={i} text={x.text} type={x.type}/>))}
            </div>
        );
    }
}

KeyboardRow.propTypes = {
    row: PropTypes.array
};

export default KeyboardRow;