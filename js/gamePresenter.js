import {setScreen, updateTimer} from './infrastructure/currentScreenProvider';
import {checkIsProvided, checkNotUndefined} from './infrastructure/throwHelper';
import LevelArtistView from './views/level_artist';
import LevelGenreView from './views/level_genre';
import {questionType} from './models/questions';
import validateAnswer from './services/game/validateAnswer';
import timer from './import/timer';

export default class GamePresenter {

  constructor(gameModel, endCallback) {
    checkIsProvided(gameModel, 'gameModel');
    this._model = gameModel;

    checkIsProvided(endCallback, 'endCallback');
    this._endCallback = endCallback;
  }

  startGame() {
    this._timer = setInterval(() => this.onElapsed(), 1000);
    this._destroyTimer = timer(120);
    //updateTimer(this._model.getTimerViewModel());

    this.showNextQuestion();
  }

  onElapsed() {
    this._model.timerElapsed();

    if (this._model.isEndGame()) {
      this.endGame();
    }
  }

  onAnswer(answer) {
    checkNotUndefined(answer, 'answer'); // 0 - валидное значение в данном случае
    console.log(this._model.currentQuestion);
    console.log(answer);
    let isCorrect = validateAnswer(this._model.currentQuestion, answer);

    this._model.questionAnswered(isCorrect);

    if (this._model.isEndGame()) {
      this.endGame();
    } else {
      this.showNextQuestion();
    }
  }

  showNextQuestion() {
    let nextLevelElement;

    switch (this._model.currentQuestion.type) {
      case questionType.artist:
        nextLevelElement = (new LevelArtistView(this._model.currentQuestion, (answer) => this.onAnswer(answer))).element;
        break;

      case questionType.genre:
        nextLevelElement = (new LevelGenreView(this._model.currentQuestion, (answer) => this.onAnswer(answer))).element;
        break;

      default:
        throw Error('unknown level type'); // TODO: разобраться, как добавить модель уровня в качестве деталей ошибки
    }

    setScreen(nextLevelElement, true);
  }

  endGame() {
    this._destroyTimer();
    clearInterval(this._timer);

    this._endCallback(this._model.result);
  }
}
