import { log } from 'console';

const generateItem = (id, content) => {
  const newListElement = document.createElement('li');
  newListElement.id = `item-${id}`;
  newListElement.innerHTML = `<input type="checkbox" class="mark-item" id="mark-item-${id}" data-item-id="${id}">

        <label for="mark-item-${id}">${content}</label>
        <button id="delete-item-${id}" class ="delete" data-item-id="${id}">Delete</button>`;

  return newListElement;
};

const deleteItem = (e) => {
  const { itemId } = e.currentTarget.dataset;
  document.querySelector(`li#item-${itemId}`).remove();
};

function deleteI() {
  document.querySelectorAll('.delete').forEach((e) => {
    e.addEventListener('click', deleteItem);
  });
}

function newItem() {
  const arrayDelete = document.querySelectorAll('.delete');
  log(arrayDelete);
}

newItem();  

window.onload = () => {
  let tasks = '';
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    const itemsListEl = document.querySelector('#items-list');
    const listElementsCount = itemsListEl.childElementCount;
    tasks.forEach((el) => (el ? itemsListEl.append(generateItem(listElementsCount + 1, el.name)) : ''));
  }
};


const addItem = () => {
  const itemsListEl = document.querySelector('#items-list');
  const inputValue = document.querySelector('#add-item-input').value;
  const listElementsCount = itemsListEl.childElementCount;
  // Add save the item to the localstorage
  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push({ name: inputValue });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  itemsListEl.append(generateItem(listElementsCount + 1, inputValue));
  deleteI();
  newItem();
};

const checkItem = (e) => {
  const { itemId } = e.currentTarget.dataset;
  document.querySelector(`#item-${itemId} > label`).classList.toggle('line-through');
};

deleteI();

document.querySelector('#add-item-button').addEventListener('click', addItem);

document.querySelectorAll('.mark-item').forEach((checkbox) => {
  checkbox.addEventListener('click', checkItem);
});
