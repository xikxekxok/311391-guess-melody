import {setScreen, updateTimer} from './infrastructure/currentScreenProvider';
import LevelArtistView from './screenModules/level_artist';
import LevelGenreView from './screenModules/level_genre';
import {questionType} from './questions/questionsModel';
import {checkIsProvided, checkNotUndefined} from './infrastructure/throwHelper';
import validateAnswer from './questions/validateAnswerService';

export default class GamePresenter {

  constructor(gameModel, endCallback) {
    checkIsProvided(gameModel, 'gameModel');
    this._model = gameModel;

    checkIsProvided(endCallback, 'endCallback');
    this._endCallback = endCallback;

    this._timer = setInterval(() => this.onElapsed(), 1000);
    updateTimer(this._model.getTimerViewModel());

    this.showNextQuestion();
  }

  onElapsed() {
    this._model.timerElapsed();

    updateTimer(this._model.getTimerViewModel());

    if (this._model.isEndGame()) {
      this.endGame();
    }
  }

  onAnswer(answer) {
    checkNotUndefined(answer, 'answer'); // 0 - валидное значение в данном случае

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
    clearInterval(this._timer);

    this._endCallback(this._model.result);
  }
}
