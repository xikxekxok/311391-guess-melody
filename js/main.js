import welcomeScreen from './screenModules/welcome';
import levelArtistScreen from './screenModules/level_artist';
import levelGenreScreen from './screenModules/level_genre';
import resultScreen from './screenModules/result';

(function () {

  let slides = [
    welcomeScreen,
    levelArtistScreen,
    levelGenreScreen,
    resultScreen
  ];
  let current = -1;

  let select = (index) => {
    current = index;
    let mainElement = document.querySelector('.main');
    mainElement.parentNode.replaceChild(slides[index], mainElement);
  };
  document.onkeydown = (evt) => {
    evt.preventDefault();

    switch (evt.keyCode) {
      case 37:
        current = current > 0
          ? current - 1
          : current;
        break;
      case 39:
        current = current < slides.length - 1
          ? current + 1
          : current;
        break;
    }
    select(current);
  };

  select(0);
})();

