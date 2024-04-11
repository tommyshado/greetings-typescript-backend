export default interface Greetable {
    greet(firstName: string, language: string) : Promise<string>;
    addLangAndGreeting(language: string, greeting: string) : Promise<string>;
};