import IGreetable from "./Greetable";
import UserGreetCounter from "./UserGreetCounter";
import GreetableUsingDb from "./GreetableUsingDb";

export default class Greeter implements IGreetable {
    constructor(private greetable: GreetableUsingDb, private userGreetCounter: UserGreetCounter) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
    }

    // GreetableUsingDb class methods
    async greet(name: string, chosenLanguage: string): Promise<string> {
        let message = await this.greetable.greet(name, chosenLanguage);
        await this.userGreetCounter.countGreet(name);
        return message;
    };

    async addGreeting(language: string, greeting: string): Promise<string> {
        const results = await this.greetable.addGreeting(language, greeting);
        return results;
    }

    async getLanguages(): Promise<object[]> {
        return await this.greetable.getLanguages();
    };

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