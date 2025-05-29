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
    this._inputList = Array.from(this._form.querySelectorAll("input, textarea, select"));
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(input => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues); // form reset should be triggered from here, after successful submission
    });
  }
}