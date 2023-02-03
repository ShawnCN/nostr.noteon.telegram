

import { SdpBuilder } from './SdpBuilder';
import { mergeSsrcs } from './Utils';

export default class LocalConferenceDescription {
    #sessionId;
    #transport;
    #ssrcs = [];

    onSsrcs;

    constructor() {
        this.#sessionId = Date.now();
    }

    updateFromServer(data) {
        if (data.transport) {
            this.#transport = data.transport;
        }
        if (mergeSsrcs(this.#ssrcs, data.ssrcs) && this.onSsrcs) {
            this.onSsrcs(this.#ssrcs);
        }
    }

    generateSdp(isAnswer = false) {
        return SdpBuilder.fromConference(
            {
                sessionId: this.#sessionId,
                transport: this.#transport,
                ssrcs: this.#ssrcs
            },
            isAnswer
        );
    }
}