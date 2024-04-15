"use strict";
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
const GreeterRoutes_1 = __importDefault(require("./routes/GreeterRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
const greetableWithDb = new GreetableUsingDb_1.default(Pool_1.default);
const userGreetCounter = new UserGreetCounterImpl_1.default(Pool_1.default);
const greeter = new Greeter_1.default(greetableWithDb, userGreetCounter);
const routes = new GreeterRoutes_1.default(greeter);
app.use(express_1.default.static("public"));
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.get("/", routes.renderLanguages);
app.post("/greet", routes.renderGreet);
app.get("/greetCounter", routes.renderCounter);
app.post("/addGreeting", routes.addGreeting);
app.listen(PORT, () => console.log("🚀 Greetings started @:", PORT));
