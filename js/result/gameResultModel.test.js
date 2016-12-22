import assert from 'assert';
import {GameResultModel} from './gameResultModel';

describe('GameResultModel', function () {
  it('calcCorrect', function () {
    let model = new GameResultModel([
      {isCorrect: true},
      {isCorrect: false},
      {isCorrect: true}
    ], 120);

    assert.equal(2, model.rightAnswersCount);
  });
});
