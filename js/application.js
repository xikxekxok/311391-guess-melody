import WelcomeView from './screenModules/welcome';
import setScreen from './infrastructure/currentScreenProvider';
import ResultView from './screenModules/result';
import getQuestions from './questions/questionProvider';
import calcGameResult from './result/resultService';
import GamePresenter from './gamePresenter';
import { checkIsProvided } from './infrastructure/throwHelper';
import addToLog from './result/logService';
import GameModel from './gameModel';

export default class Application {

  openWelcome() {
    let welcomeView = new WelcomeView(()=>this.startGame());
    setScreen(welcomeView.element);
  }

  startGame() {
    let questions = getQuestions();
    let model = new GameModel(questions);
    let game = new GamePresenter(model, (answers) => this.showResults(answers));
  }

  showResults(answers) {
    checkIsProvided(answers, 'answers');

    this._log = addToLog(this._log, answers);

    let resultViewModel = calcGameResult(this._log);

    setScreen((new ResultView(resultViewModel, () => this.startGame())).element);
  }
}
