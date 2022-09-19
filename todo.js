const addButton = document.querySelector("#add-button");
let taskInput = document.querySelector("#task-input");
let taskList = [];
let taskBoard = document.querySelector("#task-board");

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask();
  }
});

function addTask() {
  let task = {
    inputVal: taskInput.value,
    id: randomID(),
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);

  render();
}

function render() {
  let result = "";

  taskInput.value = "";
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete === true) {
      result += `<div class="tasks">
          <div id="line-through">${taskList[i].inputVal}</div>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    } else {
      result += `<div class="tasks">
          <div>${taskList[i].inputVal}</div>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${taskList[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    }
    taskBoard.innerHTML = result;
  }
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList.splice(i, 1);
      break;
    }
  }
  render();
}
function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (id === taskList[i].id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render();
}

function randomID() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
