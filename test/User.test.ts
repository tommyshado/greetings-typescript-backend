import assert from "assert";
import Greeter, { GreetInEnglish, GreetInTswana, GreetInXhosa } from "../Greet";
import GreetIn from "../GreetIn";
import { language } from "../Language";
import MapUserGreetCounter from "../UserGreetCounterImpl";

let greetMap = new Map<language, GreetIn>();
greetMap.set(language.eng, new GreetInEnglish);
greetMap.set(language.tswana, new GreetInTswana);
greetMap.set(language.xhosa, new GreetInXhosa);

it("should greet in Xhosa", () => {
    let userGreetCounterMap = new MapUserGreetCounter();
    let greeter = new Greeter(greetMap, userGreetCounterMap);

    const xhosaGreeter = greeter.greet("FakeUserOne", language.xhosa);
    assert.equal("Molo FakeUserOne", xhosaGreeter);
});

it("should greet in Twana", () => {

    let userGreetCounterMap = new MapUserGreetCounter();
    let greeter = new Greeter(greetMap, userGreetCounterMap);

    const tswanaGreeter = greeter.greet("FakeUserTwo", language.tswana);
    assert.equal("Dumela FakeUserTwo", tswanaGreeter);
});

it("should greet in English", () => {
    let userGreetCounterMap = new MapUserGreetCounter();
    let greeter = new Greeter(greetMap, userGreetCounterMap);

    const englishGreeter = greeter.greet("FakeUserThree", language.eng);
    assert.equal("Hello FakeUserThree", englishGreeter);
});

// Testing UserGreetCounter implementation

it("should increment greet counter", () => {

    let userGreetCounterMap = new MapUserGreetCounter();
    let greeter = new Greeter(greetMap, userGreetCounterMap);

    greeter.greet("User", language.eng);
    greeter.greet("UserOne", language.xhosa);
    greeter.greet("UserTwo", language.eng);

    assert.equal(3, greeter.greetCounter);

    greeter.greet("UserThree", language.xhosa);
    greeter.greet("UserFour", language.eng);

    assert.equal(5, greeter.greetCounter);
    
});

it("should get user greets", () => {

    let userGreetCounterMap = new MapUserGreetCounter();
    let greeter = new Greeter(greetMap, userGreetCounterMap);

    greeter.greet("User", language.tswana);
    greeter.greet("User", language.xhosa);
    greeter.greet("UserOne", language.xhosa);
    greeter.greet("UserTwo", language.eng);
    greeter.greet("UserTwo", language.eng);

    assert.equal(2, greeter.userGreetCount("User"));

    greeter.greet("UserOne", language.xhosa);
    greeter.greet("UserTwo", language.eng);

    assert.equal(3, greeter.userGreetCount("UserTwo"));

});