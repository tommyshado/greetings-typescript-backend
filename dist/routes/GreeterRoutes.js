"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GreetableUsingDb_1 = __importDefault(require("../GreetableUsingDb"));
const UserGreetCounterImpl_1 = __importDefault(require("../UserGreetCounterImpl"));
const Greeter_1 = __importDefault(require("../Greeter"));
const GreeterControllers_1 = __importDefault(require("../controllers/GreeterControllers"));
const Pool_1 = __importDefault(require("../model/Pool"));
const router = express_1.default.Router();
const greetableWithDb = new GreetableUsingDb_1.default(Pool_1.default);
const userGreetCounter = new UserGreetCounterImpl_1.default(Pool_1.default);
const greeter = new Greeter_1.default(greetableWithDb, userGreetCounter);
const greeterControllers = new GreeterControllers_1.default(greeter);
// Routes
router.get("/", greeterControllers.getLanguages);
router.get("/greeting", greeterControllers.getGreeting);
router.get("/counter", greeterControllers.getCounter);
router.post("/addGreeting", greeterControllers.addGreeting);
exports.default = router;
