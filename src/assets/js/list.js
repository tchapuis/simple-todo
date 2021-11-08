import dragula from "dragula";

const generateItem = (id, content) => {
  const newListElement = document.createElement('li');
  newListElement.id = `item-${id}`;
  newListElement.innerHTML = `<input type="checkbox" class="mark-item" id="mark-item-${id}" data-item-id="${id}">
        <label for="mark-item-${id}">${content}</label>
        <button id="delete-item-${id}" class="delete" data-item-id="${id}">Delete</button>`;
  deleteI();
  clickCheckbox();
  return newListElement;
};

const checkItem = (e) => {
  const { itemId } = e.currentTarget.dataset;
  document.querySelector(`#item-${itemId} > label`).classList.toggle('line-through');
};

const clickCheckbox = () => {
  document.querySelectorAll('.mark-item').forEach((checkbox) => {
    checkbox.addEventListener('click', checkItem);
  });
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
    tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!sibling) {
      let save = tasks.filter(task => task.name === el.children[1].textContent)[0];
      let pos = tasks.indexOf(save);
      tasks.splice(pos, 1)
      tasks.push(save)
    } else {
      let save = tasks.filter(task => task.name === el.children[1].textContent)[0];
      let posEl = tasks.indexOf(save);
      let posSi = '';
      if (tasks.indexOf(tasks.filter(task => task.name === sibling.children[1].textContent)[0]) -1 > 0) {
        posSi = tasks.indexOf(tasks.filter(task => task.name === sibling.children[1].textContent)[0]) -1
      } else {
        posSi = tasks.indexOf(tasks.filter(task => task.name === sibling.children[1].textContent)[0])
      }
      if (posSi !== 0 && posSi < posEl) {
        posSi ++;
      }
      tasks.splice(posEl, 1)
      tasks.splice(posSi, 0, save)
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }); 
  clickCheckbox();
  deleteI();  
};

const deleteItem = (e) => {
  const { itemId } = e.currentTarget.dataset;
  document.querySelector(`li#item-${itemId}`).remove();
  let tasks = JSON.parse(localStorage.getItem('tasks'))
  tasks = tasks.filter((el) => el.name != e.currentTarget.parentNode.children[1].textContent)
  localStorage.setItem('tasks', JSON.stringify(tasks)) 
};

const deleteI = () => {
  document.querySelectorAll('.delete').forEach((e) => {
    e.addEventListener('click', deleteItem);
  });
};


const addItem = () => {
  const itemsListEl = document.querySelector('#items-list');
  const inputValue = document.querySelector('#add-item-input').value;
  const listElementsCount = itemsListEl.childElementCount;
  let tasks = [];
  if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push({ name: inputValue });
  localStorage.setItem('tasks', JSON.stringify(tasks));

  itemsListEl.append(generateItem(listElementsCount + 1, inputValue));
};



document.querySelector('#add-item-button').addEventListener('click', addItem);
