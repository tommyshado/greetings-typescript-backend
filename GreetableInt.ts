import { Language } from "./Language";

export default interface Greetable {
    greet(firstName: string, language: Language) : string;
};