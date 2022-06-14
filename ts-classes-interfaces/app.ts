abstract class Department {
  name: string;
  private employees: string[] = [];

  // shorthand initialization
  // you can't change id after initial.
  constructor(private readonly id: string, n: string) {
    this.name = n;
  }

  static createEmployee(name: string) {
    return { name: name };
  }
  /*describe() {
    console.log(`Department ${this.id} : ${this.name}`);
  }*/
  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  printEmployeeInfo() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

/*const science = new Department("d1", "Science");
//console.log(science);
science.describe();

science.addEmployee("Max");
science.addEmployee("Leo");

science.printEmployeeInfo();
*/

const employee1 = Department.createEmployee("Bob");
console.log("createEmployee :", employee1);

// Inheritance
class ITDepartment extends Department {
  admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, "IT");
    this.admins = admins;
  }
  describe(this: ITDepartment) {
    console.log(`ITDepartment ID: ${this.admins}`);
  }
}

const tech = new ITDepartment("t1", ["t1"]);
//console.log(science);
tech.describe();
tech.addEmployee("APril");
tech.printEmployeeInfo();

console.log(tech);

class AccountingDepart extends Department {
  private lastReport: string;
  private static instance: AccountingDepart;

  get mostRecentReport() {
    return this.lastReport;
  }
  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value!");
    }
    this.addReport(value);
  }
  constructor(id: string, private reports: string[]) {
    super(id, "Account");
    this.lastReport = reports[0];
  }

  static getInstance() {
    if (AccountingDepart.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepart("a2", []);
    return this.instance;
  }

  addReport(text: string) {
    this.reports.push(text);
  }
  printReports() {
    console.log(this.reports);
  }

  describe() {
    console.log("Implementing the abstract method");
  }
}

//const accounting = new AccountingDepart("a1", []);
const accounting = AccountingDepart.getInstance();
console.log(accounting);

// access set method
accounting.mostRecentReport = "Year End Report";

accounting.addReport("Something went wrong...");
accounting.addReport("Something changed...");

accounting.printReports();

//access get method
console.log("get method", accounting.mostRecentReport);
