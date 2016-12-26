import { questionType } from '../../models/questions';

const toArtistModel = (serverQuestion) => {
  let result = {
    question: serverQuestion.question,
    type: questionType.artist,
    src: serverQuestion.src,
    answers: []
  };

  for (let i = 0; i < serverQuestion.answers.length; i++) {
    let answer = serverQuestion.answers[i];

    result.answers.push({ id: i, image: answer.image, text: answer.title });

    if (answer.isCorrect)
      result.rightAnswer = i;
  }

  return result;
}

export default toArtistModel;
