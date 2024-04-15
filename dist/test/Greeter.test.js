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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const Greeter_1 = __importDefault(require("../Greeter"));
const UserGreetCounterImpl_1 = __importDefault(require("../UserGreetCounterImpl"));
const Pool_1 = __importDefault(require("../model/Pool"));
const GreetableUsingDb_1 = __importDefault(require("../GreetableUsingDb"));
let greetableUsingDb = new GreetableUsingDb_1.default(Pool_1.default);
let userGreetCounterMap = new UserGreetCounterImpl_1.default(Pool_1.default);
let greeter = new Greeter_1.default(greetableUsingDb, userGreetCounterMap);
describe("Greetings with TypeScript", function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.timeout(10000);
        let zuluLanguage;
        let xhosaLanguage;
        let englishLanguage;
        let tswanaLanguage;
        beforeEach(() => __awaiter(this, void 0, void 0, function* () {
            // Truncate tables before insertion
            const query = "truncate table user_greet_counter restart identity";
            yield Pool_1.default.query(query);
            const query_ = "truncate table language_greeting_map restart identity";
            yield Pool_1.default.query(query_);
            // Inserting languages and greeting into the [language_greeting_map] table
            zuluLanguage = yield greeter.addGreeting("Zulu", "Sawubona");
            xhosaLanguage = yield greeter.addGreeting("Xhosa", "Molo");
            englishLanguage = yield greeter.addGreeting("English", "Hello");
            tswanaLanguage = yield greeter.addGreeting("Tswana", "Dumela");
        }));
        describe("The GreetableUsingDb class", function () {
            it("should greet in Zulu", () => __awaiter(this, void 0, void 0, function* () {
                const zuluGreeter = yield greetableUsingDb.greet("Anele", zuluLanguage);
                assert_1.default.equal("Sawubona Anele", zuluGreeter);
            }));
            it("should greet in Xhosa", () => __awaiter(this, void 0, void 0, function* () {
                const xhosaGreeter = yield greetableUsingDb.greet("Gcogco", xhosaLanguage);
                assert_1.default.equal("Molo Gcogco", xhosaGreeter);
            }));
            it("should add a language and greeting", () => __awaiter(this, void 0, void 0, function* () {
                const language = yield greetableUsingDb.addGreeting("French", "Bonjour");
                assert_1.default.equal("French", language);
            }));
        });
        describe("The UserGreetCounterImpl class", function () {
            it("should increment the greetings counter", () => __awaiter(this, void 0, void 0, function* () {
                yield userGreetCounterMap.countGreet("Mthunzi");
                assert_1.default.equal(1, yield userGreetCounterMap.greetCounter);
                yield userGreetCounterMap.countGreet("Ace");
                assert_1.default.equal(2, yield userGreetCounterMap.greetCounter);
            }));
            it("should get user greetings count", () => __awaiter(this, void 0, void 0, function* () {
                yield userGreetCounterMap.countGreet("Mthunzi");
                yield userGreetCounterMap.countGreet("Mthunzi");
                yield userGreetCounterMap.countGreet("Mthunzi");
                assert_1.default.equal(3, yield userGreetCounterMap.userGreetCount("Mthunzi"));
                yield userGreetCounterMap.countGreet("Ace");
                yield userGreetCounterMap.countGreet("Ace");
                assert_1.default.equal(2, yield userGreetCounterMap.userGreetCount("Ace"));
            }));
        });
        describe("The Greeter class", function () {
            it("should greet in Xhosa", () => __awaiter(this, void 0, void 0, function* () {
                const xhosaGreeter = yield greeter.greet("Mthunzi", xhosaLanguage);
                assert_1.default.equal("Molo Mthunzi", xhosaGreeter);
            }));
            it("should greet in Tswana", () => __awaiter(this, void 0, void 0, function* () {
                const tswanaGreeter = yield greeter.greet("Katlego", tswanaLanguage);
                assert_1.default.equal("Dumela Katlego", tswanaGreeter);
            }));
            it("should greet in English", () => __awaiter(this, void 0, void 0, function* () {
                const englishGreeter = yield greeter.greet("Nick", englishLanguage);
                assert_1.default.equal("Hello Nick", englishGreeter);
            }));
            it("should increment the greeting counter", () => __awaiter(this, void 0, void 0, function* () {
                yield greeter.greet("Bjorn", zuluLanguage);
                yield greeter.greet("Kat", xhosaLanguage);
                assert_1.default.equal(2, yield greeter.greetCounter);
                yield greeter.greet("Nick", xhosaLanguage);
                yield greeter.greet("Katlego", englishLanguage);
                assert_1.default.equal(4, yield greeter.greetCounter);
            }));
            it("should get user greetings count", () => __awaiter(this, void 0, void 0, function* () {
                yield greeter.greet("Mthunzi", tswanaLanguage);
                yield greeter.greet("Mthunzi", xhosaLanguage);
                yield greeter.greet("Katlego", xhosaLanguage);
                yield greeter.greet("Bjorn", englishLanguage);
                yield greeter.greet("Bjorn", englishLanguage);
                assert_1.default.equal(2, yield greeter.userGreetCount("Mthunzi"));
                yield greeter.greet("Katlego", xhosaLanguage);
                yield greeter.greet("Bjorn", englishLanguage);
                assert_1.default.equal(3, yield greeter.userGreetCount("Bjorn"));
            }));
        });
        this.afterAll(() => __awaiter(this, void 0, void 0, function* () { return yield Pool_1.default.end(); }));
    });
});
