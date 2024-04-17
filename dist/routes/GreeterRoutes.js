"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const GreeterControllers_1 = __importDefault(require("../controllers/GreeterControllers"));
const GreeterUtils_1 = __importDefault(require("../utils/GreeterUtils"));
const router = express_1.default.Router();
const greeterControllers = new GreeterControllers_1.default(GreeterUtils_1.default);
// Routes
router.get("/", greeterControllers.getLanguages);
router.get("/greeting", greeterControllers.getGreeting);
router.get("/counter", greeterControllers.getCounter);
router.post("/addGreeting", greeterControllers.addGreeting);
exports.default = router;
