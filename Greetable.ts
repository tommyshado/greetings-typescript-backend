export default interface Greetable {
    greet(firstName: string, language: string) : Promise<string>;
    addGreeting(language: string, greeting: string) : Promise<string>;
};