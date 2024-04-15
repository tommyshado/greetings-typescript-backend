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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const GreetableUsingDb_1 = __importDefault(require("./GreetableUsingDb"));
const UserGreetCounterImpl_1 = __importDefault(require("./UserGreetCounterImpl"));
const Greeter_1 = __importDefault(require("./Greeter"));
const Pool_1 = __importDefault(require("./model/Pool"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const greetableWithDb = new GreetableUsingDb_1.default(Pool_1.default);
const userGreetCounter = new UserGreetCounterImpl_1.default(Pool_1.default);
const greeter = new Greeter_1.default(greetableWithDb, userGreetCounter);
app.use(express_1.default.static("public"));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const languages = yield greeter.getLanguages();
    res.render("index", {
        languages
    });
}));
app.post("/greet", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, language } = req.body;
    if (username && language) {
        const greeting = yield greeter.greet(username, language);
        res.render("index", { greeting });
    }
}));
app.get("/greetCounter", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const greetCounter = yield greeter.greetCounter;
    res.render("index", { greetCounter });
}));
app.post("/addGreeting", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { language, greeting } = req.body;
    yield greeter.addGreeting(language, greeting);
}));
app.listen(PORT, () => console.log("🚀 Greetings started @:", PORT));
