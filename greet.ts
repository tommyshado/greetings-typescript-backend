// import Person from "./person";
import GreetIn from "./greetIn";
import { language } from "./language";

// export default function greet(person: Person) {
//     return `Hello, ${person.firstName} ${person.lastName} we can't contact you.`;
// }

class GreetInXhosa implements GreetIn {
    greet(name: string): string {
        return `Molo ${name}`;
    }
};

class GreetInEnglish implements GreetIn {
    greet(name: string): string {
        return `Hello ${name}`;
    }
};

class GreetInTswana implements GreetIn {
    greet(name: string): string {
        return `Dumela ${name}`;
    }
};

export default function greet(name: string, chosenLanguage: language) {
    let greetIn : GreetIn = new GreetInEnglish();

    if (chosenLanguage === language.tswana) {
        greetIn = new GreetInTswana();
    };

    if (chosenLanguage === language.xhosa) {
        greetIn = new GreetInXhosa();
    };

    return greetIn.greet(name);

};