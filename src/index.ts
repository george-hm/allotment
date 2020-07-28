import { EventEmitter } from 'events';

class Allotment extends EventEmitter {
    private storedTime: number;

    private active: boolean;

    private lastRecordedTime = 0;

    private timeToCalculateFrom: number|null = null;

    private emitStart = 'start';

    private laps: {[key in string|number]: number}[] = [];

    private lapCount = 0;

    private splits: {[key in string|number]: number}[] = [];

    private splitCount = 0;

    constructor(active?: boolean) {
        super();
        this.storedTime = Date.now();
        this.lastRecordedTime = 0;
        this.active = active || false;
        if (this.active) {
            this.emit(this.emitStart);
        }
    }

    public static start(): Allotment {
        return new Allotment(true);
    }

    public start(): true {
        this.active = true;
        this.emit(this.emitStart);
        return true;
    }

    public stop(): true {
        this.lastRecordedTime = this.time;
        this.active = false;
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

export default Allotment;
