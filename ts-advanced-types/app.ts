type Admin = {
  name: string;
  privilages: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};
/*
Intersaction Type
*/
type ElevatedEmployee = Admin & Employee;

const emp1: ElevatedEmployee = {
  name: "Bob",
  privilages: ["create-server"],
  startDate: new Date(),
};

type Combinable = string | number;
type Numeric = number | boolean;
/*
Intersaction Type
*/
type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
  /* TYPE GUARD */
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log("Employee Name :", emp.name);
  /* TYPE GUARD */
  if ("privilages" in emp) {
    console.log("Privileges: " + emp.privilages);
  }
  if ("startDate" in emp) {
    console.log("Start date :", emp.startDate);
  }
}
printEmployeeInfo(emp1);

/* InstanceOF TYPE Guard */

class Car {
  drive() {
    console.log("driving inside car...");
  }
}

class Truck {
  drive() {
    console.log("driving inside truck...");
  }

  loadCargo(amount: number) {
    console.log("loading cargo: " + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(100);
  }
}
useVehicle(v1);
useVehicle(v2);

/* Help with Type Guards : 
Discriminated Unions => It's a pattern can be use when working with union types. */
interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Horse {
  type: "horse";
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  if ("flyingSpeed" in animal) {
    console.log("Moving speed: ", animal.flyingSpeed);
  }
  let speed;
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;
    case "horse":
      speed = animal.runningSpeed;
      break;
  }
  console.log("Moving at speed: " + speed);
}

moveAnimal({ type: "bird", flyingSpeed: 10 });
moveAnimal({ type: "horse", runningSpeed: 17 });

/*
TYPE CASTING
*/

// const userInputElement = <HTMLInputElement>document.getElementById('my-input');
const userInputElement = document.getElementById(
  "my-input"
) as HTMLInputElement;

userInputElement.value = "Hello there!";

/*
INDEX TYPES
*/
interface ErrorContainer {
  // [prop: string] basically states that we don't know how many properties there will be, and what names they will have, we only know that they are of type string
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: "Not a valid email!",
  username: "Must start with a capital character!",
};

/*
FUNCTION OVERLOAD - a function with the same name,
but takes different number of parameters and/or have different return types
*/
function add_overload(a: number, b: number): number;
function add_overload(a: string, b: string): string;
function add_overload(a: number, b: string): string;
function add_overload(a: string, b: number): string;
function add_overload(a: Combinable, b: Combinable) {
  if (typeof a === "string" || typeof b === "string") {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add_overload("Max ", "Brenner");
result.split(" ");

console.log("Function Overload String :", result);

const result1 = add_overload(3, "Brenner");
result1.split(" ");

console.log("Function Overload Number and String :", result1);

/*
OPTIONAL CHAINING - 
- this is useful when accessing objects with very deep nests that we are unaware if the value will exist
*/
const fetchedUserData = {
  id: "u1",
  name: "May",
  job: { title: "CEO", description: "My own company" },
};
// standard javascript way of ensuring that a variable is not null before accessing it to avoid runtime errors
console.log(fetchedUserData && fetchedUserData.job.title);

// in typescript, we just add question marks to variables we are unsure if exists
//its like short version of the first console.log one
console.log(fetchedUserData?.job?.title);

//check fetchedUserData if its exist then dive deeper into that object
console.log(fetchedUserData && fetchedUserData.name);
console.log(
  fetchedUserData && fetchedUserData.job && fetchedUserData.job.description
);

/*
NULLISH COALESCING OPERATOR => ??
- if it's not null or undefined, then we will use the fallback value
*/
const userInput = null;
const storedData = userInput ?? 'DEFAULT';
console.log(storedData);

const userInput1 = "deneme"; // if it's empty string, you can store " "
const storedData1 = userInput1 ?? 'DEFAULT';
console.log(storedData1);

