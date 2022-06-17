//Component Base Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;

    const importedHtml = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedHtml.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attached(insertAtStart);
  }
  private attached(insertAtBegging: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBegging ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract configure(): void;
  //public abstract renderContext(): void;
}
