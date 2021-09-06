export default class UI{

  renderProjectsMenu(projects){
    const wrapper = document.querySelector('#menuitems')
    
    projects.forEach((project, index) => {
      wrapper.appendChild(menuitem(project.name, index))
    });

    function menuitem(name, index) {
      const div = document.createElement('div')
      div.dataset.arrayId = index
      div.classList.add('menuitem')
      div.addEventListener('click', (e) => {
        console.log(e.target)
      })
      div.textContent = name

      return div
    }
  }

  renderTodos(todos){
    const container = document.querySelector('#container');

    todos.forEach(todo => {
      container.appendChild(todoBox(todo))
    });

    function todoBox(todo){
      const wrapper = document.createElement('div');
      wrapper.classList.add('todo-wrapper');

      const leftSide = document.createElement('div');
      leftSide.classList.add('leftside');
      const rightSide = document.createElement('div');
      rightSide.classList.add('rightside');
      
      const heading = document.createElement('h2');
      const description = document.createElement('p');
      const dueDate = document.createElement('div');
      dueDate.classList.add('due-date')
      const isCompleted = document.createElement('div');
      isCompleted.classList.add('completed-wrap')
      
      const buttonRemove = document.createElement('button');
      buttonRemove.textContent = "Remove todo"
      buttonRemove.classList.add('rmv-button')



      heading.textContent = todo.title;
      description.textContent = todo.description;
      dueDate.textContent = todo.getFormattedDate();
      isCompleted.textContent = todo.isCompleted ? "Completed" : "Not done";
      todo.isCompleted ? isCompleted.classList.add('is-green') : isCompleted.classList.remove('is-green')

      leftSide.append(heading, dueDate, description)
      rightSide.append(isCompleted, buttonRemove)

      wrapper.append(leftSide, rightSide)
    
      return wrapper
    }
  }



}