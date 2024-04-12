export default interface UserGreetCounter {
    countGreet(firstName: string) : Promise<void>;
    readonly greetCounter : Promise<number>;
    userGreetCount(firstName: string) : Promise<number>;
}
