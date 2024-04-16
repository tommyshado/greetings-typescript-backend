"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GreetableUsingDb_1 = __importDefault(require("../GreetableUsingDb"));
const UserGreetCounterImpl_1 = __importDefault(require("../UserGreetCounterImpl"));
const Greeter_1 = __importDefault(require("../Greeter"));
const Pool_1 = __importDefault(require("../model/Pool"));
const greetableWithDb = new GreetableUsingDb_1.default(Pool_1.default);
const userGreetCounter = new UserGreetCounterImpl_1.default(Pool_1.default);
const greeter = new Greeter_1.default(greetableWithDb, userGreetCounter);
exports.default = greeter;
