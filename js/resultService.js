const calcResult = (answers) => {
  if (answers === void (0) ) {
    throw new Error('answers not provided!');
  }
  // по заданию пока считать ответы не нужно, да и вопросы относительно этого есть. пока заглушка
  return {
    resultText: 'Вы настоящий меломан!',
    minuteCount: 2,
    guessCount: 4,
    betterPercent: 80
  };
};

export default calcResult;
