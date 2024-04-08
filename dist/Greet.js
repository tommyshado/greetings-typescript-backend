"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GreetInTswana = exports.GreetInEnglish = exports.GreetInXhosa = void 0;
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
