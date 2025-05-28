export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscapeClose = this._handleEscapeClose.bind(this); // Ensure correct `this` context
  }

  open() {
    this._popup.classList.add('popup_visible');
    document.addEventListener('keydown', this._handleEscapeClose);
  }

  close() {
    this._popup.classList.remove('popup_visible');
    document.removeEventListener('keydown', this._handleEscapeClose);
  }

  _handleEscapeClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    // Close icon
    this._popup.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    });

    // Overlay click
    this._popup.addEventListener('mousedown', (event) => {
      if (event.target === this._popup) {
        this.close();
      }
    });
  }
}