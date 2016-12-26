import {questionType} from '../../models/questions';

const toGenreModel = (serverQuestion) => {
    let result = {
        question: serverQuestion.question,
        type: questionType.genre,
        answers: [],
        rightAnswer: []
    };

    for (let i=0; i<serverQuestion.answers.length; i++) {
        let answer = serverQuestion.answers[i];

        result.answers.push({id: i, src: answer.src});

        if (answer.genre === serverQuestion.genre)
            result.rightAnswer.push(i);
    }

    return result;
}

export default toGenreModel;