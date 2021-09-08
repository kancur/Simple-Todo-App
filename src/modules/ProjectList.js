export default class ProjectList {
  constructor() {
    this.projects = [];
  }

  addProject(project) {
    const id = this.projects.push(project);
    return id - 1;
  }

  removeProject(id) {
    return this.projects.splice(id, 1);
  }

  getProjects() {
    return this.projects;
  }

  setProjects(data) {
    this.projects = data;
  }

  getProject(id) {
    return this.projects[id];
  }
}
