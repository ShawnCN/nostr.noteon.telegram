import EventEmitter from '../Stores/EventEmitter';
import packageJson from '../../package.json';
import { stringToBoolean, getBrowser, getOSName } from '../Utils/Common';
import {
  DATABASE_NAME,
  DATABASE_TEST_NAME,
  defaultChatroomList,
  stage3relays,
  UPDATE,
  VERBOSITY_JS_MAX,
  VERBOSITY_JS_MIN,
  VERBOSITY_MAX,
  VERBOSITY_MIN,
  WASM_FILE_HASH,
  WASM_FILE_NAME,
} from '../Constants';
import TdClient from 'tdweb/dist/tdweb';
import {
  TCitedMsg,
  TEvent,
  TRelayInstObject,
  TSubDetailObject,
  TSubscribedChannel,
  TUser,
} from '../react-app-env';
import { getEventHash, nip04, Relay, relayInit, signEvent } from 'nostr-tools';
// import TdClient from '@arseny30/tdweb/dist/tdweb';
// import TdClient from '../../public/tdweb';

function databaseExists(dbname, callback: (arg0: boolean) => any) {
  var req = indexedDB.open(dbname);
  var existed = true;
  req.onsuccess = function () {
    req.result.close();
    if (!existed) indexedDB.deleteDatabase(dbname);
    callback(existed);
  };
  req.onupgradeneeded = function () {
    existed = false;
  };
}

class TdLibController extends EventEmitter {
  disableLog: any;
  parameters: {
    useTestDC: boolean;
    readOnly: boolean;
    verbosity: number;
    jsVerbosity: number;
    fastUpdating: boolean;
    useDatabase: boolean;
    mode: string;
    tag?: string[];
    tagVerbosity?: any;
  };
  streaming: boolean;
  calls: boolean;
  client: any;
  relayInstance: TRelayInstObject;
  subList: TSubDetailObject;
  constructor() {
    super();
    this.relayInstance = {} as TRelayInstObject;
    let subList = {} as TSubDetailObject;

    this.parameters = {
      useTestDC: false,
      readOnly: false,
      verbosity: 1,
      jsVerbosity: 3,
      fastUpdating: true,
      useDatabase: false,
      mode: 'wasm',
    };

    this.disableLog = true;
    this.streaming = true;
    this.calls = false;

    this.setParameters(window.location);
  }

  init = () => {
    const {
      verbosity,
      jsVerbosity,
      useTestDC,
      readOnly,
      fastUpdating,
      useDatabase,
      mode,
    } = this.parameters;
    const instanceName = useTestDC ? DATABASE_TEST_NAME : DATABASE_NAME;
    for (let i = 0; i < stage3relays.length; i++) {
      const pubkey = '33333';
      this.connectAndJoin(stage3relays[i], pubkey);
    }

    databaseExists(instanceName, (exists) => {
      this.clientUpdate({ '@type': 'clientUpdateTdLibDatabaseExists', exists });

      let options = {
        logVerbosityLevel: verbosity,
        jsLogVerbosityLevel: jsVerbosity,
        mode, // 'wasm-streaming', 'wasm', 'asmjs'
        instanceName,
        readOnly,
        isBackground: false,
        useDatabase,
        wasmUrl: `${WASM_FILE_NAME}?_sw-precache=${WASM_FILE_HASH}`,
        // onUpdate: update => this.emit('update', update)
      };

      console.log(
        `[TdLibController] (fast_updating=${fastUpdating}) Start client with params=${JSON.stringify(
          options
        )}`
      );

      this.client = new TdClient(options);
      // this.client.onUpdate = update => {
      //     if (!this.disableLog) {
      //         if (update['@type'] === 'updateFile') {
      //             console.log('receive updateFile file_id=' + update.file.id, update);
      //         } else {
      //             console.log('receive update', update);
      //         }
      //     }
      //     this.emit('update', update);
      // };
      const update = {
        ['@type']: UPDATE.AuthorizationState,
        authorization_state: {},
      };
      this.emit('update', update);
    });
  };

  clientUpdate = (update) => {
    if (!this.disableLog) {
      console.log('clientUpdate', update);
    }
    this.emit('clientUpdate', update);
  };

