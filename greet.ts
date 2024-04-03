// import Person from "./person";
import GreetIn from "./greetIn";

// export default function greet(person: Person) {
//     return `Hello, ${person.firstName} ${person.lastName} we can't contact you.`;
// }

export class GreetInXhosa implements GreetIn {
    greet(name: string): string {
        return `Molo ${name}`;
    }
};

export class GreetInEnglish implements GreetIn {
    greet(name: string): string {
        return `Hello ${name}`;
    }
};

export class GreetInTswana implements GreetIn {
    greet(name: string): string {
        return `Dumela ${name}`;
    }
};