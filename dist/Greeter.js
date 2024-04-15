"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Greeter {
    constructor(greetable, userGreetCounter) {
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
        this.greetable = greetable;
        this.userGreetCounter = userGreetCounter;
    }
    // GreetableUsingDb class methods
    greet(name, chosenLanguage) {
        return __awaiter(this, void 0, void 0, function* () {
            let message = yield this.greetable.greet(name, chosenLanguage);
            yield this.userGreetCounter.countGreet(name);
            return message;
        });
    }
    ;
    addGreeting(language, greeting) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = yield this.greetable.addGreeting(language, greeting);
            return results;
        });
    }
    getLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.greetable.getLanguages();
        });
    }
    ;
    // MapUserGreetCounter class methods
    get greetCounter() {
        return (() => __awaiter(this, void 0, void 0, function* () {
            return yield this.userGreetCounter.greetCounter;
        }))();
    }
    ;
    userGreetCount(firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userGreetCounter.userGreetCount(firstName);
        });
    }
    ;
}
exports.default = Greeter;
