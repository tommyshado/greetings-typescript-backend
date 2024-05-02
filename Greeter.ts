import UserGreetCounter from "./UserGreetCounterImpl";
import GreetableUsingDb from "./GreetableUsingDb";
import { GreetableAndCounter } from "./GreetableAndCounterI";
/**
 * The Greeter class is responsible for greeting users and counting the number of greetings.
 * It uses the `GreetableUsingDb` class to perform the greetings and the `UserGreetCounter` class to count the greetings.
 */
export default class Greeter implements GreetableAndCounter {
    /**
     * Constructor for the Greeter class.
     * @param greetable - An instance of the `GreetableUsingDb` class used for greeting users.
     * @param userGreetCounter - An instance of the `UserGreetCounter` class used for counting greetings.
     */
    constructor(private greetable: GreetableUsingDb, private userGreetCounter: UserGreetCounter) {}

    /**
     * Greets a user with a personalized message in a specified language.
     * @param name - The name of the user to greet.
     * @param chosenLanguage - The language in which to greet the user.
     * @returns A promise that resolves to the personalized greeting message.
     */
    async greet(name: string, chosenLanguage: string): Promise<string> {
        let message = await this.greetable.greet(name, chosenLanguage);
        await this.countGreet(name);
        return message;
    };

    /**
     * Adds a new greeting in a specified language.
     * @param language - The language in which to add the new greeting.
     * @param greeting - The new greeting message.
     * @returns A promise that resolves to the result of the `addGreeting` operation.
     */
    async addGreeting(language: string, greeting: string): Promise<string> {
        const results = await this.greetable.addGreeting(language, greeting);
        return results;
    }

    /**
     * Counts the number of greetings for a specific user.
     * @param firstName - The first name of the user to count the greetings for.
     * @returns A promise that resolves when the count is complete.
     */
    async countGreet(firstName: string): Promise<void> {
        await this.userGreetCounter.countGreet(firstName);
    }

    /**
     * Retrieves a list of available languages for greetings.
     * @returns A promise that resolves to an array of objects representing the available languages.
     */
    async getLanguages(): Promise<object[]> {
        return await this.greetable.getLanguages();
    };

    /**
     * Retrieves the current count of greetings for a specific user.
     * @param firstName - The first name of the user to retrieve the greet count for.
     * @returns A promise that resolves to the current greet count for the specified user.
     */
    public get greetCounter(): Promise<number> {
        return (async () => {
            return await this.userGreetCounter.greetCounter;
        })();
    };

    /**
     * Counts the number of greetings for a specific user and returns the count.
     * @param firstName - The first name of the user to count the greetings for.
     * @returns A promise that resolves to the current greet count for the specified user.
     */
    async userGreetCount(firstName: string): Promise<number> {
        return await this.userGreetCounter.userGreetCount(firstName);
    };
}