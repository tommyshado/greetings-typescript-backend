import assert from "assert";
import Greeter, { GreetInEnglish, GreetInTswana, GreetInXhosa, GreetInManager } from "../Greet";
import GreetIn from "../GreetIn";
import { Language } from "../Language";
import MapUserGreetCounter from "../UserGreetCounterImpl";
import pool from "../model/Pool";

let greetMap = new Map<Language, GreetIn>();
greetMap.set(Language.eng, new GreetInEnglish);
greetMap.set(Language.tswana, new GreetInTswana);
greetMap.set(Language.xhosa, new GreetInXhosa);

let greetInManager = new GreetInManager(greetMap);

let userGreetCounterMap = new MapUserGreetCounter(pool);
let greeter = new Greeter(greetInManager, userGreetCounterMap);

describe("Greetings with TypeScript", async function() {
    this.timeout(10000);

    beforeEach(async () => {
        const query = "truncate table user_greet_counter restart identity";
        await pool.query(query);
    });

    it("should greet in Xhosa", () => {
        const xhosaGreeter = greeter.greet("FakeUserOne", Language.xhosa);
        assert.equal("Molo FakeUserOne", xhosaGreeter);
    });
    
    it("should greet in Twana", () => {
        const tswanaGreeter = greeter.greet("FakeUserTwo", Language.tswana);
        assert.equal("Dumela FakeUserTwo", tswanaGreeter);
    });
    
    it("should greet in English", () => {
        const englishGreeter = greeter.greet("FakeUserThree", Language.eng);
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