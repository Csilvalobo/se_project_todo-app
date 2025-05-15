export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._element = null;
    
    // Get template and create element
    this._getTemplate();
    // Set the content
    this._setContent();
    // Set up event listeners
    this._setEventListeners();
  }

  _getTemplate() {
    const todoTemplate = document.querySelector(this._selector);
    this._element = todoTemplate.content
      .querySelector('.todo')
      .cloneNode(true);
  }

  _setContent() {
    // Get elements
    this._nameEl = this._element.querySelector('.todo__name');
    this._checkboxEl = this._element.querySelector('.todo__completed');
    this._labelEl = this._element.querySelector('.todo__label');
    this._dateEl = this._element.querySelector('.todo__date');
    this._deleteBtn = this._element.querySelector('.todo__delete-btn');

    // Set content
    this._nameEl.textContent = this._data.name;
    this._checkboxEl.checked = this._data.completed || false;

    // Set ID and label
    if (this._data.id) {
      this._checkboxEl.id = `todo-${this._data.id}`;
      this._labelEl.setAttribute('for', `todo-${this._data.id}`);
    }

    // Set date if it exists
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}`;
    }
  }

  _setEventListeners() {
    // Delete button handler
    this._deleteBtn.addEventListener('click', () => {
      this._element.remove();
    });

    // Checkbox handler
    this._checkboxEl.addEventListener('change', () => {
      this._element.classList.toggle('todo__content_checked', this._checkboxEl.checked);
    });
  }

  getView() {
    return this._element;
  }
}