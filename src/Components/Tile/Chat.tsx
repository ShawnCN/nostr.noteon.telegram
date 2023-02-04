

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ChatTile from './ChatTile';
import DialogTitle from './DialogTitle';
import DialogStatus from './DialogStatus';
import { isMeChat } from '../../Utils/Chat';
import ChatStore from '../../Stores/ChatStore';
import './Chat.css';
import { TChat } from '../../react-app-env';




interface IPropsChat {
    chatId: number,
    subtitle: string,
    showSavedMessages: boolean,
    showStatus: boolean,
    showTitle: boolean,
    onSelect: (arg0:number)=>void,
    onTileSelect: (arg0:number)=>void,
    big

}

interface IStateChat {
    chat:TChat | undefined
}



class Chat extends React.Component<IPropsChat,IStateChat> {
    static defaultProps = {
        showSavedMessages: true,
        showStatus: true,
        showTitle: true
    };
    constructor(props) {
        super(props);

        const { chatId } = this.props;
        this.state = {
            chat: ChatStore.get(chatId)
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.chatId !== this.props.chatId;
    }

    handleClick = () => {
        const { chatId, onSelect } = this.props;
        if (!onSelect) return;

        onSelect(chatId);
    };

    render() {
        const { chatId, subtitle, onTileSelect, showStatus, showSavedMessages, big, showTitle } = this.props;

        const isSavedMessages = isMeChat(chatId);

        return (
            <div className={classNames('chat', { 'chat-big': big })} onClick={this.handleClick}>
                <div className='chat-wrapper'>
                    <ChatTile big={big} chatId={chatId} onSelect={onTileSelect} showSavedMessages={showSavedMessages} />
                    {showTitle && (
                        <div className='chat-inner-wrapper'>
                            <div className='tile-first-row'>
                                <DialogTitle chatId={chatId} showSavedMessages={showSavedMessages} />
                            </div>
                            {showStatus && (!isSavedMessages || !showSavedMessages) && (
                                <div className='tile-second-row'>
                                    <DialogStatus chatId={chatId} subtitle={subtitle} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

// Chat.propTypes = {
//     chatId: PropTypes.number.isRequired,
//     subtitle: PropTypes.string,
//     showSavedMessages: PropTypes.bool,
//     showStatus: PropTypes.bool,
//     showTitle: PropTypes.bool,
//     onSelect: PropTypes.func,
//     onTileSelect: PropTypes.func
// };

// Chat.defaultProps = {
//     showSavedMessages: true,
//     showStatus: true,
//     showTitle: true
// };

export default Chat;
