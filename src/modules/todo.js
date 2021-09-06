export default class Todo {
    constructor(title, description, dueDate, priority, notes, checklist){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
    }

    get data(){
        this.title;
        this.description;
        this.dueDate;
        this.priority;
        this.notes;
        this.checklist;
    }
}