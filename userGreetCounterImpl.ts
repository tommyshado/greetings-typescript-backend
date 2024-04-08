import UserGreetCounter from "./userGreetCounterInt";

export default class MapUserGreetCounter implements UserGreetCounter {
    private greetCounts : Map<string, number>;
    
    constructor() {
        this.greetCounts = new Map<string, number>();
    };

    countGreet(firstName: string) : void {
        let currentCount = this.greetCounts.get(firstName) || 0;

        if (!currentCount) {
            this.greetCounts.set(firstName, 1);
            console.log("*****", this.greetCounts.get(firstName));
        }

        else this.greetCounts.set(firstName, currentCount + 1);
    };

    get greetCounter(): number {
        console.log(this.greetCounts.size);
        
        return this.greetCounts.size;
    };

    userGreetCount(firstName: string): number {
        console.log(this.greetCounts);
        
        return this.greetCounts.get(firstName) || 0;
    }
}