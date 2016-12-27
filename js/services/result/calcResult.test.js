import assert from 'assert';
import calcResult from './calcResult';

describe('calcResult', function () {
  let model;
  it('inMiddle', function () {
    model = {
      log: [
        {answers: 5, time: 60},
        {answers: 5, time: 45},
        {answers: 4, time: 10},
        {answers: 4, time: 30},
        {answers: 0, time: 70},
      ],
      current: {
        time: 20,
        rightAnswersCount: 4
      }
    };

    assert.equal(40, calcResult(model).betterPercent);
  });

  it('inTop', function () {
    model = {
      log: [
        {answers: 5, time: 60},
        {answers: 5, time: 45},
        {answers: 4, time: 10},
        {answers: 4, time: 30},
        {answers: 0, time: 70},
      ],
      current: {
        time: 20,
        rightAnswersCount: 6
      }
    };

    assert.equal(100, calcResult(model).betterPercent);
  });

  it('inTop2', function () {
    model = {
      log: [
        {answers: 5, time: 60},
        {answers: 5, time: 45},
        {answers: 4, time: 10},
        {answers: 4, time: 30},
        {answers: 0, time: 70},
      ],
      current: {
        time: 20,
        rightAnswersCount: 5
      }
    };

    assert.equal(100, calcResult(model).betterPercent);
  });

  it('inBottom', function () {
    model = {
      log: [
        {answers: 5, time: 60},
        {answers: 5, time: 45},
        {answers: 4, time: 10},
        {answers: 4, time: 30},
        {answers: 0, time: 70},
      ],
      current: {
        time: 20,
        rightAnswersCount: 0
      }
    };

    assert.equal(20, calcResult(model).betterPercent);
  });

  it('inBottom2', function () {
    model = {
      log: [
        {answers: 5, time: 60},
        {answers: 5, time: 45},
        {answers: 4, time: 10},
        {answers: 4, time: 30},
        {answers: 0, time: 70},
      ],
      current: {
        time: 100,
        rightAnswersCount: 0
      }
    };

    assert.equal(0, calcResult(model).betterPercent);
  });
});
