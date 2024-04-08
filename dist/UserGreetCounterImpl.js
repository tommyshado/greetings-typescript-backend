"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapUserGreetCounter {
    constructor() {
        this.greetCounts = new Map();
    }
    ;
    countGreet(firstName) {
        let currentCount = this.greetCounts.get(firstName) || 0;
        if (!currentCount) {
            this.greetCounts.set(firstName, 1);
        }
        else
            this.greetCounts.set(firstName, currentCount + 1);
    }
    ;
    get greetCounter() {
        return this.greetCounts.size;
    }
    ;
    userGreetCount(firstName) {
        return this.greetCounts.get(firstName) || 0;
    }
}
exports.default = MapUserGreetCounter;
