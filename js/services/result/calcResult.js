import {checkIsProvided} from '../../infrastructure/throwHelper';

const calcResult = (allResults) => {
  checkIsProvided(allResults, 'log');

  let countBetter = allResults.log
    .filter((x) => x.answers > allResults.current.rightAnswersCount
      || (allResults.current.rightAnswersCount === x.answers && x.time < allResults.current.time))
    .length;
  return {
    resultText: 'Вы настоящий меломан!',
    minuteCount: allResults.current.time,
    guessCount: allResults.current.rightAnswersCount,
    betterPercent: allResults.log.length === 0 ? 100 : Math.round((1 - (countBetter / allResults.log.length)) * 100)
  };
};


export default calcResult;
