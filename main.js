let taskInput = document.querySelector("#task-input");
let deadlineInput = document.querySelector("#deadline-input");
let addTaskButton = document.querySelector("#add-task");
let tasksWrapper = document.querySelector("#task-wrapper");
let deleteButtons = document.querySelector("#delete-buttons");
let reset = document.querySelector("#reset");
let deleteSelected = document.querySelector("#delete-selected");
let formData;
let formFromStorage;

// console.log(localStorage.getItem("formData"));

if (localStorage.getItem("formData") != null) {
  formFromStorage = JSON.parse(localStorage.getItem("formData"));
  for (const item of formFromStorage) {
    let newLi = document.createElement("li");
    newLi.classList.add("list-group-item");

    newLi.innerText = item.taskValue;
    newLi.addEventListener("click", function () {
      this.classList.toggle("active");
    });

    let newSpan = document.createElement("span");
    newSpan.classList.add("badge", "rounded-pill", "bg-danger");
    newSpan.innerText = item.deadlineValue;

    newLi.append(newSpan);
    tasksWrapper.append(newLi);

  }
  deleteSelectedTasks();
} else {
  localStorage.setItem("formData", JSON.stringify([]));
}


addTaskButton.addEventListener("click", function () {
  let deadlineValue = deadlineInput.value;
  let taskValue = taskInput.value.trim();

  // console.log(formData);

  if (taskValue == "" || deadlineValue == "") {
    alert("You cant add an empty task.");
    return;
  }
  formData = {
    taskValue: taskValue,
    deadlineValue: deadlineValue,
  };
  formFromStorage = JSON.parse(localStorage.getItem("formData"));
  formFromStorage.push(formData);

  localStorage.setItem("formData", JSON.stringify(formFromStorage));

  let newLi = document.createElement("li");
  newLi.classList.add("list-group-item");

  // console.log(formFromStorage);
  newLi.innerText = formFromStorage[formFromStorage.length - 1].taskValue;
  newLi.addEventListener("click", function () {
    this.classList.toggle("active");
  });

  let newSpan = document.createElement("span");
  newSpan.classList.add("badge", "rounded-pill", "bg-danger");
  newSpan.innerText = formFromStorage[formFromStorage.length - 1].deadlineValue;

  newLi.append(newSpan);
  tasksWrapper.append(newLi);
  taskInput.value = "";
  deadlineInput.value = "";

  deleteButtons.classList.remove("d-none");
});

reset.addEventListener("click", function () {
  deleteButtons.classList.add("d-none");
  tasksWrapper.innerHTML = "";
  localStorage.clear();
});

formFromStorage = JSON.parse(localStorage.getItem("formData"));

function deleteSelectedTasks() {
  formFromStorage = JSON.parse(localStorage.getItem("formData"));
  for (const item of document.querySelectorAll(".list-group-item.active")) {
    item.remove();
    localStorage.removeItem(item);
  }
  if (document.querySelectorAll(".list-group-item").length == 0) {
    deleteButtons.classList.add("d-none");
  }
}
