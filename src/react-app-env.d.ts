/// <reference types="react-scripts" />

import { Relay } from 'nostr-tools';

import { string } from 'prop-types';

export type TMsg = {
  id:number
  chat_id: any;
  sender_id: TSenderId;
  is_outgoing: boolean;
  content: TMsgContent;
  forward_info?:any
  sending_state?:any
  reply_markup?:boolean
  reply_to_message_id?:number;
  date:Date
  media_album_id?:any
   ttl?:any
};
export type TMsgContent = {
  ['@type']: any;
  photo?: any;
  sticker?: any;
  animation?: any;
};
export type TMsgSenderId = {
  ['@type']: any;
  user_id: string;
  chat_id: number;
};

export type TMedia = {
  photoAndVideo: any;
  document: any;
  audio: any;
  url: TMediaUrl[];
  voiceNote: any;
  pinned: any;
};

export type TMediaUrl = {
  id: string;
};

export type TChatId = number | string;

export type TChat = {
  id: number;
  title:string
  positions: any;
  type: TChatType;
  notification_settings: TChatNotificationSettings;
  can_be_reported:boolean
  last_read_outbox_message_id:number
  unread_mention_count:number
  voice_chat_group_call_id:string
  permissions:any
  can_be_deleted_only_for_self:boolean
  can_be_deleted_for_all_users:boolean
  unread_count:number
  draft_message:any
  photo:any
  last_message:TMsg
  is_marked_as_unread:any
  is_sponsored:boolean
  last_read_inbox_message_id:number
  
};
export type TChatType = {
  user_id: number;
  supergroup_id: number;
  basic_group_id:number

  is_channel:boolean
  ['@type']: string;
};

// export type TChatMap = Map<TChat>

export type TChatNotificationSettings = {
  use_default_mute_for: any;
  mute_for: any;
  use_default_disable_pinned_message_notifications: boolean;
  disable_pinned_message_notifications: any;
  use_default_disable_mention_notifications: boolean;
  disable_mention_notifications: any;
};

export type TUser = {
  user_id: string;
  name: string;
  profile_img: string;
  about: string;
  pubkey: string;
  privatekey?: string;
  id: string | number;
  username: string;
  first_name: string;
  second_name: string;
  phone_number?: string;
  last_name: string;
  status: TUserStatus;
  type: Object;
  profile_photo: string;
  is_contact: boolean;
  is_mutual_contact: boolean;
  is_verified?: boolean;
};
export type TUserStatus = {
  ['@type']: any;
};

export type TUserFullInfo ={
  is_blocked: boolean
  bio:string
  can_be_called:boolean
has_private_calls:boolean
supports_video_calls:boolean
}
export type TBasicGroupFullInfo ={
  description:string
  members:TUser[]

}
export type TSuperGroupFullInfo ={
  description:string
  members:TUser[]
  member_count:number
  location:any
  upgraded_from_basic_group_id:number

}

export type TChatStore = {
  chatList: Map<any, any>;
};

export type TUpdate = {
  ['@type']:string
  options?:any
  fileId?: string
  wallpaper?: any

}

// update type
// updateAuthorizationState

export type TChatList = {
  '@type': string
}

export type TAuthorizationState = {
  '@type': string  // authorizationStateClosed
}

export type TConnectionState = {
  '@type': string
}

export type TStyle = {
  height: number;
  left: number;
  position:any;
  right: number;
  top: number;
}
export interface TRelayInstObject {
  [key: string]: Relay;
}

export type TSubscribedChannel = {
  user_id: string;
  type: string;
  // name: string;
  unread: number;
  new_message: string;
  new_message_created_at: number;
};


import { Relay } from 'nostr-tools';

export {};

declare global {
  interface Window {
    nostr: any;
  }
}
// declare module 'redux-persist-cookie-storage';

declare module '*.module.css';
declare module '*.module.scss';

// export type TUser = {
//   user_id: string;
//   name: string;
//   profile_img: string;
//   about: string;
//   pubkey: string;
//   privatekey?: string;
// };

