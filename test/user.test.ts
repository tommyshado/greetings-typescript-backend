import assert from "assert";
import greet from "../greet";
import { language } from "../language";


// it("should greet 'Bob'", () => {
//     assert.equal("Hello, Bob Crow we can't contact you.", greet({
//         firstName: "Bob",
//         lastName: "Crow",
//         email: "BobCrow@gmail"
//     }));
// });

it("should greet in Xhosa", () => {
    const xhosaGreeter = greet("FakeUser", language.xhosa);
    assert.equal("Molo FakeUser", xhosaGreeter);
});



it("should greet in Twana", () => { 
    const tswanaGreeter = greet("FakeUser", language.tswana);
    assert.equal("Dumela FakeUser", tswanaGreeter);
});



it("should greet in English", () => { 
    const englishGreeter = greet("FakeUser", language.eng);
    assert.equal("Hello FakeUser", englishGreeter);
});