import {getInitState, timerElapsed, questionAnswered, timeSpended} from './lifeService';
import GameResultModel from './result/gameResultModel';

export default class GameModel {

  constructor(questions) {
    this._questions = questions;
    this._lifeState = getInitState();
    this._currentQuestion = this._questions.getNext();
  }

  getTimerViewModel() {
    return {
      mins: Math.floor(this._lifeState.time / 60),
      secs: this._lifeState.time % 60
    };
  }

  isEndGame() {
    return this._lifeState.isDead || !this._questions.hasUnanswered();
  }

  timerElapsed() {
    this._lifeState = timerElapsed(this._lifeState);
  }

  questionAnswered(isCorrect) {
    this._questions.questionAnswered(isCorrect);
    this._lifeState = questionAnswered(this._lifeState, isCorrect);
    if (this._questions.hasUnanswered()) {
      this._currentQuestion = this._questions.getNext();
    }
  }

  get currentQuestion() {
    return this._currentQuestion;
  }

  get result() {
    return new GameResultModel(this._questions.getResult(), timeSpended(this._lifeState));
  }
}
