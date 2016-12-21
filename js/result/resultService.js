import {checkIsProvided} from './../infrastructure/throwHelper';

const calcResult = (log) => {
  checkIsProvided(log, 'log');

  let countBetter = log.log
    .filter((x) => x.rightAnswersCount > log.current.rightAnswersCount
      || (log.rightAnswersCount === x.rightAnswersCount && x.time < log.current.time))
    .length;

  return {
    resultText: 'Вы настоящий меломан!',
    minuteCount: log.current.time,
    guessCount: log.current.rightAnswersCount,
    betterPercent: log.log.length === 0 ? 100 : Math.floor((1 - (countBetter / log.log.length)) * 100)
  };
};


export default calcResult;
