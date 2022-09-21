let addButton = document.querySelector("#add-button");
let userInput = document.querySelector("#task-input");
let taskList = [];
let tabs = document.querySelectorAll(".task-tabs div");
let selectMenu = "tab-all";
let filterList = [];
let underLine = document.querySelector("#line");

addButton.addEventListener("click", addTask);
userInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});

for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = userInput.value;
  let task = {
    content: taskValue,
    id: randomID(),
    isComplete: false,
  };

  taskList.push(task);
  userInput.value = "";
  console.log(taskList);

  render();
}

function render() {
  let result = "";

  list = [];

  if (selectMenu === "tab-all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete === true) {
      result += `<div class="task task-done" id="${list[i].id}">
          <div>${list[i].content}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    } else {
      result += `<div class="task" id="${list[i].id}">
          <div>${list[i].content}</div>
          <div>
            <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash"></i></button>
          </div>
        </div>`;
    }
    document.querySelector("#task-board").innerHTML = result;
  }
}

function toggleComplete(id) {
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

function filter(e) {
  if (e) {
    selectMenu = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }
  filterList = [];
  if (selectMenu === "tab-not-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (selectMenu === "tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomID() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
