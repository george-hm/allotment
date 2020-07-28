import index from '../src/index';

describe('index', () => {
    it('should return nothing', async () => {
        expect(await index()).toBe(undefined);
    });
});
