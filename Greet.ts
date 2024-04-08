import GreetIn from "./GreetIn";
import { language } from "./Language";

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