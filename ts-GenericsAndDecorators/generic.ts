/* GENERIC TYPE */

/*
const names: Array<string> = []; // same as string[]
//names.push('hi');
//console.log(names)

const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => {
      resolve('This is done!');
  }, 2000);
});

promise.then(data => {
  data.split(' ');
})
*/

// the angle brackets tells TypeScript it should expect generic objects T, U
// extends will force the generic object to be of a certain type (like number)
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

const mergedObj = merge({ name: "Max" }, { age: 30 });
console.log(mergedObj);

interface Lengthy {
  length: number;
}

function countAndPrint<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = "Got no value.";
  if (element.length === 1) {
    descriptionText = "Got 1 element.";
  } else if (element.length > 1) {
    descriptionText = "Got " + element.length + " elements";
  }
  return [element, descriptionText];
}

console.log('String :', countAndPrint("Hi"));
console.log('Array :', countAndPrint(['apple', 'cherry', 'watermelon']));

/* KEYOF Constraint */
function extractAndConvert<T extends object, U extends keyof T>(
  obj: T,
  key: U
) {
  return obj[key];
}

console.log(extractAndConvert({ fruit: "cherry" }, "fruit"));


/*
GENERIC CLASSES
*/
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
      this.data.push(item);
  }

  removeItem(item: T) {
      this.data.splice(this.data.indexOf(item), 1);
  }

  getItems() {
      return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Storage 1');
textStorage.addItem('Storage 2');
console.log('String Storage :', textStorage.getItems());

const numStorage = new DataStorage<number | string>();
numStorage.addItem(3);
numStorage.addItem('Storage 4');
numStorage.addItem(5);
numStorage.addItem(6);
numStorage.addItem(7);
numStorage.removeItem(5);
console.log('Number Storage :', numStorage.getItems());

/*
// generic class only works with primitive values
const objectStorage = new DataStorage<object>();
objectStorage.addItem({storage : '6'});
objectStorage.addItem({storage : '7'});
objectStorage.addItem({storage : '8'});
objectStorage.removeItem({storage : '6'})
console.log('Object Storage :', objectStorage.getItems());
*/

/*
GENERIC UTILITY TYPES
*/

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

// PARTIAL generates a new type based on CourseGoal with all the property.
function createCourseGoal(title: string, description: string, date: Date) {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = date;
  return courseGoal;
}

// makes it locked array
const names: Readonly<string[]> = ['Planes', 'Trains'];
//names.push('Cars');
console.log(names)