export type TOptions = {
  defaultProtocol: string;
  target: string;
  className: string;
};

export type TMsgcache = {
  [key: string]: TMsgObject[];
};

export type TMsgObject = {
  [key: string]: TMsg;
};

export type TUsermapObject = {
  [key: string]: TUsermap;
};

export type TUsermap = {
  user_id: string;
  name?: string;
  type?: string;
  about?: string;
  profile_img?: string;
  query_time: number;
};

export type TChannelmapObject = {
  [key: string]: TChannelmap;
};

export type TChannelmap = {
  user_id: string;
  name?: string;
  type?: string;
  about?: string;
  profile_img?: string;
  query_time: number;
  creatorPubkey: string;
  created_at: number;
  sig: string;
  relayUrl?: url;
};

// export type TMsg = {
//   id: string;
//   pubkey: string;
//   event_time: number;
//   parent: string;
//   color: string;
//   content: string;
//   replyingTo: string;
//   kind: number;
//   citedMsg?: TCitedMsg;
//   relayUrl?:string
// };

export type TBookmark = {
  id: string;
  pubkey: string;
  event_time: number;
  parent: string;
  color: string;
  name: string; //
  content: string;
  replyingTo: string;
  kind: number;
  citedMsg?: TCitedMsg;
  bm_time: number; //
};

export type TCitedMsg = {
  evtId: string;
  name?: string;
  pubkey: string;
  content: string;
};

export type TLocalPubkeyBlacklist = Array<string>;

export enum ERoomType {
  single = 'single',
  groupChannel = 'groupChannel',
  groupRelay = 'groupRelay',
}
export type chatRoomType = 'single' | 'groupChannel' | 'groupRelay';
export type TSubscribedChannel = {
  user_id: string;
  type: string;
  // name: string;
  unread: number;
  new_message: string;
  new_message_created_at: number;
};

export type TSubDetail = {
  roomId: string;
  type: string;
  relayUrl: string;
  sub: Sub;
};

export type TSubDetailObject = {
  [key: string]: TSubDetail[];
};

export type TSubDetailObject = {
  [key: string]: TSubDetail[];
};

export type TContacts = {
  chatroomList: TSubscribedChannel[];
  pagination: number;
};

export type TEvent = {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: Array<Array<string>>;
  content: string;
  sig: string;
};

export type TDmsinfo = {};

export type TLastViewEvtObj = {
  [key: string]: TLastViewEvt;
};

export type TLastViewEvt = {
  id: string;
  event_time: number;
};

export type TSublist = {
  [key: string]: string;
};

export type TObject = {
  tempChatroomList: TSubscribedChannel[];
  tempPagination: number;
  tempMsg: TMsg;
};

export type TRightProfile = {
  user_id: string;
  type: string;
};

export interface TMsgState {
  msgStore: TMsg[];
}

export interface TNewChannelInfoState {
  newChannelInfo: TChannelmap;
  status: 'none' | 'loading' | 'success' | 'failed';
  searchCount: number;
}

export interface TNewChannelInfoAction {
  type: NewChannelInfoActionType;
  payload: TChannelmap;
}

export interface TRoomListState {
  roomList: TSubscribedChannel[];
  roomMsgs: TRoomMsgs
}

export interface TSocketRelayList {
  socketRelayList: TSocketRelayObject[];
}
export type TUnseenState = {
  // unseen: TUnseenObj
  [key: string]: TUnseen;
};
export type UnseenObj = {};

export interface TLoaderState {
  show: boolean;
}

export enum LoaderType {
  SET_TIP = 'SET_TIP',
}
export interface TLoginTipState {
  tip: string;
}

export interface TLoginTipAction {
  type: TLoginTipType;
  payload: string;
}

export enum NewChannelInfoActionType {
  SET_CHANNEL_INFO = 'SET_CHANNEL_INFO',
}

export interface TUserState {
  user: TUser;
  auth: boolean;
}
export interface TUserAction {
  type: UserActionType;
  payload: TUser;
}

