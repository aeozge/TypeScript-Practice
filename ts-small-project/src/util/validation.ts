//Validation
export interface Validation {
  value: string | number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  minNum?: number;
  maxNum?: number;
}
export function validate(validatableInput: Validation) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (
    validatableInput.minLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.minLength;
  }
  if (
    validatableInput.maxLength != null &&
    typeof validatableInput.value === "string"
  ) {
    isValid =
      isValid && validatableInput.value.length > validatableInput.maxLength;
  }

  if (
    validatableInput.minNum != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value >= validatableInput.minNum;
  }

  if (
    validatableInput.maxNum != null &&
    typeof validatableInput.value === "number"
  ) {
    isValid = isValid && validatableInput.value <= validatableInput.maxNum;
  }

  return isValid;
}
