import UserGreetCounter from "./UserGreetCounterImpl";
import GreetableUsingDb from "./GreetableUsingDb";
import { GreetableAndCounter } from "./GreetableAndCounterI";

export default class Greeter implements GreetableAndCounter {
    constructor(private greetable: GreetableUsingDb, private userGreetCounter: UserGreetCounter) {}

    async greet(name: string, chosenLanguage: string): Promise<string> {
        let message = await this.greetable.greet(name, chosenLanguage);
        await this.countGreet(name);
        return message;
    };

    async addGreeting(language: string, greeting: string): Promise<string> {
        const results = await this.greetable.addGreeting(language, greeting);
        return results;
    }

    async countGreet(firstName: string): Promise<void> {
        await this.userGreetCounter.countGreet(firstName);
    }

    async getLanguages(): Promise<object[]> {
        return await this.greetable.getLanguages();
    };

    public get greetCounter(): Promise<number> {
        return (async () => {
            return await this.userGreetCounter.greetCounter;
        })();
    };

    async userGreetCount(firstName: string): Promise<number> {
        return await this.userGreetCounter.userGreetCount(firstName);
    };
}