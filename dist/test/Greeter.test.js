import assert from "assert";
import Greeter from "../Greeter";
import MapUserGreetCounter from "../UserGreetCounterImpl";
import pool from "../model/Pool";
import GreetableUsingDb from "../GreetableUsingDb";
let greetableUsingDb = new GreetableUsingDb(pool);
let userGreetCounterMap = new MapUserGreetCounter(pool);
let greeter = new Greeter(greetableUsingDb, userGreetCounterMap);
describe("Greetings with TypeScript", async function () {
    this.timeout(10000);
    let zuluLanguage;
    let xhosaLanguage;
    let englishLanguage;
    let tswanaLanguage;
    beforeEach(async () => {
        // Truncate tables before insertion
        const query = "truncate table user_greet_counter restart identity";
        await pool.query(query);
        const query_ = "truncate table language_greeting_map restart identity";
        await pool.query(query_);
        // Inserting languages and greeting into the [language_greeting_map] table
        zuluLanguage = await greeter.addGreeting("Zulu", "Sawubona");
        xhosaLanguage = await greeter.addGreeting("Xhosa", "Molo");
        englishLanguage = await greeter.addGreeting("English", "Hello");
        tswanaLanguage = await greeter.addGreeting("Tswana", "Dumela");
    });
    describe("The GreetableUsingDb class", function () {
        it("should greet in Zulu", async () => {
            const zuluGreeter = await greetableUsingDb.greet("Anele", zuluLanguage);
            assert.equal("Sawubona Anele", zuluGreeter);
        });
        it("should greet in Xhosa", async () => {
            const xhosaGreeter = await greetableUsingDb.greet("Gcogco", xhosaLanguage);
            assert.equal("Molo Gcogco", xhosaGreeter);
        });
        it("should add a language and greeting", async () => {
            const language = await greetableUsingDb.addGreeting("French", "Bonjour");
            assert.equal("French", language);
        });
        it("should get all the languages", async () => {
            const languages = await greetableUsingDb.getLanguages();
            assert.deepEqual([
                { language: "Zulu" },
                { language: "Xhosa" },
                { language: "English" },
                { language: "Tswana" },
            ], languages);
        });
    });
    describe("The UserGreetCounterImpl class", function () {
        it("should increment the greetings counter", async () => {
            await userGreetCounterMap.countGreet("Mthunzi");
            assert.equal(1, await userGreetCounterMap.greetCounter);
            await userGreetCounterMap.countGreet("Ace");
            assert.equal(2, await userGreetCounterMap.greetCounter);
        });
        it("should get user greetings count", async () => {
            await userGreetCounterMap.countGreet("Mthunzi");
            await userGreetCounterMap.countGreet("Mthunzi");
            await userGreetCounterMap.countGreet("Mthunzi");
            assert.equal(3, await userGreetCounterMap.userGreetCount("Mthunzi"));
            await userGreetCounterMap.countGreet("Ace");
            await userGreetCounterMap.countGreet("Ace");
            assert.equal(2, await userGreetCounterMap.userGreetCount("Ace"));
        });
    });
    describe("The Greeter class", function () {
        it("should greet in Xhosa", async () => {
            const xhosaGreeter = await greeter.greet("Mthunzi", xhosaLanguage);
            assert.equal("Molo Mthunzi", xhosaGreeter);
        });
        it("should greet in Tswana", async () => {
            const tswanaGreeter = await greeter.greet("Katlego", tswanaLanguage);
            assert.equal("Dumela Katlego", tswanaGreeter);
        });
        it("should greet in English", async () => {
            const englishGreeter = await greeter.greet("Nick", englishLanguage);
            assert.equal("Hello Nick", englishGreeter);
        });
        it("should increment the greeting counter", async () => {
            await greeter.greet("Bjorn", zuluLanguage);
            await greeter.greet("Kat", xhosaLanguage);
            assert.equal(2, await greeter.greetCounter);
            await greeter.greet("Nick", xhosaLanguage);
            await greeter.greet("Katlego", englishLanguage);
            assert.equal(4, await greeter.greetCounter);
        });
        it("should get user greetings count", async () => {
            await greeter.greet("Mthunzi", tswanaLanguage);
            await greeter.greet("Mthunzi", xhosaLanguage);
            await greeter.greet("Katlego", xhosaLanguage);
            await greeter.greet("Bjorn", englishLanguage);
            await greeter.greet("Bjorn", englishLanguage);
            assert.equal(2, await greeter.userGreetCount("Mthunzi"));
            await greeter.greet("Katlego", xhosaLanguage);
            await greeter.greet("Bjorn", englishLanguage);
            assert.equal(3, await greeter.userGreetCount("Bjorn"));
        });
        it("should get all the languages", async () => {
            const languages = await greeter.getLanguages();
            assert.deepEqual([
                { language: "Zulu" },
                { language: "Xhosa" },
                { language: "English" },
                { language: "Tswana" },
            ], languages);
        });
    });
    this.afterAll(async () => await pool.end());
});
