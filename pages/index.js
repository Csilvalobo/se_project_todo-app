import { initialTodos, validationConfig } from './utils/constants.js';
import {Todo} from './components/Todo.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { FormValidator } from './components/FormValidator.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");
const formValidator = new FormValidator(addTodoForm, validationConfig);
formValidator.enableValidation();

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

const generateTodo = (data) => {
const todo = new Todo(data, '#todo-template');
return todo.getView();
};

  todoDeleteBtn.addEventListener("click", () => {
    todoElement.remove();
  });

  return todoElement;
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;

  // Create a date object and adjust for timezone
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

  // Generate a unique ID for the new todo
  const id = uuidv4();

  // Include the id in the values object
  const values = { 
    id,
    name, 
    date 
  };
  
  const todo = generateTodo(values);
  todosList.append(todo);
  closeModal(addTodoPopup);
  evt.target.reset(); // Optional: reset the form
});

initialTodos.forEach((item) => {
  const todo = generateTodo(item);
  todosList.append(todo);
});
