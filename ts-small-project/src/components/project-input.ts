import { Component } from './base-component';
import { Validation, validate } from '../util/validation';
import { AUTOBIND } from '../decorator/autobind';
import { projectState } from '../state/project-state';

  //ProjectInput Class
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    private titleInputElement: HTMLInputElement;
    private descriptionInputElement: HTMLInputElement;
    private peopleInputElement: HTMLInputElement;

    public constructor() {
      super("project-input", "app", true, "user-input");
      this.titleInputElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInputElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;
      this.configure();
    }

    private gatherUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;

      const titleValidatable: Validation = {
        value: enteredTitle,
        required: true,
      };

      const descriptionValidatable: Validation = {
        value: enteredDescription,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Validation = {
        value: +enteredPeople,
        required: true,
        minNum: 1,
        maxNum: 10,
      };
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("Invalid input, please try again!");
        return;
      }

      return [enteredTitle, enteredDescription, +enteredPeople];
    }
    private clearInputs() {
      this.titleInputElement.value = " ";
      this.descriptionInputElement.value = " ";
      this.peopleInputElement.value = "";
    }
    @AUTOBIND
    private submitHandler(event: Event) {
      event.preventDefault();
      const userInput = this.gatherUserInput();
      // can't check tuple because js does not have it but tuples are like array, so you can check Array
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        projectState?.addProject(title, description, people);
        this.clearInputs();
      }
    }
    configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
  }

