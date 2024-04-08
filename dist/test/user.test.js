"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const greet_1 = __importStar(require("../greet"));
const language_1 = require("../language");
const userGreetCounterImpl_1 = __importDefault(require("../userGreetCounterImpl"));
let greetMap = new Map();
greetMap.set(language_1.language.eng, new greet_1.GreetInEnglish);
greetMap.set(language_1.language.tswana, new greet_1.GreetInTswana);
greetMap.set(language_1.language.xhosa, new greet_1.GreetInXhosa);
let greeter = new greet_1.default(greetMap);
it("should greet in Xhosa", () => {
    const xhosaGreeter = greeter.greet("FakeUserOne", language_1.language.xhosa);
    assert_1.default.equal("Molo FakeUserOne", xhosaGreeter);
});
it("should greet in Twana", () => {
    const tswanaGreeter = greeter.greet("FakeUserTwo", language_1.language.tswana);
    assert_1.default.equal("Dumela FakeUserTwo", tswanaGreeter);
});
it("should greet in English", () => {
    const englishGreeter = greeter.greet("FakeUserThree", language_1.language.eng);
    assert_1.default.equal("Hello FakeUserThree", englishGreeter);
});
// Testing UserGreetCounter implementation
it("should increment greet counter", () => {
    let userGreetCounterMap = new userGreetCounterImpl_1.default();
    userGreetCounterMap.countGreet("User");
    userGreetCounterMap.countGreet("UserOne");
    userGreetCounterMap.countGreet("UserTwo");
    assert_1.default.equal(3, userGreetCounterMap.greetCounter);
});
it("should get user greets", () => {
    let userGreetCounterMap = new userGreetCounterImpl_1.default();
    userGreetCounterMap.countGreet("User");
    userGreetCounterMap.countGreet("User");
    userGreetCounterMap.countGreet("UserOne");
    userGreetCounterMap.countGreet("UserTwo");
    userGreetCounterMap.countGreet("UserTwo");
    assert_1.default.equal(2, userGreetCounterMap.userGreetCount("User"));
});