  setParameters = (location) => {
    if (!location) return;

    const { search } = location;
    if (!search) return;

    const params = new URLSearchParams(search.toLowerCase());

    if (params.has('test')) {
      this.parameters.useTestDC = stringToBoolean(params.get('test'));
    }

    if (params.has('verbosity')) {
      const verbosity = parseInt(params.get('verbosity')!, 10);
      if (verbosity >= VERBOSITY_MIN && verbosity <= VERBOSITY_MAX) {
        this.parameters.verbosity = verbosity;
      }
    }

    if (params.has('jsverbosity')) {
      const jsVerbosity = parseInt(params.get('jsverbosity')!, 10);
      if (jsVerbosity >= VERBOSITY_JS_MIN && jsVerbosity <= VERBOSITY_JS_MAX) {
        this.parameters.jsVerbosity = jsVerbosity;
      }
    }

    if (params.has('tag') && params.has('tagverbosity')) {
      const tag = params
        ?.get('tag')
        ?.replace('[', '')
        .replace(']', '')
        .split(',');
      const tagVerbosity = params
        ?.get('tagverbosity')
        ?.replace('[', '')
        .replace(']', '')
        .split(',');
      if (tag && tagVerbosity && tag.length === tagVerbosity.length) {
        this.parameters.tag = tag;
        this.parameters.tagVerbosity = tagVerbosity;
      }
    }

    if (params.has('readonly')) {
      this.parameters.readOnly = stringToBoolean(params.get('readonly'));
    }

    if (params.has('fastupdating')) {
      this.parameters.fastUpdating = stringToBoolean(
        params.get('fastupdating')
      );
    }

    if (params.has('db')) {
      this.parameters.useDatabase = stringToBoolean(params.get('db'));
    }
    if (params.has('mode')) {
      this.parameters.mode = params.get('mode')!;
    }
    if (params.has('clientlog')) {
      this.disableLog = !stringToBoolean(params.get('clientlog'));
    }
    if (params.has('streaming')) {
      this.streaming = stringToBoolean(params.get('streaming'));
    }
    if (params.has('calls')) {
      this.calls = stringToBoolean(params.get('calls'));
    }
  };

  send = (request) => {
    if (!this.client) {
      console.log('send (none init)', request);
      return Promise.reject('tdweb client is not ready yet');
    }
    console.log('request', request);

    switch (request['@type']) {
      case 'getChats': {
        const { limit, chat_list } = request;

        switch (chat_list['@type']) {
          case 'chatListMain': {
            // this.reset();
            console.log(limit, chat_list);
            return Promise.resolve({
              chat_ids: [1, 2, 3],
            });
            break;
          }
        }

        break;
      }
      // case 'updateSavedAnimations': {
      //     this.savedAnimations = await TdLibController.send({
      //         '@type': 'getSavedAnimations'
      //     })

      //     this.emit('updateSavedAnimations', update);
      //     break;
      // }
      default:
        break;
    }

    if (!this.disableLog) {
      console.log('send', request);

      return this.client
        .send(request)
        .then((result) => {
          console.log('send result', result);
          return result;
        })
        .catch((error) => {
          console.error('send error', error);

          throw error;
        });
    } else {
      return this.client.send(request);
    }
  };

  sendTdParameters = async () => {
    const apiId = process.env.REACT_APP_TELEGRAM_API_ID;
    const apiHash = process.env.REACT_APP_TELEGRAM_API_HASH;

    // console.log('[td] sendTdParameters', apiHash, apiId);
    if (!apiId || !apiHash) {
      if (
        window.confirm(
          'API id is missing!\n' +
            'In order to obtain an API id and develop your own application ' +
            'using the Telegram API please visit https://core.telegram.org/api/obtaining_api_id'
        )
      ) {
        window.location.href = 'https://core.telegram.org/api/obtaining_api_id';
      }
    }

    const { useTestDC } = this.parameters;
    const { version } = packageJson;

    this.send({
      '@type': 'setTdlibParameters',
      parameters: {
        '@type': 'tdParameters',
        use_test_dc: useTestDC,
        api_id: apiId,
        api_hash: apiHash,
        system_language_code: navigator.language || 'en',
        device_model: getBrowser(),
        system_version: getOSName(),
        application_version: version,
        use_secret_chats: false,
        use_message_database: true,
        use_file_database: false,
        database_directory: '/db',
        files_directory: '/',
      },
      // ,
      // extra: {
      //     a: ['a', 'b'],
      //     b: 123
      // }
    });

    this.send({
      '@type': 'setOption',
      name: 'use_quick_ack',
      value: {
        '@type': 'optionValueBoolean',
        value: true,
      },
    });

    if (this.parameters.tag && this.parameters.tagVerbosity) {
      for (let i = 0; i < this.parameters.tag.length; i++) {
        let tag = this.parameters.tag[i];
        let tagVerbosity = this.parameters.tagVerbosity[i];

        this.send({
          '@type': 'setLogTagVerbosityLevel',
          tag: tag,
          new_verbosity_level: tagVerbosity,
        });
      }
    }
  };

