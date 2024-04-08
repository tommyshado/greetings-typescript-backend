import assert from "assert";
import Greeter, { GreetInEnglish, GreetInTswana, GreetInXhosa } from "../Greet";
import GreetIn from "../greetIn";
import { language } from "../language";
import MapUserGreetCounter from "../UserGreetCounterImpl";

let greetMap = new Map<language, GreetIn>();
greetMap.set(language.eng, new GreetInEnglish);
greetMap.set(language.tswana, new GreetInTswana);
greetMap.set(language.xhosa, new GreetInXhosa);

let greeter = new Greeter(greetMap);

it("should greet in Xhosa", () => {
    const xhosaGreeter = greeter.greet("FakeUserOne", language.xhosa);
    assert.equal("Molo FakeUserOne", xhosaGreeter);
});

it("should greet in Twana", () => { 
    const tswanaGreeter = greeter.greet("FakeUserTwo", language.tswana);
    assert.equal("Dumela FakeUserTwo", tswanaGreeter);
});

it("should greet in English", () => { 
    const englishGreeter = greeter.greet("FakeUserThree", language.eng);
    assert.equal("Hello FakeUserThree", englishGreeter);
});

// Testing UserGreetCounter implementation


it("should increment greet counter", () => {
    let userGreetCounterMap = new MapUserGreetCounter();

    userGreetCounterMap.countGreet("User");
    userGreetCounterMap.countGreet("UserOne");
    userGreetCounterMap.countGreet("UserTwo");

    assert.equal(3, userGreetCounterMap.greetCounter);
});

it("should get user greets", () => {
    let userGreetCounterMap = new MapUserGreetCounter();

    userGreetCounterMap.countGreet("User");
    userGreetCounterMap.countGreet("User");
    userGreetCounterMap.countGreet("UserOne");
    userGreetCounterMap.countGreet("UserTwo");
    userGreetCounterMap.countGreet("UserTwo");

    assert.equal(2, userGreetCounterMap.userGreetCount("User"));
});