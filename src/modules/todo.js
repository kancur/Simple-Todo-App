/* eslint-disable no-console */

import { format } from 'date-fns'


export default class Todo {
  constructor(title, description, dueDate, priority, notes, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = notes;
    this.checklist = checklist;
    this.completed = false
  }

  getFormattedDate(){
    if (this.dueDate){
      return format(this.dueDate, 'MM/dd/yyyy hh:mm')
    } else {
      return "None"
    }
  }

  complete(){
    console.log('todo is completed')
    this.completed = true;
  }

  uncomplete(){
    this.completed = false;
  }

}
