import assert from "assert";
import Greeter, { GreetInEnglish, GreetInTswana, GreetInXhosa } from "../Greet";
import GreetIn from "../GreetIn";
import { language } from "../Language";
import MapUserGreetCounter from "../UserGreetCounterImpl";
import pool from "../model/Pool";

let greetMap = new Map<language, GreetIn>();
greetMap.set(language.eng, new GreetInEnglish);
greetMap.set(language.tswana, new GreetInTswana);
greetMap.set(language.xhosa, new GreetInXhosa);


let userGreetCounterMap = new MapUserGreetCounter(pool);
let greeter = new Greeter(greetMap, userGreetCounterMap);


describe("Greetings with TypeScript", async function() {

    this.timeout(10000);

    beforeEach(async () => {
        await pool.query("truncate table user_greet_counter restart identity");
    });

    it("should greet in Xhosa", async () => {
    
        const xhosaGreeter = await greeter.greet("FakeUserOne", language.xhosa);
        assert.equal("Molo FakeUserOne", xhosaGreeter);
    });
    
    it("should greet in Twana", async () => {
    
        const tswanaGreeter = await greeter.greet("FakeUserTwo", language.tswana);
        assert.equal("Dumela FakeUserTwo", tswanaGreeter);
    });
    
    it("should greet in English", async () => {
    
        const englishGreeter = await greeter.greet("FakeUserThree", language.eng);
        assert.equal("Hello FakeUserThree", englishGreeter);
    });
    
    // Testing UserGreetCounter implementation
    
    it("should increment greet counter", async () => {
    
        await greeter.greet("User", language.eng);
        await greeter.greet("UserOne", language.xhosa);
        await greeter.greet("UserTwo", language.eng);
        
        assert.equal(3, await greeter.greetCounter);

        await greeter.greet("UserThree", language.xhosa);
        await greeter.greet("UserFour", language.eng);
    
        assert.equal(5, await greeter.greetCounter);
        
    });
    
    it("should get user greets", async () => {
    
        await greeter.greet("User", language.tswana);
        await greeter.greet("User", language.xhosa);
        await greeter.greet("UserOne", language.xhosa);
        await greeter.greet("UserTwo", language.eng);
        await greeter.greet("UserTwo", language.eng);
    
        assert.equal(2, await greeter.userGreetCount("User"));
    
        await greeter.greet("UserOne", language.xhosa);
        await greeter.greet("UserTwo", language.eng);
    
        assert.equal(3, await greeter.userGreetCount("UserTwo"));
    
    });

    this.afterAll(async () => await pool.end());
    
})