export enum MsgActionType {
  ADD_MSG = 'ADD_MSG',
  ADD_MSGS = 'ADD_MSGS',
  RESET = 'RESET_MSGSTORE',
  SET_MSGS = 'SET_MSGS',
}

export enum RoomListActionType {
  // ADD_ROOM_TO_BOTTOM = 'ADD_ROOM_TO_BOTTOM',
  ADD_ROOM_TO_TOP = 'ADD_ROOM_TO_TOP',
  SET_ROOMLIST = 'SET_ROOMLIST',
  MOVE_ROOM_TO_TOP = 'MOVE_ROOM_TO_TOP',
}

export interface TSocketRelayObject {
  socket: WebSocket;
  relay: Relay;
}

export interface TSocketInstObject {
  [key: string]: WebSocket;
}

export interface TRelayInstObject {
  [key: string]: Relay;
}

export interface TSocketInstState {
  socketInstance: TSocketInstObject;
}

export interface TMsgAction {
  type: MsgActionType;
  payload: TMsg | TMsg[];
}

export interface TRoomListAction {
  type: RoomListActionType;
  payload: TSubscribedChannel | TSubscribedChannel[];
}

export interface TChatState {
  receiver: TSubscribedChannel;
  replyBox: TCitedMsg;
  msgStore: TMsg[];
}
export type TRoomMsgs ={
  [key: string]: TMsg[];

}
export type TChatAction = {
  type: ChatActionType;
  payload: TSubscribedChannel | TCitedMsg;
};

// export interface TLoaderAction {
//   type:LoaderType
//   payload:string
// }
export enum TLoginType {
  SET_SHOW = 'SET_SHOW',
}
export interface TLoaderAction {
  type: LoaderActionType;
  payload: boolean;
}

export type TUnseen = {
  id: string;
  event_time: number;
};

export interface TWss {
  url: string;
  connected: boolean;
  count:number
  roomIds?: string[];
}

export interface TWssObject {
  [key: string]: TWss;
}

export interface TWssState {
  wssCollection: TWssObject;
  onLineCount:number
  createNewChannelInfo:TChannelmap
  createNewChannelRelayUrls:string[]
  roomIdFromUrl: string | null
  roomSubList:TSubDetailObject;
}
export enum TWssCollectionType {
  ADD_WSS = 'ADD_WSS',
  SET_WSSES = 'SET_WSSES',
  WS_CONNECTED = 'WS_CONNECTED',
  WS_DISCONNECTED = 'WS_DISCONNECTED',
}
export interface TWssCollectionAction {
  type: TWssCollectionType;
  payload: TWssState | TWssObject;
}

export type TUpdateOtherRoomListWithNewMsg = {
  parent: string;
  content: string;
  event_time: number;
  unseen: TUnseenState;
  msg: TMsg;
};

export type TUpdateCurrentRoomListWithNewMsg = {
  parent: string;
  content: string;
  event_time: number;
};

`

私聊event格式
{
  "pubkey": "c8d3eb756902f5c99e47c370d4a252fcadbb3b7c0026f489b35ffcf93654e3b6",
  "created_at": 1674122599,
  "kind": 4,
  "tags": [
      [
          "p",
          "2cdbae5a14281406a0add7239aaf8146f85fb1acea15debd128a7bd9610efc8b",
          "wss://relay.nostr.ch"
      ],
      [
          "e",
          "53d03460aca84983710d3a37b9c5a9152c3840450e2ada98580d1fcf06f7a7aa",
          "wss://relay.nostr.ch"
      ]
  ],
  "content": "YO1zBo+4UMBoG+vLgxf6VQ==?iv=+g6grWNnrCsJvbkvPvDwAg==",
  "id": "517bf9640ab9d70ebfe217359efc28dc15ac4e1b0d4620ca23eb862b917910a4",
  "sig": "6f44b6bb83dd49316eea34199ad69db8080f9c828117ac5832aa374f15d8975fd9e61a1bc7cb411d680dae9e53f91db276211035030404513f24fea795f0ed1c"
}



`;




