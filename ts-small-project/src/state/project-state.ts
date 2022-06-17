import {Project} from '../models/project-model'
import {ProjectStatus} from '../models/project-model'
  //Project State Management Class

  // We use generic type here instead of Project
  //as in a big application we may have many different types of state we need to hold

  type Listener<T> = (items: T[]) => void;

  class State<T> {
    protected listeners: Listener<T>[] = [];

    public addListener(listener: Listener<T>) {
      this.listeners.push(listener);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
      super();
    }
    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }
    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.projectStatus !== newStatus) {
        project.projectStatus = newStatus;
        this.updateListeners();
      }
    }
    private updateListeners() {
      for (const listenerFn of this.listeners) {
        //return copy of projects array, so it can't be edited.
        listenerFn(this.projects.slice());
      }
    }
  }

  export const projectState = ProjectState.getInstance();

