import assert from 'assert';
import map from './genreMapper';
import questionType from '../../models/questionType';

describe('genreMapper', function () {
  it('correctMap', function () {
    let serverQuestion = {
      'type': 'genre',
      'question': 'Выберите все песни в жанре R',
      'genre': 'rnb',
      'answers': [
        {
          'src': 'path1',
          'genre': 'rnb'
        },
        {
          'src': 'path2',
          'genre': 'blues'
        },
        {
          'src': 'path3',
          'genre': 'rock'
        },
        {
          'src': 'path4',
          'genre': 'rnb'
        }
      ]
    };

    let expected = {
      question: 'Выберите все песни в жанре R',
      type: questionType.genre,
      answers: [
        {id: 0, src: 'path1'},
        {id: 1, src: 'path2'},
        {id: 2, src: 'path3'},
        {id: 3, src: 'path4'}
      ],
      rightAnswer: [0, 3]
    };

    let actual = map(serverQuestion);

    assert.equal(JSON.stringify(actual), JSON.stringify(expected));
  });
});
