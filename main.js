// mang to do
const todos = JSON.parse(localStorage.getItem("todos")) || [];

// lay ra the danh sach con viec
const todoListEl = document.querySelector(".todo_list");
const createFormEl = document.querySelector(".create_form");
const titleInputEl = createFormEl.querySelector(".form_control");
const clearBtnEl = document.querySelector(".clear");
const todoCountel = document.querySelector(".todo_count_value");
const filterForm = document.querySelector(".form_filter");

function saveLocal() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// tao todo
function createNewTodo(title) {
  return { id: Date.now(), title, status: false };
}

// update todo count
function updateTodoCount() {
  todoCountel.textContent = todos.filter(function (todo) {
    return !todo.status;
  }).length;
}

// tao ham xao todo
function deleteTodo(e) {
  // lay ra button de xoa
  const btnEl = e.target;

  // lay ra the cha de xoa ca element
  const liElement = btnEl.parentElement;

  // lay ra cai id
  const todoId = liElement.getAttribute("todo_id");

  liElement.remove();

  const todoIndex = todos.findIndex(function (todo) {
    return todo.id == todoId;
  });

  todos.splice(todoIndex, 1);

  updateTodoCount();
  saveLocal();
}

// kiem tra check
function updateTodo(e) {
  // lay ra button de xoa
  const checkEl = e.target;

  // lay ra the cha de xoa ca element
  const liElement = checkEl.parentElement;

  // lay ra cai id
  const todoId = liElement.getAttribute("todo_id");

  const todo = todos.find(function (todo) {
    return todo.id == todoId;
  });

  todo.status = checkEl.checked;

  updateTodoCount();
  saveLocal();
}

// tao mot the cong viec
function createTodoItem(todo) {
  const liEl = document.createElement("li");
  liEl.classList.add("todo_item");

  const checkboxEl = document.createElement("input");
  checkboxEl.type = "checkbox";
  checkboxEl.classList.add("todo_checkbox");

  checkboxEl.addEventListener("change", updateTodo);

  // neu cong viec da hoan thanh thi check
  if (todo.status) {
    checkboxEl.checked = true;
  }

  const titleEl = document.createElement("span");
  titleEl.classList.add("todo_title");
  titleEl.textContent = todo.title;

  const btnEl = document.createElement("button");
  btnEl.type = "submit";
  btnEl.classList.add("todo_delete_btn");
  btnEl.textContent = "Delete";

  btnEl.addEventListener("click", deleteTodo);

  liEl.append(checkboxEl, titleEl, btnEl);

  // set id de xoa
  liEl.setAttribute("todo_id", todo.id);

  return liEl;
}

// render danh sach item tu mang todos
function renderTodoList(todos) {
  todos.forEach(function (todo) {
    const item = createTodoItem(todo);

    todoListEl.append(item);
  });
  updateTodoCount();
}

createFormEl.addEventListener("submit", function (e) {
  e.preventDefault();

  // lay ra value
  const title = titleInputEl.value;

  // tao mot todo moi
  const newTodo = createNewTodo(title);

  todos.push(newTodo);

  // tao mot todo moi khong lien quan den thang cu
  const newTodoItem = createTodoItem(newTodo);

  todoListEl.append(newTodoItem);

  updateTodoCount();
  saveLocal();
});

clearBtnEl.addEventListener("click", function (e) {
  todos.length = 0;

  todoListEl.innerHTML = [];

  updateTodoCount();

  saveLocal();
});

filterForm.addEventListener("change", function (e) {
  // lay ra cac option
  const filterValue = filterForm.elements.filter.value;

  const items = Array.from(todoListEl.children);

  items.forEach(function (item) {
    const inputEl = item.querySelector(".todo_checkbox");

    switch (filterValue) {
      case "active": {
        if (inputEl.checked) {
          item.style.display = "none";
        } else {
          item.style.display = "bloc";
        }
        break;
      }

      case "completed": {
        if (inputEl.checked) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
        break;
      }

      default: {
        item.style.display = "block";
        break;
      }
    }
  });
});

renderTodoList(todos);
