import {checkIsProvided} from './infrastructure/throwHelper';

const calcResult = (log) => {
  checkIsProvided(log, 'log');

  return {
    resultText: 'Вы настоящий меломан!',
    minuteCount: 2,
    guessCount: 4,
    betterPercent: 80
  };
};

export default calcResult;
