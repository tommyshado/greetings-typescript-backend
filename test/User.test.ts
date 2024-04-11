import assert from "assert";
import Greeter from "../Greet";
import MapUserGreetCounter from "../UserGreetCounterImpl";
import pool from "../model/Pool";
import MapLangAndGreeting from "../GreetableImp";

let greetMap = new MapLangAndGreeting(pool);
let userGreetCounterMap = new MapUserGreetCounter(pool);
let greeter = new Greeter(greetMap, userGreetCounterMap);

describe("Greetings with TypeScript", async function() {
    this.timeout(10000);

    let zuluLanguage: string;
    let xhosaLanguage: string;
    let englishLanguage: string;
    let tswanaLanguage: string;

    beforeEach(async () => {
        // Truncate tables before insertion
        const query = "truncate table user_greet_counter restart identity";
        await pool.query(query);

        const query_ = "truncate table language_greeting_map restart identity";
        await pool.query(query_);

        // Inserting languages and greeting into the [language_greeting_map] table
        zuluLanguage = await greeter.addLangAndGreeting("Zulu", "Sawubona");
        xhosaLanguage = await greeter.addLangAndGreeting("Xhosa", "Molo");
        englishLanguage = await greeter.addLangAndGreeting("English", "Hello");
        tswanaLanguage = await greeter.addLangAndGreeting("Tswana", "Dumela");
    });

    // Testing Greetable implementation

    it("should greet in Xhosa", async () => {
        const xhosaGreeter = await greeter.greet("FakeUserOne", xhosaLanguage);
        assert.equal("Molo FakeUserOne", xhosaGreeter);
    });
    
    it("should greet in Twana", async () => {
        const tswanaGreeter = await greeter.greet("FakeUserTwo", tswanaLanguage);
        assert.equal("Dumela FakeUserTwo", tswanaGreeter);
    });
    
    it("should greet in English", async () => {
        const englishGreeter = await greeter.greet("FakeUserThree", englishLanguage);
        assert.equal("Hello FakeUserThree", englishGreeter);
    });
    
    // Testing UserGreetCounter implementation
    
    it("should increment greet counter", async () => {
        await greeter.greet("User", zuluLanguage);
        await greeter.greet("UserOne", xhosaLanguage);
        
        assert.equal(2, await greeter.greetCounter);

        await greeter.greet("UserTwo", xhosaLanguage);
        await greeter.greet("UserThree", englishLanguage);
    
        assert.equal(4, await greeter.greetCounter);
    });
    
    it("should get user greets", async () => {
        await greeter.greet("User", tswanaLanguage);
        await greeter.greet("User", xhosaLanguage);
        await greeter.greet("UserOne", xhosaLanguage);
        await greeter.greet("UserTwo", englishLanguage);
        await greeter.greet("UserTwo", englishLanguage);
    
        assert.equal(2, await greeter.userGreetCount("User"));
    
        await greeter.greet("UserOne", xhosaLanguage);
        await greeter.greet("UserTwo", englishLanguage);
    
        assert.equal(3, await greeter.userGreetCount("UserTwo"));
    });

    this.afterAll(async () => await pool.end());
})