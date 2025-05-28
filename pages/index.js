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
const todosList = document.querySelector(".todos__list");

// Initialize todo counter with initial values
const initialCompletedCount = initialTodos.filter(todo => todo.completed).length;
const todoCounter = new TodoCounter(
  ".todo-counter-total",
  ".todo-counter-completed",
  initialTodos.length,
  initialCompletedCount
);

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
    completed: false
  };

  renderTodo(newTodo);
  todoCounter.incrementTotal();
  addTodoPopup.close();
});
addTodoPopup.setEventListeners();

// Enable form validation
const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

// Generate todo element with handlers
const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template");

  // Handle delete with counter update and DOM removal
  todo.setDeleteHandler(() => {
    todoCounter.decrementTotal();
    if (todo.isCompleted()) {
      todoCounter.decrementCompleted();
    }
    todo.remove();
  });

  // Handle toggle completed with counter update
  todo.setToggleCompletedHandler((completed) => {
    completed
      ? todoCounter.incrementCompleted()
      : todoCounter.decrementCompleted();
  });

  return todo.getView();
};

// Render todo to the DOM
const renderTodo = (todoData) => {
  const todoElement = generateTodo(todoData);
  todosList.append(todoElement);
};

// Render initial todos
const todoSection = new Section(initialTodos, generateTodo, ".todos__list");
todoSection.render();

// Open popup event
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});
