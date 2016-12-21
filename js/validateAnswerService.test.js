import assert from 'assert';
import validate from './validateAnswerService';
import {questionType} from './questions/questionsModel';

describe('ValidateAnswerService', function () {
  describe('#checkInput', function () {
    it('questionNotProvided_throws', function () {
      assert.throws(() => validate(void (0), {}));
    });

    it('answerNotProvided_throws', function () {
      assert.throws(() => validate({}, void (0)));
    });

    it('answerTypeNotProvided_throws', function () {
      assert.throws(() => validate({}, {}));
    });
  });

  describe('#genre', function () {
    let question = {
      type: questionType.genre,
      answers: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ],
      rightAnswer: [1, 3]
    };

    it('answerRigth_returnTrue', function () {
      let answer = [1, 3];
      assert.equal(true, validate(question, answer));
    });

    it('answerRigthPartial_returnFalse', function () {
      let answer = [1];
      assert.equal(false, validate(question, answer));
    });

    it('answerRigthAndUnright_returnFalse', function () {
      let answer = [1, 2, 3];
      assert.equal(false, validate(question, answer));
    });

    it('answerEmpty_returnFalse', function () {
      let answer = [];
      assert.equal(false, validate(question, answer));
    });

    it('answerIncorrect_returnFalse', function () {
      let answer = [2];
      assert.equal(false, validate(question, answer));
    });
  });

  describe('#artist', function () {
    let question = {
      type: questionType.artist,
      answers: [
        { id: 1 },
        { id: 2 },
        { id: 3 }
      ],
      rightAnswer: 2
    };

    it('answerRigth_returnTrue', function () {
      let answer = 2;
      assert.equal(true, validate(question, answer));
    });

    it('answerInvalid_returnFalse', function () {
      let answer = 1;
      assert.equal(false, validate(question, answer));
    });
  });
});