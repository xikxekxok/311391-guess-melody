import {QuestionsModel, questionType} from '../../models/questions';
import getResponse from '../../infrastructure/http';
import questionServerType from '../../models/questionServerType';
import toGenreModel from './genreMapper';
import toArtistModel from './artistMapper';

const getQuestions = () => {
  return getResponse('https://intensive-ecmascript-server-nnpnvhhedl.now.sh/guess-melody/questions')
    .then(
        (serverQuestions) => {
            let result = [];
            for (let serverQuestion of serverQuestions) {
                switch (serverQuestion.type) {
                    case questionServerType.genre:
                        result.push(toGenreModel(serverQuestion));
                        break;

                    case questionServerType.artist:
                        result.push(toArtistModel(serverQuestion));
                        break;

                    default:
                        throw new Error(`Server provide unknown question type : ${serverQuestion.type}`);
                }
            }
            return new QuestionsModel(result);
        },
        (errorDetails) => {
            throw new Error(errorDetails);
        }
    );
};

export default getQuestions;
