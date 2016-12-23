export default class GameResultModel {

  constructor(answers, time) {
    this._answers = answers;
    this._time = time;
    this._rightAnswersCount = answers.filter((x)=>x.isCorrect).length;
  }

  get answers() {
    return this._answers;
  }

  get time() {
    return this._time;
  }

  get rightAnswersCount() {
    return this._rightAnswersCount;
  }
}
