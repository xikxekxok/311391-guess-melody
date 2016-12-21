import assert from 'assert';
import addToLog from './logService';

describe('logService', function () {
    let result;

    it('noPrevious', function () {
        result = addToLog(void (0), { id: 1 });

        assert.equal(0, result.log.length);
        assert.equal(1, result.current.id);
    });

    it('withPrevius', function () {
        result = addToLog({
            log: [{ id: 1 }],
            current: { id: 2 }
        }, { id: 3 });

        assert.equal(2, result.log.length);
        assert.equal(1, result.log[0].id);
        assert.equal(2, result.log[1].id);

        assert.equal(3, result.current.id);
    });
});