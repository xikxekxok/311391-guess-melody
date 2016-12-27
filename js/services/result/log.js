import {getResponse, push} from '../../infrastructure/http';

const addToLog = (newResult) => {
  return push('https://intensive-ecmascript-server-dxttmcdylw.now.sh/guess-melody/stats/311391', {
    time: newResult.time,
    answers: newResult.rightAnswersCount
  })
      .then(() => getResponse('https://intensive-ecmascript-server-dxttmcdylw.now.sh/guess-melody/stats/311391'))
      .then((log) => {
        return {
          current: newResult,
          log: log
        };
      });
};

export default addToLog;
