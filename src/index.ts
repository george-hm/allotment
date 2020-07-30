import { EventEmitter } from 'events';

class Allotment extends EventEmitter {
    private storedTime = 0;

    private storedSplitTime = 0;

    private active: boolean;

    private lastRecordedTime = 0;

    private lastRecordedSplitTime = 0;

    private timeToCalculateFrom: number|null = null;

    private timeToCalculateSplitFrom: number|null = null;

    private emitStart = 'start';

    private storedSplits: SplitStructure[] = [];

    constructor(active?: boolean) {
        super();
        this.storedTime = Date.now();
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

module.exports = Allotment;
export default Allotment;
