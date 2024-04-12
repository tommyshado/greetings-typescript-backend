import IGreetable from "./Greetable";
import UserGreetCounter from "./UserGreetCounter";
import MapLangAndGreeting from "./GreetableUsingDb";

export default class Greeter implements IGreetable {
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

    async addGreeting(language: string, greeting: string): Promise<string> {
        const results = this.greetable.addGreeting(language, greeting);
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