import assert from "assert";
import /*greet,*/ { GreetInEnglish, GreetInTswana, GreetInXhosa } from "../greet";

// it("should greet 'Bob'", () => {
//     assert.equal("Hello, Bob Crow we can't contact you.", greet({
//         firstName: "Bob",
//         lastName: "Crow",
//         email: "BobCrow@gmail"
//     }));
// });

it("should greet in Xhosa", () => {
    const xhosaGreeter = new GreetInXhosa();
    assert.equal("Molo FakeUser", xhosaGreeter.greet("FakeUser"));
});



it("should greet in Twana", () => { 
    const tswanaGreeter = new GreetInTswana();
    assert.equal("Dumela FakeUser", tswanaGreeter.greet("FakeUser"));
});



it("should greet in English", () => { 
    const englishGreeter = new GreetInEnglish();
    assert.equal("Hello FakeUser", englishGreeter.greet("FakeUser"));
});