export default class ProjectList {
  constructor() {
    this.projects = [];
    this.currentProject = undefined
  }

  addProject(project) {
    this.projects.push(project);
  }

  getProjects(){
    return this.projects
  }

  getCurrentProject(){
    return this.projects[0] || undefined
  }
}
