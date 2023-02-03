

class EventEmitter {
    observers: any;
    constructor() {
        this.observers = {} as any;
    }

    on(events:string, listener) {
        events.split(' ').forEach(event => {
            this.observers[event] = this.observers[event] || [];
            this.observers[event].push(listener);
        });
        return this;
    }

    off(event:string, listener) {
        if (!this.observers[event]) return;
        if (!listener) {
            delete this.observers[event];
            return;
        }

        this.observers[event] = this.observers[event].filter(l => l !== listener);
    }

    emit(event, ...args) {
        if (this.observers[event]) {
            const cloned = [].concat(this.observers[event]);
            cloned.forEach(observer => {
                // @ts-ignore
                observer(...args);
            });
        }

        if (this.observers['*']) {
            const cloned = [].concat(this.observers['*']);
            cloned.forEach(observer => {
                // @ts-ignore
                observer.apply(observer, [event, ...args]);
            });
        }
    }
}

export default EventEmitter;
