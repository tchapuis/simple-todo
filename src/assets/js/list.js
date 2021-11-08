import dragula from "dragula";

const generateItem = (id, content) => {
  const newListElement = document.createElement('li');
  newListElement.id = `item-${id}`;
  newListElement.innerHTML = `<input type="checkbox" class="mark-item" id="mark-item-${id}" data-item-id="${id}">
  <label for="mark-item-${id}">${content}</label>
  <button id="delete-item-${id}">Delete</button>`;
  return newListElement;
};

window.onload = () => {
  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    const itemsListEl = document.querySelector('#items-list');
    tasks.forEach((el) => {
      const listElementsCount = itemsListEl.childElementCount;
      (el ? itemsListEl.append(generateItem(listElementsCount + 1, el.name)) : '')
    });
  }
  dragula([document.querySelector('#items-list')]).on('drop', (el, target, source, sibling) => {
    if (!sibling) {
      let save = tasks.filter(task => task.name === el.children[1].textContent)[0];
      if (save) {
        let pos = tasks.indexOf(save);
        tasks.splice(pos, 1)
      }
      tasks.push(save)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }); 
  
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
};

const checkItem = (e) => {
  const { itemId } = e.currentTarget.dataset;
  document.querySelector(`#item-${itemId} > label`).classList.toggle('line-through');
};

document.querySelector('#add-item-button').addEventListener('click', addItem);

document.querySelectorAll('.mark-item').forEach((checkbox) => {
  checkbox.addEventListener('click', checkItem);
});
