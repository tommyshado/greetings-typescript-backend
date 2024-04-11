import Greetable from "./GreetableInt";
import { Language } from "./Language";
import UserGreetCounter from "./UserGreetCounterInt";
import MapLangAndGreeting from "./GreetableImp";

export default class Greeter implements Greetable {
    private greetable: MapLangAndGreeting;
    private userGreetCounter: UserGreetCounter

    constructor(greetable: MapLangAndGreeting, userGreetCounter: UserGreetCounter) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
    }

    async greet(name: string, chosenLanguage: Language) {
        let message = await this.greetable.greet(name, chosenLanguage);
        await this.userGreetCounter.countGreet(name);
        return message;
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