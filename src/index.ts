class Allotment {
    private storedTime: number;

    private active: boolean;

    private lastRecordedTime: number;

    private timeToCalculateFrom: number|null;

    private constructor() {
        this.storedTime = Date.now();
        this.lastRecordedTime = 0;
        this.active = true;
        this.timeToCalculateFrom = null;
    }

    public static start() {
        return new Allotment();
    }

    public start() {
        this.active = true;
        return true;
    }

    public stop() {
        this.active = false;
        this.lastRecordedTime = this.time;
        return true;
    }

    public get time() {
        if (!this.active) {
            return this.lastRecordedTime;
        }
        const timeNow: number = this.timeToCalculateFrom || Date.now();
        return (timeNow - this.storedTime) + this.lastRecordedTime;
    }
}

export default Allotment.start;
