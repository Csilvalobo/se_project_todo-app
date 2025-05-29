export default class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
    this._element = null;

    this._handleDelete = null;
    this._handleToggleCompleted = null;

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
      .querySelector(".todo")
      .cloneNode(true);
  }

  _setContent() {
    // Get elements
    this._nameEl = this._element.querySelector(".todo__name");
    this._checkboxEl = this._element.querySelector(".todo__completed");
    this._labelEl = this._element.querySelector(".todo__label");
    this._dateEl = this._element.querySelector(".todo__date");
    this._deleteBtn = this._element.querySelector(".todo__delete-btn");

    // Set content
    this._nameEl.textContent = this._data.name;
    this._checkboxEl.checked = this._data.completed || false;

    // Set ID and label
    if (this._data.id) {
      this._checkboxEl.id = `todo-${this._data.id}`;
      this._labelEl.setAttribute("for", `todo-${this._data.id}`);
    }

    // Set date if it exists and valid
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._dateEl.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    } else {
      this._dateEl.textContent = "";
    }
  }

  _setEventListeners() {
    // Delete button handler calls external callback if set
    this._deleteBtn.addEventListener("click", () => {
      if (this._handleDelete) {
        this._handleDelete();
      } else {
        // fallback: remove element if no handler provided
        this._element.remove();
      }
    });

    // Checkbox handler calls external callback if set and updates completed state
    this._checkboxEl.addEventListener("change", () => {
      this._data.completed = this._checkboxEl.checked;
      this._element.classList.toggle("todo__content_checked", this._checkboxEl.checked);
      if (this._handleToggleCompleted) {
        this._handleToggleCompleted(this._checkboxEl.checked);
      }
    });
  }

  // Allow external code to assign delete callback
  setDeleteHandler(callback) {
    this._handleDelete = callback;
  }

  // Allow external code to assign toggle completed callback
  setToggleCompletedHandler(callback) {
    this._handleToggleCompleted = callback;
  }

  // Returns current completed status
  isCompleted() {
    return this._data.completed;
  }

  // Removes the todo element from DOM
remove() {
  this._element.remove();
  this._element = null; // Clear reference for GC
}

  getView() {
    return this._element;
  }
}