export const questionType = {
  artist: 1,
  genre: 2
};

export class QuestionsModel {

  constructor(questions) {
    this._questions = questions;
  }

  hasUnanswered() {
    return this._questions.length > 0;
  }

  getNext() {
    return this._questions.shift();
  }
}
