import getElementFromTemplate from '../infrastructure/elementProvider';

export default class AbstractView {
  constructor() {
    if (this.constructor === AbstractView) {
      throw new TypeError('Can not construct abstract class.');
    }
  }

  getMarkup() {
    throw new TypeError('Implement abstract method getMarkup');
  }

  bindHandlers() {
    throw new TypeError('Implement abstract method bindHandlers');
  }

  clearHandlers() {
    throw new TypeError('Implement abstract method clearHandlers');
  }

  get element() {
    if (!this._element) {
      this._element = getElementFromTemplate(this.getMarkup());
      this.bindHandlers();
    }

    return this._element;
  }
}
