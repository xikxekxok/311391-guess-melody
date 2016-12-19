import {checkIsProvided, checkNotUndefined} from './infrastructure/throwHelper';
import {questionType} from './questions/questionsModel';

const validateAnswer = (question, answer) => {
    checkIsProvided(question, 'question');
    checkNotUndefined(answer, 'answer');

    let result = false;

    switch (question.type) {
        case questionType.artist:
            result = question.rightAnswer === answer;
            break;

        case questionType.genre:
            result = question.rightAnswer.reduce((prev, curr) => prev && answer.some((x) => x === curr), true)
                && question.rightAnswer.length === answer.length;
            break;

        default:
            throw Error('unknown level type'); // TODO: разобраться, как добавить модель уровня в качестве деталей ошибки
    }

    return result;
}

export default validateAnswer;