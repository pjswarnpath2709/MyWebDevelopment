"use strict";

//there are 5 line and three line separators in the js file

const _list = document.querySelector(".list");
const input_tf = document.getElementById("todo_input");

const btnAdd = document.querySelector(".button_add");

const todoList = [];

const _getDoneButtonList = function () {
  const doneButtonList = document.querySelectorAll(".button_done");
  //   console.log(doneButtonList);
  return doneButtonList;
};

const _getRemoveButtonList = function () {
  const removeButtonList = document.querySelectorAll(".button_remove");
  //   console.log(removeButtonList);
  return removeButtonList;
};

/////////////////////////////////
const _setState = function (func) {
  if (func && typeof func === "function") {
    func();
  }
  build();
};
/////////////////////////////////
const build = function () {
  console.clear();
  const listsofItems = document.querySelectorAll(".listitem");
  listsofItems.forEach((listitem) => listitem.remove());
  todoList.forEach((todoObj, index) => {
    let extraclasses = ``;
    if (todoObj.isDone === true) {
      extraclasses += "done";
    }

    let htmltext = `<li class="listitem ${extraclasses}">
    <div class="labeltext">
        ${todoObj.text}
    </div>
    <div class="button_tray ">
        <button class="button button_done">
            <i class="fi fi-br-check"></i>
        </button>
        <button class="button button_remove">
            <i class="fi fi-br-cross"></i>
        </button>
    </div>
  </li>`;
    _list.insertAdjacentHTML("beforeend", htmltext);
  });
  ////////////
  const doneButtonList = _getDoneButtonList();
  doneButtonList.forEach((doneButton, index, array) => {
    doneButton.addEventListener("click", (e) => {
      e.preventDefault();
      const listsofItems = document.querySelectorAll(".listitem");
      //   console.log(doneButton, index, listsofItems[index]);
      listsofItems[index].classList.add("done");
      todoList[index].isDone = true;
    });
  });
  ///////////
  const removeButtonList = _getRemoveButtonList();
  removeButtonList.forEach((removeButton, index) => {
    removeButton.addEventListener("click", (e) => {
      e.preventDefault();
      //   console.log(removeButton, index);
      _setState(() => {
        todoList.splice(index, 1);
      });
    });
  });
  ///////////
};
input_tf.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    btnAdd.click();
  }
});

btnAdd.addEventListener("click", function (e) {
  e.preventDefault();
  const intext = input_tf.value;
  input_tf.value = "";
  if (intext === "") {
    return;
  }
  const todoObj = {
    text: intext,
    isDone: false,
  };
  _setState(() => {
    todoList.push(todoObj);
  });
});
