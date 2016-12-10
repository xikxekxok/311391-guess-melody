import {questionsModel, questionType} from './questionsModel';

const getQuestions = () => {
  let result = [];
  let questionsCount = 10;

  for (let i=0; i < questionsCount; i++) {
    if (Math.random() > 0.5) //тогда 1 тип
    {
      let question = getArtistQuestion();
      result.push(question);
    }
    else {
      let question = getGenreQuestion();
      result.push(question);
    }
  }

  return new questionsModel(result);
}

const getArtistQuestion = () => {
  let answersCount = random(2, 3);

  let question = {
    question: 'Кто исполняет эту песню?',
    type: questionType.artist,
    answers: [],
    rightAnswer: undefined
  }

  for (let j = 0; j < answersCount; j++) {
    let artistName = stubArtists[random(0, stubArtists.length - 1)];
    question.answers.push({
      id: j,
      text: artistName
    });
  }

  question.rightAnswer = random(0, answersCount - 1);

  return question;
}

const getGenreQuestion = () => {
  let answersCount = random(3, 5);
  let genre = stubGenres[random(0, stubGenres.length - 1)];

  let question = {
    question: `Выберите треки ${genre}`,
    type: questionType.genre,
    answers: [],
    rightAnswer: []
  }

  for (let j = 0; j < answersCount; j++) {
    question.answers.push({
      id: j
    });

    if (Math.random() > 0.5)
      question.rightAnswer.push(j);
  }

  return question;
}

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

//заглушка до появления реальных данных
//50 величайших исполнителей всех времён по версии журнала Rolling Stone
let stubArtists = ["The Beatles", "Боб Дилан", "Elvis Presley", "The Rolling Stones", "Chuck Berry", "Jimi Hendrix", "James Brown", "Little Richard", "Aretha Franklin", "Ray Charles", "Bob Marley", "The Beach Boys", "Buddy Holly", "Led Zeppelin", "Stevie Wonder", "Sam Cooke", "Muddy Watters", "Marvin Gaye", "The Velvet Underground", "Bo Diddley", "Otis Redding", "U2", "Bruce Springsteen", "Jerry Lee Lewis", "Fats Domino", "Ramones", "Nirvana", "Prince", "The Who", "The Clash", "Johnny Cash", "Smokey Robinson & the Miracles", "The Everly Brothers", "Neil Young", "Michael Jackson", "Madonna", "Roy Orbison", "John Lennon", "David Bowie", "Simon and Garfunkel", "The Doors", "Van Morrison", "Sly and the Family Stone", "Public Enemy", "The Byrds", "Janis Joplin", "Patti Smith", "Run-DMC", "Elton John", "The Band"];

let stubGenres = ["Rock", "Pop", "Heavy metal", "Indi rock", "Folk", "Punk rock"];

export default getQuestions;
