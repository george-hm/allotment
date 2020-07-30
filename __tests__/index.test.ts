import Allotment from '../src/index';

describe('Allotment', () => {
    describe('constructor', () => {
        it('should return instance on new', () => {
            expect(new Allotment()).toBeInstanceOf(Allotment);
        });
        it('should not be counting when passed nothing', () => {
            const timer = new Allotment();
            expect(timer.time).toEqual(0);
            const timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            // expect time to still be 0 after time passes
            expect(timer.time).toEqual(0);
        });
        it('should not be counting when passed false', () => {
            const timer = new Allotment(false);
            expect(timer.time).toEqual(0);
            const timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            // expect time to still be 0 after time passes
            expect(timer.time).toEqual(0);
        });
        it('should be counting when passed true', () => {
            const timer = new Allotment(true);
            expect(timer.time).toEqual(0);
            const timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            // expect time to still be 0 after time passes
            expect(timer.time >= 10).toBe(true);
        });
    });
    describe('static start', () => {
        it('should return a new instance', () => {
            expect(Allotment.start()).toBeInstanceOf(Allotment);
        });
        it('should count time', () => {
            const timer = Allotment.start();
            const timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            expect(timer.time !== 0).toBe(true);
        });
    });
    describe('start', () => {
        it('should start the timer', () => {
            const timer = new Allotment(false);
            expect(timer.time).toEqual(0);
            let timeNow = Date.now();

            // make sure its not started yet
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            expect(timer.time).toEqual(0);

            timer.start();
            timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            expect(timer.time >= 10).toBe(true);
        });
    });
    describe('time getter', () => {
        it('should return a number', () => {
            const timer = new Allotment(true);
            expect(typeof timer.time).toBe('number');
        });
        it('should start from 0', () => {
            expect(new Allotment(true).time).toBe(0);
        });
        it('should go up with time when active', () => {
            const timer = new Allotment(true);
            const timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            expect(timer.time >= 10).toBe(true);
        });
        it('should not go up with time when inactive', () => {
            const timer = new Allotment(false);
            const timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }

            expect(timer.time === 0).toBe(true);
        });
        it('should remember the time if stopped', () => {
            const timer = new Allotment(true);
            const timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }
            timer.stop();
            expect(timer.time >= 10).toBe(true);
        });
        it('should not keep counting the time if stopped', () => {
            const timer = new Allotment(true);
            let timeNow = Date.now();

            // probably better way to do this by mocking or something
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }
            timer.stop();
            expect(timer.time >= 10).toBe(true);
            const timeWhenStopped: number = timer.time;
            timeNow = Date.now();
            while ((Date.now() - timeNow) < 10) {
                // wait for time to pass
            }
            expect(timer.time > timeWhenStopped).toBe(false);
        });
    });
});
