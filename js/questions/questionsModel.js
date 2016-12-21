export const questionType = {
  artist: 1,
  genre: 2
};

export class QuestionsModel {
  
  constructor(questions) {
    this._questions = questions;
    this._result = [];
  }

  hasUnanswered() {
    return this._questions.length > 0;
  }

  getNext() {
    if (this._currentQuestion) {
      throw Error('Перед переходом к следующему вопросу нужно ответить на предыдущий');
    }

    if (!this.hasUnanswered()) {
      throw Error('Вопросов больше нет, нельзя перейти к следующему');
    }

    this._currentQuestion = this._questions.shift();
    return this._currentQuestion;
  }

  questionAnswered(isCorrect) {
    if (!this._currentQuestion) {
      throw Error('Нет активного вопроса');
    }

    this._result.push({
      question: this._currentQuestion,
      isCorrect: isCorrect
    });

    this._currentQuestion = void (0);
  }

  getResult() {
    while (this.hasUnanswered()) {
      this.getNext();
      this.questionAnswered(false);
    }

    return this._result;
  }
}