  logOut() {
    this.send({ '@type': 'logOut' }).catch((error) => {
      this.emit('tdlib_auth_error', error);
    });
  }

  setChatId = (chatId, messageId = null, options = {}) => {
    const update = {
      '@type': 'clientUpdateChatId',
      chatId,
      messageId,
      options,
    };

    this.clientUpdate(update);
  };

  setMediaViewerContent(content) {
    this.clientUpdate({
      '@type': 'clientUpdateMediaViewerContent',
      content: content,
    });
  }

  async connectAndJoin(wss, pubkey) {
    const relay = relayInit(wss);
    try {
      await relay.connect();
    } catch (err) {
      console.log('发现了错误', err);
    }
    relay.on('connect', () => {
      console.log(`connected: ${relay.url}`);
      this.emit('update', { '@type': UPDATE.ConnectionState, state: {} });

      let subscribed_channels = [] as TSubscribedChannel[];
      if (localStorage['subscribed_channels']) {
        const sc = localStorage['subscribed_channels'];
        subscribed_channels = JSON.parse(sc);
      } else {
        subscribed_channels = defaultChatroomList;
        localStorage.setItem(
          'subscribed_channels',
          JSON.stringify(subscribed_channels)
        );
      }
      // const user = store.getState().user.user;
      // const pubkey = user?.user_id;
      if (pubkey && pubkey.length > 0) {
        this.subOpenDmFromStranger(relay, pubkey);
      }
      for (let i = 0; i < subscribed_channels.length; i++) {
        // console.log(subscribed_channels[i])
        //get latest messages for all known channels in case this is a reconnection
        if (subscribed_channels[i].type == 'groupChannel') {
          this.subChannelMessage(relay, subscribed_channels[i].user_id);
        } else if (subscribed_channels[i].type == 'single') {
          // const user: TUser = store.getState().user.user;
          // this.subdmMessages(
          // //   store,
          //   relay,
          //   user.pubkey,
          //   subscribed_channels[i].user_id
          // );
        } else if (subscribed_channels[i].type == 'groupRelay') {
          console.log(subscribed_channels[i]);
          this.subGlobalMessages(relay);
        }
      }
    });
    relay.on('error', () => {
      console.log(`failed: ${relay.url}`);
      //   setTimeout(() => {
      //     store.dispatch({ type: 'RELAY_CONNECT', payload: action.payload });
      //   }, 2000);
    });
    relay.on('disconnect', () => {
      console.log(`disconnected from ${relay.url}`);
      //   setTimeout(() => {
      //     store.dispatch({ type: 'RELAY_CONNECT', payload: action.payload });
      //   }, 2000);
    });
    relay.on('notice', (e: any) => {
      console.log(`notice from ${relay.url}   ${JSON.stringify(e)} `);
    });
    // if (!relayInstance[action.payload.host]) {
    //   relayInstance[action.payload.host] = relay;
    // }
  }

