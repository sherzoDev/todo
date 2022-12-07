const $form = document.querySelector(".form");
const $list = document.querySelector(".list");
const $template = document.querySelector(".template").content;

let LocalTodo = JSON.parse(localStorage.getItem("todo"));

let result = LocalTodo || [];

$form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    let {
        todo
    } = evt.target.elements;

    let newObj = {
        id: result[0] ?.id + 1 || 1,
        title: todo.value.trim(),
        isActive: false,
        isDeleted: false,
    };
    result.unshift(newObj);

    localStorage.setItem("todo", JSON.stringify(result));

    renderTodo(result, $list);
    todo.value = null;
});

function renderTodo(todoArr, element) {
    element.innerHTML = null;

    todoArr.forEach((todo) => {


        $checkbox.dataset.id = todo.id;
        $text.textContent = todo.title;
        $btn.dataset.id = todo.id;

        $btn.addEventListener("click", function (evt) {
            console.log(evt.target.dataset.id);
        });

        element.appendChild($item)
    });
};
function renderTodo(TodoArr, element) {
    element.innerHTML = null;
  
    TodoArr.forEach((todo) => {
      if (!todo.isDeleted) {
        let cloneTemp = $template.cloneNode(true);

        let $item = cloneTemp.querySelector(".item");
        let $text = cloneTemp.querySelector(".text");
        let $checkbox = cloneTemp.querySelector(".complate");
        let $btn = cloneTemp.querySelector(".btnDel");
  
        todo.isActive && $checkbox.setAttribute("checked", "checked");
        todo.isActive &&
          $text.setAttribute("style", "text-decoration: line-through");
  
        $checkbox.dataset.id = todo.id;
        $text.textContent = todo.title;
        $btn.dataset.id = todo.id;
  
        $checkbox.addEventListener("change", (evt) => {
          let id = evt.target.dataset.id;
          let findTodo = result.find((e) => e.id == id);
          findTodo.isActive = !findTodo.isActive;
          $text.style.textDecoration = "underline overline";
          renderTodo(result, $list);

          localStorage.setItem("todo", JSON.stringify(result));
        });
  
        $btn.addEventListener("click", (evt) => {
          let id = evt.target.dataset.id;
          let findTodo = result.find((e) => e.id == id);
          findTodo.isDeleted = !findTodo.isDeleted;
          renderTodo(result, $list);
          
          localStorage.setItem("todo", JSON.stringify(result));
        });
  
        element.appendChild($item);
      }
    });
  }

renderTodo(result, $list)