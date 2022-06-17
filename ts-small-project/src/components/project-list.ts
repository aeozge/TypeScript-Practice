import { Component } from './base-component';
import { DragTarget } from '../models/drag-drop-interfaces';
import { Project, ProjectStatus } from '../models/project-model';
import { AUTOBIND } from '../decorator/autobind';
import { projectState } from '../state/project-state';
import { ProjectItem } from './project-item';
  //ProjectList Class
  export class ProjectList
    extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget
  {
    assignedProjects: Project[];

    constructor(private projectType: "active" | "finished") {
      super("project-list", "app", false, `${projectType}-projects`);
      this.assignedProjects = [];

      this.configure();
      this.renderContent();
    }
    @AUTOBIND
    public dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
        event.preventDefault();
        const listElement = this.element.querySelector("ul")!;
        listElement.classList.add("droppable");
      }
    }
    @AUTOBIND
    public dropHandler(event: DragEvent) {
      const prjId = event.dataTransfer!.getData("text/plain");
      projectState.moveProject(
        prjId,
        this.projectType === "active"
          ? ProjectStatus.Active
          : ProjectStatus.Finished
      );
    }

    @AUTOBIND
    public dragLeaveHandler(_: DragEvent) {
      const listElement = this.element.querySelector("ul")!;
      listElement.classList.remove("droppable");
    }

    public configure() {
      this.element.addEventListener("dragover", this.dragOverHandler);
      this.element.addEventListener("dragleave", this.dragLeaveHandler);
      this.element.addEventListener("drop", this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const relevantProjects = projects.filter((prj) => {
          if (this.projectType === "active") {
            return prj.projectStatus === ProjectStatus.Active;
          } else {
            return prj.projectStatus === ProjectStatus.Finished;
          }
        });
        this.assignedProjects = relevantProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.projectType}-projects-list`;
      this.element.querySelector("ul")!.id = listId;
      this.element.querySelector("h2")!.textContent =
        this.projectType.toUpperCase() + " " + "PROJECTS";
    }
    private renderProjects() {
      const listElement = document.getElementById(
        `${this.projectType}-projects-list`
      )! as HTMLUListElement;
      listElement.innerHTML = "";
      for (const projectItem of this.assignedProjects) {
        // re-render the projects
        new ProjectItem(this.element.querySelector("ul")!.id, projectItem);
      }
    }
  }

