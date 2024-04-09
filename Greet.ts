import GreetIn from "./GreetIn";
import { language } from "./Language";
import UserGreetCounter from "./UserGreetCounterInt";

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
    private userGreetCounter: UserGreetCounter

    constructor(greetLanguages: Map<language, GreetIn>, userGreetCounter: UserGreetCounter) {
        this.greetLanguages = greetLanguages;
        this.userGreetCounter = userGreetCounter;
    }

    greet(name: string, chosenLanguage: language) {
        let greetIn = this.greetLanguages.get(chosenLanguage);

        this.userGreetCounter.countGreet(name);
        
        if (greetIn) {
            return greetIn.greet(name);
        };

        return "";
    };

    public get greetCounter(): number {
        return this.userGreetCounter.greetCounter;
    };

    userGreetCount(firstName: string): number {
        return this.userGreetCounter.userGreetCount(firstName);
    };
}