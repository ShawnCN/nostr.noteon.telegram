

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import UserTile from './UserTile';
import CloseIcon from '../../Assets/Icons/Close';
import { getUserShortName } from '../../Utils/User';
import './UserChip.css';

class UserChip extends React.Component {
    constructor(props) {
        super(props);

        this.divRef = React.createRef();
    }

    getOffset() {
        const {
            offsetLeft: left,
            offsetTop: top,
            offsetWidth: width,
            offsetHeight: height
        } = this.divRef.current;

        return { left, top, width, height }
    }

    setStyleCSSText(text) {
        const div = this.divRef.current;
        if (!div) return;

        div.style.cssText = text;
    }

    render() {
        const { userId, selected, onClick } = this.props;

        return (
            <div ref={this.divRef} className={classNames('chip', { 'item-selected': selected })} onClick={onClick}>
                <UserTile userId={userId} small={true}/>
                <div className='chip-delete'>
                    <CloseIcon className='chip-delete-icon'/>
                </div>
                <div className='chip-text'>{getUserShortName(userId)}</div>
            </div>
        )
    }
}

UserChip.propTypes = {
    userId: PropTypes.number,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default UserChip;