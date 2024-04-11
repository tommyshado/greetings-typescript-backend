import Greetable from "./GreetableInt";
import { Language } from "./Language";
import UserGreetCounter from "./UserGreetCounterInt";
import MapLangAndGreeting from "./GreetableImp";

export default class Greeter implements Greetable {
    constructor(private greetable: MapLangAndGreeting, private userGreetCounter: UserGreetCounter) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
    }

    // MapLangAndGreeting class methods
    async greet(name: string, chosenLanguage: string): Promise<string> {
        let message = await this.greetable.greet(name, chosenLanguage);
        await this.userGreetCounter.countGreet(name);
        return message;
    };

    async addLangAndGreeting(language: string, greeting: string): Promise<string> {
        const results = this.greetable.addLangAndGreeting(language, greeting);
        return results;
    }

    // MapUserGreetCounter class methods
    public get greetCounter(): Promise<number> {
        return (async () => {
            return await this.userGreetCounter.greetCounter;
        })();
    };

    async userGreetCount(firstName: string): Promise<number> {
        return await this.userGreetCounter.userGreetCount(firstName);
    };
}