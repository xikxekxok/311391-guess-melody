import WelcomeView from './screenModules/welcome';
import setScreen from './infrastructure/currentScreenProvider';
import getResultView from './screenModules/result';
import getQuestions from './questions/questionProvider';
import calcGameResult from './result/resultService';
import openGame from './game';
import {checkIsProvided} from './infrastructure/throwHelper';
import addToLog from './result/logService';

let _log;

const openWelcome = () => {
  let welcomeView = new WelcomeView(startGame);
  setScreen(welcomeView.element);
};

const startGame = () => {
  let questions = getQuestions();

  openGame(questions, showResults);
};

const showResults = (answers) => {
  checkIsProvided(answers, 'answers');

  _log = addToLog(_log, answers);

  let resultViewModel = calcGameResult(_log);

  let resultElement = getResultView(resultViewModel, startGame);
  setScreen(resultElement);
};

openWelcome();