  subGlobalMessages = (relay: Relay) => {
    const filter = {
      kinds: [1],
      limit: 50,
    };
    if (!relay) return;
    const sub = relay.sub([filter]);
    const subDetail = {
      roomId: 'globalfeed',
      type: 'groupRelay',
      relayUrl: relay.url,
      sub: sub,
    };
    // if (this.subList['globalfeed']) {
    //   this.subList['globalfeed'].push(subDetail);
    // } else {
    //   this.subList['globalfeed'] = [subDetail];
    // }
    // store.dispatch(setRoomSubList({ ['globalfeed']: subDetail }));

    sub.on('event', (event: TEvent) => {
      //   console.log(event);
      //   store.dispatch(handleRelayMsgGlobal3(event, relay.url));
      //   store.dispatch({
      //     type: 'fetchOtherUserMeta',
      //     payload: { user_id: event.pubkey },
      //   });
      // updateUsermap(store, event.pubkey);
    });
  };
  subChannelMessage = (relay: Relay, channelId: string) => {
    const filter = {
      kinds: [42],
      '#e': [channelId],
      limit: 13,
    };
    if (!relay) return;
    // store.dispatch({
    //   type: 'fetchContactChannelMeta',
    //   payload: { channelId },
    // });
    const sub = relay.sub([filter]);
    const subDetail = {
      roomId: channelId,
      type: 'groupChannel',
      relayUrl: relay.url,
      sub: sub,
    };
    // if (this.subList[channelId]) {
    //   this.subList[channelId].push(subDetail);
    // } else {
    //   this.subList[channelId] = [subDetail];
    // }
    // store.dispatch(setRoomSubList({ [channelId]: subDetail }));
    sub.on('event', (event: TEvent) => {
      //   store.dispatch(handleRelayMsgChannel3(event, relay.url));
      //   // updateUsermap(store, event.pubkey);
      //   store.dispatch({
      //     type: 'fetchOtherUserMeta',
      //     payload: { user_id: event.pubkey },
      //   });
    });
  };
  subdmMessages = (
    // store: any,
    relay: Relay,
    userPubkey: string,
    friendPubkey: string
  ) => {
    if (!relay) return;
    // updateUsermap(store, friendPubkey);
    // store.dispatch({
    //   type: 'fetchOtherUserMeta',
    //   payload: { user_id: friendPubkey },
    // });
    let time_for_since = 0;
    const filter = {
      authors: [userPubkey, friendPubkey],
      kinds: [4],
      '#p': [userPubkey, friendPubkey],
      since: time_for_since,
      limit: 13,
    };
    const sub = relay.sub([filter]);
    const subDetail = {
      roomId: friendPubkey,
      type: 'single',
      relayUrl: relay.url,
      sub: sub,
    };
    // if (subList[friendPubkey]) {
    //   subList[friendPubkey].push(subDetail);
    // } else {
    //   subList[friendPubkey] = [subDetail];
    // }
    // store.dispatch(setRoomSubList({ [friendPubkey]: subDetail }));
    sub.on('event', (event: TEvent) => {
      //   console.log(event, event.content);
      //   store.dispatch(handleRelayMsgPositiveDms3(event, relay.url));
      //   store.dispatch({
      //     type: 'fetchOtherUserMeta',
      //     payload: { user_id: event.pubkey },
      //   });
    });
    sub.on('eose', () => {
      // sub.unsub();
      // console.log('sub dm messages eose')
    });
  };

  subOpenDmFromStranger = (relay: Relay, pubkey: string) => {
    const filter = {
      kinds: [4],
      '#p': [pubkey],
      limit: 200,
    };
    if (!relay) return;
    // updateUsermap(store, pubkey);
    // store.dispatch({
    //   type: 'fetchOtherUserMeta',
    //   payload: { user_id: pubkey },
    // });
    const sub = relay.sub([filter]);
    const subDetail = {
      roomId: pubkey,
      type: 'single',
      relayUrl: relay.url,
      sub: sub,
    };
    // if (subList[pubkey]) {
    //   subList[pubkey].push(subDetail);
    // } else {
    //   subList[pubkey] = [subDetail];
    // }
    // store.dispatch(setRoomSubList({ [pubkey]: subDetail }));
    // sub.on('event', (event: TEvent) => {
    //   // console.log('from stranger', event);
    //   store.dispatch(handleRelayMsgFromStranger(event, relay.url));
    //   store.dispatch({
    //     type: 'fetchOtherUserMeta',
    //     payload: { user_id: event.pubkey },
    //   });
    //   // updateUsermap(store, event.pubkey);
    // });
    // sub.on('eose', () => {
    //   // sub.unsub();
    //   // console.log('sub dm from stanger eose')
    // });
  };
  formatChannelEvent = async (
    inputMessage: string,
    receiver: TSubscribedChannel,
    replyBox: TCitedMsg,
    user: TUser
  ) => {
    // const url = relayinst.url;
    let tags = [
      [
        'e',
        // '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb',
        receiver.user_id,
        // url.toString(),
      ],
    ] as string[][];
    if (replyBox.pubkey && replyBox.pubkey.length > 0) {
      tags = [
        [
          'e',
          // '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb',
          receiver.user_id,
          // url.toString(),
        ],
        [
          'e',
          replyBox.evtId.toString(),
          // url.toString()
        ],
        [
          'p',
          replyBox.pubkey.toString(),
          //  url.toString()
        ],
      ];
    }
    let event = {
      kind: 42,
      created_at: Math.floor(Date.now() / 1000),
      // tags: [['e', '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb', url.toString()], ['e', 'dd526a59faa6d5291d3aa3a0e28e655a98fc371545936094ffc089097e608552', url.toString()], ['p', user.pubkey, url.toString()]],
      tags,
      content: inputMessage,
      pubkey: user.pubkey,
    } as TEvent;
    // event = await getSignedEvent(event, user?.privatekey);

    return event;
  };
  sendMsgToGroupChannel = (relayinst: Relay, event: TEvent) => {
    const pub = relayinst.publish(event);
    pub.on('ok', () => {
      console.log(`${relayinst.url} has accepted our event`);
    });
    pub.on('seen', () => {
      console.log(`we saw the event on ${relayinst.url}`);
    });
    pub.on('failed', (reason: any) => {
      console.log(`failed to publish to ${relayinst.url}: ${reason}`);
    });
  };

