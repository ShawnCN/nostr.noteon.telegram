

import React, { Component } from 'react';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import IconButton from '@material-ui/core/IconButton';
import PlaylistEditIcon from '../../Assets/Icons/PlaylistEdit';
import SearchIcon from '../../Assets/Icons/Search';
import MainMenuButton from './MainMenuButton';
import HeaderChat from '../Tile/HeaderChat';
import HeaderCommand from './HeaderCommand';
import HeaderProgress from './HeaderProgress';
import PinnedMessage from './PinnedMessage';
import { changeChatDetailsVisibility } from '../../Actions/Chat';
import {
    getChatSubtitle,
    getChatTitle,
    isAccentChatSubtitle
} from '../../Utils/Chat';
import { openChat, searchChat } from '../../Actions/Client';
import AppStore from '../../Stores/ApplicationStore';
import ChatStore from '../../Stores/ChatStore';
import MessageStore from '../../Stores/MessageStore';
import TdLibController from '../../Controllers/TdLibController';
import './Header.css';
import { TAuthorizationState, TConnectionState } from '../../react-app-env';

interface IProps {
    t:any
}
interface IState {
    chatId:number
    pinned:any
    authorizationState: TAuthorizationState
    connectionState: TConnectionState
    selectionCount:number
}

class Header extends Component<IProps,IState> {
    constructor(props:any) {
        super(props);

        const chatId = AppStore.getChatId();
        const media = MessageStore.getMedia(chatId);
        const pinned = media ? media.pinned : [];

        this.state = {
            chatId,
            pinned,
            authorizationState: AppStore.getAuthorizationState(),
            connectionState: AppStore.getConnectionState()
        } as IState;
    }

    componentDidMount() {
        AppStore.on('clientUpdateChatId', this.onClientUpdateChatId);
        AppStore.on('updateAuthorizationState', this.onUpdateAuthorizationState);
        AppStore.on('updateConnectionState', this.onUpdateConnectionState);

        MessageStore.on('clientUpdateChatMedia', this.onClientUpdateChatMedia);
        MessageStore.on('clientUpdateClearSelection', this.onClientUpdateMessageSelected);
        MessageStore.on('clientUpdateMessageSelected', this.onClientUpdateMessageSelected);
        MessageStore.on('updateMessageIsPinned', this.onUpdateMessageIsPinned);
    }

    componentWillUnmount() {
        AppStore.off('clientUpdateChatId', this.onClientUpdateChatId);
        AppStore.off('updateAuthorizationState', this.onUpdateAuthorizationState);
        AppStore.off('updateConnectionState', this.onUpdateConnectionState);

        MessageStore.off('clientUpdateChatMedia', this.onClientUpdateChatMedia);
        MessageStore.off('clientUpdateClearSelection', this.onClientUpdateMessageSelected);
        MessageStore.off('clientUpdateMessageSelected', this.onClientUpdateMessageSelected);
        MessageStore.off('updateMessageIsPinned', this.onUpdateMessageIsPinned);
    }

    onUpdateMessageIsPinned = (update:any) => {
        // @ts-ignore
        const { chatId } = this.state;
        const { chat_id } = update;
        if (chatId !== chat_id) return;

        this.setPinnedState();
    };

    onClientUpdateChatMedia = (update:any) => {
        // @ts-ignore
        const { chatId: currentChatId } = this.state;
        const { chatId } = update;
        if (chatId !== currentChatId) return;

        this.setPinnedState();
    };

    setPinnedState() {
        const { chatId } = this.state;

        const media = MessageStore.getMedia(chatId);
        const pinned = media ? media.pinned : [];

        this.setState({ pinned });
    }

    onClientUpdateMessageSelected = (update:any) => {
        // @ts-ignore
        this.setState({ selectionCount: MessageStore.selectedItems.size });
    };

    onClientUpdateChatId = (update:any) => {
        const chatId = AppStore.getChatId();
        const media = MessageStore.getMedia(chatId);
        const pinned = media ? media.pinned : [];

        this.setState({
            chatId,
            pinned
        });
    };

    onUpdateConnectionState = (update:any) => {
        this.setState({ connectionState: update.state });
    };

    onUpdateAuthorizationState = (update:any) => {
        this.setState({ authorizationState: update.authorization_state });
    };

