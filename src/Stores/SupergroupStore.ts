

import EventEmitter from './EventEmitter';
import TdLibController from '../Controllers/TdLibController';
import { TChatId, TSuperGroupFullInfo } from '../react-app-env';

class SupergroupStore extends EventEmitter {
    items: Map<TChatId, any>;
    fullInfoItems: Map<TChatId, TSuperGroupFullInfo>;
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
            case 'updateSupergroup': {
                const prevSupergroup = this.get(update.supergroup.id);

                this.set(update.supergroup);

                this.emit(update['@type'], { ...update, prevSupergroup });
                break;
            }
            case 'updateSupergroupFullInfo':
                this.setFullInfo(update.supergroup_id, update.supergroup_full_info);

                this.emit(update['@type'], update);
                break;
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

    get(id) {
        return this.items.get(id);
    }

    set(supergroup) {
        this.items.set(supergroup.id, supergroup);
    }

    getFullInfo(id) {
        return this.fullInfoItems.get(id);
    }

    setFullInfo(id, fullInfo) {
        this.fullInfoItems.set(id, fullInfo);
    }
}

const store = new SupergroupStore();
// @ts-ignore
window.supergroup = store;
export default store;
