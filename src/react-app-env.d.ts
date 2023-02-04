/// <reference types="react-scripts" />

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




