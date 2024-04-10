import assert from "assert";
import Greeter /*, { GreetInEnglish, GreetInTswana, GreetInXhosa, GreetInManager } */ from "../Greet";
import GreetIn from "../GreetIn";
import { Language } from "../Language";
import MapUserGreetCounter from "../UserGreetCounterImpl";
import pool from "../model/Pool";
import MapLangAndGreeting from "../GreetableImp";

let greetMap = new MapLangAndGreeting(pool);
// let greetInManager = new GreetInManager(greetMap);

let userGreetCounterMap = new MapUserGreetCounter(pool);
let greeter = new Greeter(greetMap, userGreetCounterMap);

describe("Greetings with TypeScript", async function() {
    this.timeout(10000);

    beforeEach(async () => {
        // Truncate tables before insertion
        const query = "truncate table user_greet_counter restart identity";
        await pool.query(query);

        const query_ = "truncate table language_greeting_map restart identity";
        await pool.query(query_);

        // Inserting languages and greeting into the [language_greeting_map] table
        const insertEngQuery = "insert into language_greeting_map (language, greetings) values ($1, $2)";
        await pool.query(insertEngQuery, ["English", "Hello"]);

        const insertXhosaQuery = "insert into language_greeting_map (language, greetings) values ($1, $2)";
        await pool.query(insertXhosaQuery, ["Xhosa", "Molo"]);

        const insertTswanaQuery = "insert into language_greeting_map (language, greetings) values ($1, $2)";
        await pool.query(insertTswanaQuery, ["Tswana", "Dumela"]);
    });

    it("should greet in Xhosa", async () => {
        const xhosaGreeter = await greeter.greet("FakeUserOne", Language.Xhosa);
        assert.equal("Molo FakeUserOne", xhosaGreeter);
    });
    
    it("should greet in Twana", async () => {
        const tswanaGreeter = await greeter.greet("FakeUserTwo", Language.Tswana);
        assert.equal("Dumela FakeUserTwo", tswanaGreeter);
    });
    
    it("should greet in English", async () => {
        const englishGreeter = await greeter.greet("FakeUserThree", Language.English);
        assert.equal("Hello FakeUserThree", englishGreeter);
    });
    
    // Testing UserGreetCounter implementation
    
    // it("should increment greet counter", async () => {
    //     await greeter.greet("User", Language.eng);
    //     await greeter.greet("UserOne", Language.xhosa);
    //     await greeter.greet("UserTwo", Language.eng);
        
    //     assert.equal(3, await greeter.greetCounter);

    //     await greeter.greet("UserThree", Language.xhosa);
    //     await greeter.greet("UserFour", Language.eng);
    
    //     assert.equal(5, await greeter.greetCounter);
    // });
    
    // it("should get user greets", async () => {
    //     await greeter.greet("User", Language.tswana);
    //     await greeter.greet("User", Language.xhosa);
    //     await greeter.greet("UserOne", Language.xhosa);
    //     await greeter.greet("UserTwo", Language.eng);
    //     await greeter.greet("UserTwo", Language.eng);
    
    //     assert.equal(2, await greeter.userGreetCount("User"));
    
    //     await greeter.greet("UserOne", Language.xhosa);
    //     await greeter.greet("UserTwo", Language.eng);
    
    //     assert.equal(3, await greeter.userGreetCount("UserTwo"));
    // });

    this.afterAll(async () => await pool.end());
})