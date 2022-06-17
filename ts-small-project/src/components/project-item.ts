import {Draggable} from '../models/drag-drop-interfaces'
import {Component} from '../components/base-component'
import {AUTOBIND} from '../decorator/autobind'
import {Project} from '../models/project-model'

  // ProjectItem Class
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable
  {
    private project: Project;

    public get persons() {
      if (this.project.people == 1) {
        return "1 person";
      }
      return `${this.project.people} people`;
    }

    public constructor(hostElementId: string, project: Project) {
      super("single-project", hostElementId, false, project.id);
      this.project = project;

      this.configure();
      this.renderProjectListContent();
    }
    @AUTOBIND
    public dragStartHandler(event: DragEvent): void {
      event.dataTransfer?.setData("text/plain", this.project.id);
      event.dataTransfer!.effectAllowed = "move";
    }

    public dragEndHandler(_: DragEvent): void {
      console.log("DragEnd");
    }

    public configure() {
      this.element.addEventListener("dragstart", this.dragStartHandler);
      this.element.addEventListener("dragend", this.dragEndHandler);
    }

    public renderProjectListContent() {
      this.element.querySelector("h2")!.textContent = this.project.title;
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent = this.project.description;
    }
  }

