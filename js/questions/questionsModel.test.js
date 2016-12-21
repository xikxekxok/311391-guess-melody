import assert from 'assert';
import {QuestionsModel} from './questionsModel';

describe('questionModel', function () {
    let questions;
    let result;
    describe('#hasUnanswered', function () {
        it('oneGet_returnTrue', function () {
            questions = new QuestionsModel([{ id: 1 }, { id: 2 }]);

            questions.getNext();
            questions.questionAnswered(true);

            assert.equal(true, questions.hasUnanswered());
        });

        it('twoGet_returnFalse', function () {
            questions = new QuestionsModel([{ id: 1 }, { id: 2 }]);

            questions.getNext();
            questions.questionAnswered(true);

            questions.getNext();
            questions.questionAnswered(true);

            assert.equal(false, questions.hasUnanswered());
        });
    })
    describe('#getResult', function () {
        let validate = (result, firstVal, secondVal) => {
            assert.equal(2, result.length);

            assert.equal(1, result[0].question.id);
            assert.equal(firstVal, result[0].isCorrect);

            assert.equal(2, result[1].question.id);
            assert.equal(secondVal, result[1].isCorrect);
        }

        it('answerOnlyFirst_onlyFirstCorrect', function () {
            questions = new QuestionsModel([{ id: 1 }, { id: 2 }]);

            questions.getNext();
            questions.questionAnswered(true);

            result = questions.getResult();

            validate(result, true, false);
        });

        it('onlySecondCorrect', function () {
            questions = new QuestionsModel([{ id: 1 }, { id: 2 }]);

            questions.getNext();
            questions.questionAnswered(false);

            questions.getNext();
            questions.questionAnswered(true);

            result = questions.getResult();

            validate(result, false, true);
        });
    });
});