export default class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    return todo
  }

  getTodos(){
    return this.todos
  }

  getTodo(id){
    return this.todos[id]
  }

  removeTodo(id){
    return this.todos.splice(id, 1)
  }
}
