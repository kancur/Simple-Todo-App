export default class UI{

  renderProjectsMenu(projects){
    const wrapper = document.querySelector('#menuitems')
    
    projects.forEach(project => {
      wrapper.appendChild(menuitem(project.name))
    });

    function menuitem(text) {
      const div = document.createElement('div')
      div.classList.add('menuitem')
      div.textContent = text

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
      
      const heading = document.createElement('h2');
      const description = document.createElement('p');

      heading.textContent = todo.title;
      description.textContent = todo.description;

      wrapper.append(heading, description)

      return wrapper
    }
  }



}