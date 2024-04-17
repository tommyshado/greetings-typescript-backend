export default class Greeter {
    constructor(greetable, userGreetCounter) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
    }
    // GreetableUsingDb class methods
    async greet(name, chosenLanguage) {
        let message = await this.greetable.greet(name, chosenLanguage);
        await this.userGreetCounter.countGreet(name);
        return message;
    }
    ;
    async addGreeting(language, greeting) {
        const results = await this.greetable.addGreeting(language, greeting);
        return results;
    }
    async getLanguages() {
        return await this.greetable.getLanguages();
    }
    ;
    // MapUserGreetCounter class methods
    get greetCounter() {
        return (async () => {
            return await this.userGreetCounter.greetCounter;
        })();
    }
    ;
    async userGreetCount(firstName) {
        return await this.userGreetCounter.userGreetCount(firstName);
    }
    ;
}
