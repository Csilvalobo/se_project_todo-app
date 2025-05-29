import { initialTodos, validationConfig } from "./utils/constants.js";
import Todo from "./components/Todo.js";
import Section from "./components/Section.js";
import PopupWithForm from "./components/PopupWithForms.js";
import TodoCounter from "./components/TodoCounter.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import { FormValidator } from "./components/FormValidator.js";

// Elements
const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.forms["add-todo-form"];

// Initialize todo counter with initialTodos and selector for single element text
const todoCounter = new TodoCounter(initialTodos, ".todo-counter");

// Initialize popup with submit handler
const addTodoPopup = new PopupWithForm("#add-todo-popup", (formData) => {
  const { name, date } = formData;
  let dateObj = null;

  if (date) {
    dateObj = new Date(date);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());
  }

  const newTodo = {
    id: uuidv4(),
    name,
    date: dateObj,
    completed: false,
  };

  // Add new todo item via Section instance
  todoSection.addItem(newTodo);

  // Update counters accordingly
  todoCounter.updateTotal(true);

  // Reset form validation state
  formValidator.resetValidation();

  // Close popup
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

// Enable form validation
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Generate todo element with handlers
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");

  todo.setDeleteHandler(() => {
    todoCounter.updateTotal(false);
    if (todo.isCompleted()) {
      todoCounter.updateCompleted(false);
    }
    todo.remove();
  });

  todo.setToggleCompletedHandler((completed) => {
    todoCounter.updateCompleted(completed);
  });

  return todo.getView();
};

// Initialize Section instance with initial todos and renderer
const todoSection = new Section(initialTodos, generateTodo, ".todos__list");
todoSection.render();

// Open popup event
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
