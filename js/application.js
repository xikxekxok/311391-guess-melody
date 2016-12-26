import WelcomeView from './views/welcome';
import ResultView from './views/result';

import setScreen from './infrastructure/currentScreenProvider';
import {checkIsProvided} from './infrastructure/throwHelper';

import getQuestions from './services/game/questionProvider';
import calcGameResult from './services/result/calcResult';
import addToLog from './services/result/log';

import GamePresenter from './gamePresenter';
import GameModel from './models/game';

export default class Application {

  openWelcome() {
    let welcomeView = new WelcomeView(()=>this.startGame());
    setScreen(welcomeView.element);
  }

  startGame() {
    let questions = getQuestions();
    let model = new GameModel(questions);
    let presenter = new GamePresenter(model, (answers) => this.showResults(answers));
    presenter.startGame();
  }

  showResults(answers) {
    checkIsProvided(answers, 'answers');

    this._log = addToLog(this._log, answers);

    let resultViewModel = calcGameResult(this._log);

    setScreen((new ResultView(resultViewModel, () => this.startGame())).element);
  }
}
