import assert from 'assert';
import map from './artistMapper';
import { questionType } from '../../models/questions';

describe('artistMapper', function () {
    it('correctMap', function () {
        let serverQuestion = {
            "type": "artist",
            "question": "Кто исполняет эту песню?",
            "src": "path/to/file.mp3",
            "answers": [
                {
                    "image": {
                        "url": "http://placehold.it/705x455",
                        "width": 300,
                        "height": 300
                    },
                    "title": "Пелагея",
                    "isCorrect": false
                },
                {
                    "image": {
                        "url": "http://placehold.it/705x455",
                        "width": 300,
                        "height": 300
                    },
                    "title": "Краснознаменная дивизия имени моей Бабушки",
                    "isCorrect": false
                },
                {
                    "image": {
                        "url": "http://placehold.it/705x455",
                        "width": 300,
                        "height": 300
                    },
                    "title": "Кровосток",
                    "isCorrect": true
                }
            ]
        };

        let expected = {
            question: "Кто исполняет эту песню?",
            type: questionType.artist,
            answers: [
                {
                    id: 0,
                    "image": {
                        "url": "http://placehold.it/705x455",
                        "width": 300,
                        "height": 300
                    },
                    "text": "Пелагея"
                },
                {
                    id: 1,
                    "image": {
                        "url": "http://placehold.it/705x455",
                        "width": 300,
                        "height": 300
                    },
                    "text": "Краснознаменная дивизия имени моей Бабушки"
                },
                {
                    id: 2,
                    "image": {
                        "url": "http://placehold.it/705x455",
                        "width": 300,
                        "height": 300
                    },
                    "text": "Кровосток"
                }
            ],
            rightAnswer: 2
        };

        let actual = map(serverQuestion);

        assert.equal(JSON.stringify(actual), JSON.stringify(expected));
    });
});