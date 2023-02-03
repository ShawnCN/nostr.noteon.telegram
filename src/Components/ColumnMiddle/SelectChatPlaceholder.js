

import React from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import { closeChatSelect } from '../../Actions/Message';
import './SelectChatPlaceholder.css';

class SelectChatPlaceholder extends React.Component {

    handleClick = () => {
        closeChatSelect();
    }

    render() {
        const { t } = this.props;

        return (
            <div className='switch-inline-placeholder' onClick={this.handleClick}>
                <div className='switch-inline-text'>{t('SelectChat') + '...'}</div>
            </div>
        );
    }

}

SelectChatPlaceholder.propTypes = {};

export default withTranslation()(SelectChatPlaceholder);