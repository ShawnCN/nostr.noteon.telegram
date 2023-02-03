

import React from 'react';
import PropTypes from 'prop-types';
import TuneIcon from '../../Assets/Icons/Tune';
import { stopPropagation } from '../../Utils/Message';
import './GroupCallSettingsButton.css';

class GroupCallSettingsButton extends React.Component {
    render() {
        const { onClick } = this.props;

        return (
            <div className='group-call-settings-button' onMouseDown={stopPropagation} onClick={onClick}>
                <TuneIcon />
            </div>
        );
    }
}

GroupCallSettingsButton.propTypes = {
    groupCallId: PropTypes.number,
    onClick: PropTypes.func
};

export default GroupCallSettingsButton;