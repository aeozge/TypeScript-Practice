// print hello world
console.log("Hello World!!");

/* 
TypeScript Core Types

Primitives : number, string and boolean
Object
array
tuple
enum
any
*/

// create a func with parameters
function add(n1: number, n2: number, result: boolean) {
  const total = n1 + n2;
  if (result) {
    console.log(total);
  }
}
// output will be 7.279999999999999
let number1 = 5;
const number2 = 2.28;
const result = true;
add(number1, number2, result);

//create an object includes array
const person = {
  name: "Pol",
  age: "21",
  hobbies: ["cooking", "painting"],
};

// define string type array
let favActivities: string[];
favActivities = ["painting"];
console.log(person.name);

for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
}

// tuple type => role

const person2: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Anna",
  age: 26,
  hobbies: ["basketball", "planting"],
  role: [2, "author"],
};

//console.log("pure object", person2);
person2.role.push("admin");
console.log("after adding in tuple", person2);

// define role with enum
//enum assigns labels to numbers
// ADMIN = 0, READ_ONLY = 1, AUTHOR=2,
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR,
}
const person3 = {
  name: "Piril",
  age: 30,
  hobbies: ["baking", "sports"],
  role: Role.ADMIN,
};

if (person3.role === Role.ADMIN) {
  console.log("is admin");
}

/* 
TypeScript Union Type
*/

function combine(input1: number | string, input2: number | string) {
  let result;
  if (typeof input1 === "number" && typeof input2 === "number") {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}
const combineAges = combine(20, 40);
console.log("combineAges :", combineAges);

const combineNames = combine("Poly", "Anna");
console.log("combineNames :", combineNames);

/* 
TypeScript Literal Type
*/

function combineLiteral(
  input1: Combinable,
  input2: Combinable,
  resultConversation: ConversionDescriptor
) {
  let result;
  if (
    (typeof input1 === "number" && typeof input2 === "number") ||
    resultConversation === "asNumber"
  ) {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}
const combinedAges = combineLiteral(20, 40, "asNumber");
console.log("combineAges :", combinedAges);

const combinedStringAges = combineLiteral("20", "40", "asNumber");
console.log("combineStringAges :", combinedStringAges);

const combinedNames = combineLiteral("Poly", "Anna", "asText");
console.log("combineNames :", combinedNames);

// Type Aliases : store union types by creating a new type

type Combinable = number | string;
type ConversionDescriptor = "asNumber" | "asText";

// Function return types & void

function divide(num1: number, num2: number): number {
  return num1 / num2;
}
function printResult(num: number): void {
  console.log("Division result : ", num);
}
printResult(divide(15, 3));


// Function types define the parameters and return type of a function.
// Callback functions can return something even if the argument takes void type.
