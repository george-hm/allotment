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
        this.lastRecordedSplitTime = this.splitTime;
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

    public get splitTime(): number {
        if (!this.active) {
            return this.lastRecordedSplitTime;
        }

        const timeNow: number = this.timeToCalculateSplitFrom || Date.now();
        return (timeNow - this.storedSplitTime) + this.lastRecordedSplitTime;
    }

    public split(splitName?: string): null|SplitStructure {
        // timer is not active we cant split
        if (!this.active) {
            return null;
        }
        const currentSplitTime = this.splitTime;
        const splitMade: SplitStructure = {
            name: splitName || null,
            splitNumber: (this.storedSplits.length + 1),
            time: currentSplitTime,
        };
        this.storedSplits.push(splitMade);

        // reset times for current split
        this.storedSplitTime = 0;
        this.lastRecordedSplitTime = 0;

        this.emit('split', splitMade);

        // return the split we just pushed
        return splitMade;
    }
}

module.exports = Allotment;
export default Allotment;
