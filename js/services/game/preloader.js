import questionType from '../../models/questionType';

const preloadQuestion = (question) => {
  switch (question.type) {
    case questionType.artist:
      for (let answer of question.answers) {
        let image = new Image();
        image.src = answer.image.url;
      }
      break;
    case questionType.genre:
      break;
  }
};

export default preloadQuestion;
