const uuid = require('uuid').v4;

function makeTodoList() {
  const todoList = {};
  const todos = {};

  todoList.contains = function contains(id) {
    return !!todos[id];
  };
  
  todoList.getTodos = function getTodos() {
    return todos;
  };

  todoList.addTodo = function addTodo(task) {
    const id = uuid();

    const todo = task.split(",");
    const task1 = todo[0];
    const seve = todo[1] === "" ? 'Minor' : todo[1];

    todos[id] = {
      id,
      task1,
      seve,
      done: false,
    };
    return id;
  };

  todoList.getTodo = function getTodo(id) {
    return todos[id];
  };

  todoList.updateTodo = function updateTodo(id, todo) {
    todos[id].done = todo.done ?? todos[id].done;
    todos[id].task = todo.task || todos[id].task;
  };


  todoList.deleteTodo = function deleteTodo(id) {
    delete todos[id];
  };
  return todoList;
};

module.exports = {
  makeTodoList,
};
