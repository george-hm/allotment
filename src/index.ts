import { EventEmitter } from 'events';

class Allotment extends EventEmitter {
    private storedTime: number;

    private active: boolean;

    private lastRecordedTime: number;

    private timeToCalculateFrom: number|null;

    constructor(active?: boolean) {
        super();
        this.storedTime = Date.now();
        this.lastRecordedTime = 0;
        this.active = active || false;
        this.timeToCalculateFrom = null;
    }

    public static start(): Allotment {
        return new Allotment(true);
    }

    public start(): true {
        this.active = true;
        return true;
    }

    public stop(): true {
        this.active = false;
        this.lastRecordedTime = this.time;
        this.emit('stop');
        return true;
    }

    public get time(): number {
        if (!this.active) {
            return this.lastRecordedTime;
        }
        const timeNow: number = this.timeToCalculateFrom || Date.now();
        return (timeNow - this.storedTime) + this.lastRecordedTime;
    }
}

export default Allotment.start;
