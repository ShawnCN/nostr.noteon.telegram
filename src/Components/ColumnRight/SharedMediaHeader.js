

import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '../../Assets/Icons/Back';
import './SharedMediaHeader.css';

class SharedMediaHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { close } = this.props;

        return (
            <div className='header-master'>
                <IconButton className='header-left-button' onClick={close}>
                    <ArrowBackIcon />
                </IconButton>
                <div className='header-status grow cursor-pointer'>
                    <span className='header-status-content'>Shared Media</span>
                </div>
            </div>
        );
    }
}

export default SharedMediaHeader;
