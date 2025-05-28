import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   * @param {string} popupSelector - CSS selector for the popup element
   * @param {function} handleFormSubmit - callback function to handle form submission
   */
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
  }

  // Collect all input values into an object
  _getInputValues() {
    this._inputList = Array.from(this._form.querySelectorAll("input, textarea, select"));
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Override setEventListeners to add form submit listener
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  // Override close to reset the form when popup closes
  close() {
    super.close();
    this._form.reset();
  }
}
