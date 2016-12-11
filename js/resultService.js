import {checkIsProvided} from './infrastructure/throwHelper';

const calcResult = (answers) => {
  checkIsProvided(answers, 'answers');

  // по заданию пока считать ответы не нужно, да и вопросы относительно этого есть. пока заглушка
  return {
    resultText: 'Вы настоящий меломан!',
    minuteCount: 2,
    guessCount: 4,
    betterPercent: 80
  };
};

export default calcResult;
