import Application from './application';
import polyfillPromise from 'core-js/es6/promise';
if (!window.Promise) {
  window.Promise = polyfillPromise;
}
import 'whatwg-fetch';

let app = new Application();
app.openWelcome();