    openChatDetails = () => {
        const { chatId } = this.state;
        const chat = ChatStore.get(chatId);
        if (!chat) return;

        const { isSmallWidth } = AppStore;

        if (isSmallWidth) {
            openChat(chatId, null, true);
        } else {
            changeChatDetailsVisibility(true);
        }
    };

    handleSearchChat = () => {
        const { chatId } = this.state;
        const chat = ChatStore.get(chatId);
        if (!chat) return;

        searchChat(chatId);
    };

    localize = (str:string) => {
        const { t } = this.props;

        return t(str)
            .replace('...', '')
            .replace('…', '');
    };

    handleMouseDown = (event: any) => {
        event.stopPropagation();
    };

    handlePinClick = () => {
        const { chatId } = this.state;

        TdLibController.clientUpdate({
            '@type': 'clientUpdateOpenPinned',
            chatId
        })
    };

    render() {
        const { t } = this.props;
        const {
            chatId,
            pinned,
            authorizationState,
            connectionState,
            selectionCount,
        } = this.state;

        const chat = ChatStore.get(chatId);

        const isAccentSubtitle = isAccentChatSubtitle(chatId);
        // let title = getChatTitle(chatId, true, t);
        let title = getChatTitle(chatId, true);
        let subtitle = getChatSubtitle(chatId, true);
        let showProgressAnimation = false;

        if (connectionState) {
            switch (connectionState['@type']) {
                case 'connectionStateConnecting':
                    title = this.localize('Connecting');
                    subtitle = '';
                    showProgressAnimation = true;
                    break;
                case 'connectionStateConnectingToProxy':
                    title = this.localize('Connecting to proxy');
                    subtitle = '';
                    showProgressAnimation = true;
                    break;
                case 'connectionStateReady':
                    break;
                case 'connectionStateUpdating':
                    title = this.localize('Updating');
                    subtitle = '';
                    showProgressAnimation = true;
                    break;
                case 'connectionStateWaitingForNetwork':
                    title = this.localize('Waiting for network');
                    subtitle = '';
                    showProgressAnimation = true;
                    break;
            }
        } else if (authorizationState) {
            switch (authorizationState['@type']) {
                case 'authorizationStateClosed':
                    break;
                case ' authorizationStateClosing':
                    break;
                case 'authorizationStateLoggingOut':
                    title = this.localize('Logging out');
                    subtitle = '';
                    showProgressAnimation = true;
                    break;
                case 'authorizationStateReady':
                    break;
                case 'authorizationStateWaitCode':
                    break;
                case 'authorizationStateWaitEncryptionKey':
                    title = this.localize('Loading');
                    subtitle = '';
                    showProgressAnimation = true;
                    break;
                case 'authorizationStateWaitPassword':
                    break;
                case 'authorizationStateWaitPhoneNumber':
                    break;
                case 'authorizationStateWaitTdlibParameters':
                    title = this.localize('Loading');
                    subtitle = '';
                    showProgressAnimation = true;
                    break;
            }
        } else {
            title = this.localize('Loading');
            subtitle = '';
            showProgressAnimation = true;
        }

        return (
            <div className={classNames('header-details', { 'header-details-selection': selectionCount > 0 })}>
                <div className='header-details-content'>
                    <HeaderCommand count={selectionCount} />
                    <div className='header-details-row'>
                        {showProgressAnimation ? (
                            <div
                                className={classNames('header-status', 'grow', chat ? 'cursor-pointer' : 'cursor-default')}
                                onClick={this.openChatDetails}>
                                <span className='header-status-content'>{title}</span>
                                <HeaderProgress />
                                <span className={classNames('header-status-title', { 'header-status-accent': isAccentSubtitle })}>
                                    {subtitle}
                                </span>
                                <span className='header-status-tail' />
                            </div>
                        ) : (
                            <HeaderChat
                                className={classNames('grow', 'cursor-pointer')}
                                chatId={chatId}
                                onClick={this.openChatDetails}
                            />
                        )}
                        <PinnedMessage chatId={chatId} />
                        {chat && (
                            <div className='header-right-buttons'>
                                { pinned.length > 1 && (
                                    <IconButton
                                        aria-label='Pins'
                                        onClick={this.handlePinClick}
                                        onMouseDown={this.handleMouseDown}>
                                        <PlaylistEditIcon />
                                    </IconButton>
                                )}
                                <IconButton
                                    aria-label='Search'
                                    onClick={this.handleSearchChat}>
                                    <SearchIcon />
                                </IconButton>
                                <MainMenuButton openChatDetails={this.openChatDetails} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(Header);
