import assert from 'assert';
import {getInitState, timerElapsed, questionAnswered, timeSpended} from './gameStateService';

describe('gameStateService', function () {
  describe('#timeSpended', function () {
    it('return correct', function () {
      assert.equal(39, timeSpended({time: 81}));
    });
  });

  describe('#getInit', function () {
    const initState = getInitState();

    it('threeLifes', function () {
      assert.equal(3, initState.lifes);
    });

    it('twoMinutes', function () {
      assert.equal(120, initState.time);
    });

    it('notDead', function () {
      assert.equal(false, initState.isDead);
    });
  });

  describe('#timerElapsed', function () {
    let elapsResult;

    it('elapsedCorrectly', function () {
      elapsResult = timerElapsed({
        time: 4
      });
      assert.equal(3, elapsResult.time);
    });

    it('remained_notDead', function () {
      elapsResult = timerElapsed({
        time: 2
      });
      assert.equal(false, elapsResult.isDead);
    });

    it('notRemained_dead', function () {
      elapsResult = timerElapsed({
        time: 1
      });
      assert.equal(true, elapsResult.isDead);
    });
  });

  describe('#onAnswer', function () {
    let answerResult;

    it('correctAnswer_lifeNotChanged', function () {
      answerResult = questionAnswered({
        lifes: 2
      }, true);
      assert.equal(2, answerResult.lifes);
    });

    it('incorrectAnswer_lifeDecrease', function () {
      answerResult = questionAnswered({
        lifes: 2
      }, false);
      assert.equal(1, answerResult.lifes);
    });

    it('lifesRemained_notDead', function () {
      answerResult = questionAnswered({
        lifes: 2
      }, false);
      assert.equal(false, answerResult.isDead);
    });

    it('lifesIsZero_dead', function () {
      answerResult = questionAnswered({
        lifes: 1
      }, false);
      assert.equal(true, answerResult.isDead);
    });
  });
});
