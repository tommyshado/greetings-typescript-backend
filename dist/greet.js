"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetInTswana = exports.GreetInEnglish = exports.GreetInXhosa = void 0;
// export default function greet(person: Person) {
//     return `Hello, ${person.firstName} ${person.lastName} we can't contact you.`;
// }
class GreetInXhosa {
    greet(name) {
        return `Molo ${name}`;
    }
}
exports.GreetInXhosa = GreetInXhosa;
;
class GreetInEnglish {
    greet(name) {
        return `Hello ${name}`;
    }
}
exports.GreetInEnglish = GreetInEnglish;
;
class GreetInTswana {
    greet(name) {
        return `Dumela ${name}`;
    }
}
exports.GreetInTswana = GreetInTswana;
;
class Greeter {
    constructor(greetLanguages) {
        this.greetLanguages = greetLanguages;
    }
    greet(name, chosenLanguage) {
        let greetIn = this.greetLanguages.get(chosenLanguage);
        if (greetIn) {
            return greetIn.greet(name);
        }
        ;
    }
    ;
}
exports.default = Greeter;
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
