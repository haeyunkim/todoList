const addButton = document.querySelector("#add-button");
let input = document.querySelector(".input-box");
let taskList = [];
let taskBoard = document.querySelector(".task-board");
const taskTab = document.querySelectorAll(".task-tabs div");
let filterList = [];
let targetID = "tab-all";

for (let i = 1; i < taskTab.length; i++) {
  taskTab[i].addEventListener("click", function (event) {
    filter(event);
  });
}

addButton.addEventListener("click", addTask);
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask(event);
  }
});

function addTask() {
  let tasks = {
    id: radomID(),
    content: input.value,
    isComplete: false,
  };

  taskList.push(tasks);
  console.log(taskList);
  input.value = "";

  render();
}

function render() {
  let result = "";
  let list = [];

  if (targetID === "tab-all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      result += `<div class="task" id="${list[i].id}">
    <div id="line-through">${list[i].content}</div>
    <div class="button-container">
      <button onclick="completeToggle('${list[i].id}')"><i class="fa-solid fa-rotate-left"></i></i></button>
      <button onclick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-delete-left"></i></button>
    </div>
  </div>`;
    } else {
      result += `<div class="task" id="${list[i].id}">
    <div>${list[i].content}</div>
    <div class="button-container">
      <button onclick="completeToggle('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
      <button onclick="deleteTask('${list[i].id}')"><i class="fa-sharp fa-solid fa-delete-left"></i></button>
    </div>
  </div>`;
    }
  }

  taskBoard.innerHTML = result;
}

function completeToggle(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }
  filter();
}

function filter(event) {
  if (event) {
    targetID = event.target.id;
  }

  filterList = [];

  if (targetID === "tab-not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (targetID === " tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function radomID() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
