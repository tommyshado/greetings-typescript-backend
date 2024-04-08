
export default interface UserGreetCounter {
    countGreet(firstName: string) : void;
    readonly greetCounter : number;
    userGreetCount(firstName: string) : number;
}
