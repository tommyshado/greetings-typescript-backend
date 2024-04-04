// import Person from "./person";
import GreetIn from "./greetIn";
import { language } from "./language";

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


export default class Greeter {
    private greetLanguages: Map<language, GreetIn>

    constructor(greetLanguages: Map<language, GreetIn>) {
        this.greetLanguages = greetLanguages;
    }

    greet(name: string, chosenLanguage: language) {
        let greetIn = this.greetLanguages.get(chosenLanguage);
        
        if (greetIn) {
            return greetIn.greet(name);
        };
    };
}


// export default function greet(name: string, chosenLanguage: language) {
//     let greetIn : GreetIn = new GreetInEnglish();

//     if (chosenLanguage === language.tswana) {
//         greetIn = new GreetInTswana();
//     };

//     if (chosenLanguage === language.xhosa) {
//         greetIn = new GreetInXhosa();
//     };

//     return greetIn.greet(name);

// };


// let theGreetInMap : Map<language, GreetIn> = new Map();
// theGreetInMap.set(language.eng, new GreetInEnglish());

// let greeting = theGreetInMap.get(language.eng);
// console.log(greeting?.greet("Lindani"));
