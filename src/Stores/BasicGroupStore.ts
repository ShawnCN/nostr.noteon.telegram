

import EventEmitter from './EventEmitter';
import TdLibController from '../Controllers/TdLibController';
import { TChatId } from '../react-app-env';

class BasicGroupStore extends EventEmitter {
    items: Map<TChatId, any>;
    fullInfoItems: Map<TChatId, any>;
    constructor() {
        super();

        this.reset();

        this.addTdLibListener();
    }

    reset = () => {
        this.items = new Map();
        this.fullInfoItems = new Map();
    };

    onUpdate = update => {
        switch (update['@type']) {
            case 'updateAuthorizationState': {
                const { authorization_state } = update;
                if (!authorization_state) break;

                switch (authorization_state['@type']) {
                    case 'authorizationStateClosed': {
                        this.reset();
                        break;
                    }
                }

                break;
            }
            case 'updateBasicGroup': {
                this.set(update.basic_group);

                this.emit(update['@type'], update);
                break;
            }
            case 'updateBasicGroupFullInfo': {
                this.setFullInfo(update.basic_group_id, update.basic_group_full_info);

                this.emit(update['@type'], update);
                break;
            }
            default:
                break;
        }
    };

    onClientUpdate = update => {};

    addTdLibListener = () => {
        TdLibController.on('update', this.onUpdate);
        TdLibController.on('clientUpdate', this.onClientUpdate);
    };

    removeTdLibListener = () => {
        TdLibController.off('update', this.onUpdate);
        TdLibController.off('clientUpdate', this.onClientUpdate);
    };

    get(groupId) {
        return this.items.get(groupId);
    }

    set(group) {
        this.items.set(group.id, group);
    }

    getFullInfo(id) {
        return this.fullInfoItems.get(id);
    }

    setFullInfo(id, fullInfo) {
        this.fullInfoItems.set(id, fullInfo);
    }
}

const store = new BasicGroupStore();
// @ts-ignore
window.basicgroup = store;
export default store;
