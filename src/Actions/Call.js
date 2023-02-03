

import TdLibController from '../Controllers/TdLibController';

export function openGroupCallPanel() {
    TdLibController.clientUpdate({
        '@type': 'clientUpdateGroupCallPanel',
        opened: true
    });
}

export function closeGroupCallPanel() {
    TdLibController.clientUpdate({
        '@type': 'clientUpdateGroupCallPanel',
        opened: false
    });
}

export function openCallPanel(id) {
    TdLibController.clientUpdate({
        '@type': 'clientUpdateCallPanel',
        callId: id,
        opened: true
    });
}

export function closeCallPanel() {
    TdLibController.clientUpdate({
        '@type': 'clientUpdateCallPanel',
        opened: false
    });
}