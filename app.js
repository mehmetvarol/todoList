// Tüm Elementlerin Seçimi
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondsCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

eventListener();

function eventListener() {
  form.addEventListener("submit", (addTodo) => {
    const newTodo = todoInput.value.trim();

    if (newTodo === "") {
      showAlert("danger", "Lütfen bir todo girin...");
    } else {
      addTodoToUI(newTodo);
      addTodoToStorage(newTodo);
      showAlert("success", "Başarıyla Eklendi...");

    }

    addTodo.preventDefault();
  });
  // Sayfa Yüklendiğinde Todoları Yükleme...
  document.addEventListener("DOMContentLoaded", (loadAllTodosToUI) => {
    let todos = getTodosFromStorage();

    todos.forEach((todo) => {
      addTodoToUI(todo);
    });
  });
  // Todoları Arayüzden Silme
  secondsCardBody.addEventListener("click", (deleteTodo) => {
    if (deleteTodo.target.className === "fa fa-remove") {
      deleteTodo.target.parentElement.parentElement.remove();
      showAlert("success", "Todo başarıyla silindi...");
    }
    deleteTodoFormStorage(deleteTodo.target.parentElement.parentElement.textContent);
  });

  // Todoları Filtreleme
  filter.addEventListener("keyup", (filterTodos) => {
    const filterValue = filterTodos.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach((listItem) => {
      const text = listItem.textContent.toLowerCase();
      if (text.indexOf(filterValue) === -1) {
        //Bulamadı
        listItem.setAttribute("style", "display:none !important");
      } else {
        listItem.setAttribute("style", "display:block");
      }
    });
  });

  // Tüm Todoları Temizleme
  clearButton.addEventListener("click", (clearAllTodo) => {
    //Arayüzden Todoları Temizleme
    if (confirm("Tüm taskları silmek istediğinize emin misiniz? ")) {
      while(todoList.firstElementChild != null){
        todoList.removeChild(todoList.firstElementChild);
      }
      localStorage.removeItem("todos"); // Tüm Local Storageleri Silme
    }
  });

}
// Todoları Storageden Silme
function deleteTodoFormStorage(deletetodo) {
  let todos = getTodosFromStorage();

  todos.forEach((todo, index) => {
    if (todo === deletetodo) {
      todos.splice(index, 1); // Arraydan değeri silme
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  });
}

function getTodosFromStorage() { // Storagedan Todoları Alma
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStorage(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function showAlert(type, message) {
  const alert = document.createElement("div");
  alert.className = `alert alert-${type}`;
  alert.textContent = message;
  firstCardBody.appendChild(alert);

  //setTimeout
  setTimeout(function() {
    alert.remove();
  }, 2000);
};

function addTodoToUI(newTodo) {
  // List item oluşturma
  const listItem = document.createElement("li");
  // Link oluşturma
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class ='fa fa-remove'></i>";

  listItem.className = "list-group-item d-flex justify-content-between";

  // Text Node Ekleme

  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);

  // Todo List'e list item'ı ekleme
  todoList.appendChild(listItem);
  todoInput.value = "";

}