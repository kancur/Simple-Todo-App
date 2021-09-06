export default class Project {
    constructor(name){
        this.name = name;
        this.todos = [];
    }

   addNewTodo(todo){
        this.todos.push(todo)
   }
}