  formatDMEvent = async (
    inputMessage: string,
    receiver: TSubscribedChannel,
    replyBox: TCitedMsg,
    user: TUser
  ) => {
    const sk1 = user?.privatekey;
    let pk1 = user?.pubkey;
    // receiver
    // let sk2 = generatePrivateKey()
    let pk2 = receiver.user_id;
    // on the sender side
    let ciphertext = 'unknown...';
    if (window.nostr) {
      ciphertext = await window.nostr.nip04.encrypt(pk2, inputMessage);
    } else if (sk1) {
      ciphertext = await nip04.encrypt(sk1, pk2, inputMessage);
    } else {
      console.log('send dm failed');
    }

    let tags = [['p', pk2]] as string[][];
    if (replyBox.pubkey && replyBox.pubkey.length > 0) {
      const replyTags = [
        ['p', replyBox.pubkey.toString()],
        ['e', replyBox.evtId.toString()],
      ];
      tags = [...tags, ...replyTags];
      // "tags"       : [ [ 'p', pubkey ], [ 'e', id_of_post_being_replied_to ] ],
    }

    let event = {
      pubkey: pk1,
      created_at: Math.floor(Date.now() / 1000),
      kind: 4,
      tags,
      content: ciphertext,
    } as TEvent;
    event = await this.getSignedEvent(event, user.privatekey);

    return event;
  };
  sendMsgToSingle = (relayinst: Relay, event: TEvent) => {
    const pub = relayinst.publish(event);
    pub.on('ok', () => {
      console.log(`${relayinst.url} has accepted our event`);
    });
    pub.on('seen', () => {
      console.log(`we saw the event on ${relayinst.url}`);
    });
    pub.on('failed', (reason: any) => {
      console.log(`failed to publish to ${relayinst.url}: ${reason}`);
    });
  };

  formatGlobalEvent = async (
    inputMessage: string,
    replyBox: TCitedMsg,
    user: TUser
  ) => {
    let tags = [
      [
        // 'e',
        // receiver.user_id,
        // url.toString(),
      ],
    ] as Array<Array<string>>;
    if (replyBox.pubkey && replyBox.pubkey.length > 0) {
      tags = [
        // [
        //   'e',
        //   // '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb',
        //   receiver.user_id,
        //   url.toString(),
        // ],
        ['e', replyBox.evtId.toString()],
        ['p', replyBox.pubkey.toString()],
      ];
    }
    let event = {
      kind: 1,
      created_at: Math.floor(Date.now() / 1000),
      // tags: [['e', '25e5c82273a271cb1a840d0060391a0bf4965cafeb029d5ab55350b418953fbb', url.toString()], ['e', 'dd526a59faa6d5291d3aa3a0e28e655a98fc371545936094ffc089097e608552', url.toString()], ['p', user.pubkey, url.toString()]],
      tags,
      content: inputMessage,
      pubkey: user.pubkey,
    } as TEvent;
    event.id = getEventHash(event);
    event = await this.getSignedEvent(event, user?.privatekey);

    return event;
  };

  sendMsgToGroupRelay = (relayinst: Relay, event: TEvent) => {
    const pub = relayinst.publish(event);
    pub.on('ok', () => {
      console.log(`${relayinst.url} has accepted our event`);
    });
    pub.on('seen', () => {
      console.log(`we saw the event on ${relayinst.url}`);
    });
    pub.on('failed', (reason: any) => {
      console.log(`failed to publish to ${relayinst.url}: ${reason}`);
    });
  };

  getSignedEvent = async (event: TEvent, privateKey: string | undefined) => {
    event.id = getEventHash(event);
    if (window.nostr) {
      const signedEvent = await window?.nostr.signEvent(event);
      if (typeof signedEvent == 'string') {
        event.sig = signedEvent;
      } else {
        event.sig = signedEvent.sig;
      }
    } else if (privateKey) {
      event.sig = signEvent(event, privateKey);
    } else {
      console.log('something wrong');
    }
    return event;
  };
}

const controller = new TdLibController();
// @ts-ignore
window.controller = controller;
export default controller;
