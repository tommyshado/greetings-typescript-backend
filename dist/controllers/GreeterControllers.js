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
Object.defineProperty(exports, "__esModule", { value: true });
class GreeterControllers {
    constructor(greeter) {
        this.greeter = greeter;
        this.getLanguages = this.getLanguages.bind(this);
        this.getGreeting = this.getGreeting.bind(this);
        this.getCounter = this.getCounter.bind(this);
        this.addGreeting = this.addGreeting.bind(this);
    }
    getLanguages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const languages = yield this.greeter.getLanguages();
                res.status(200).json(languages);
            }
            catch (error) {
                res.status(500).json({ message: "An error occurred while fetching languages." });
            }
        });
    }
    getGreeting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, language } = req.body;
                if (username && language) {
                    const greeting = yield this.greeter.greet(username, language);
                    res.status(200).json(greeting);
                }
                else {
                    res.status(400).json({ message: "Username and language are required." });
                }
            }
            catch (error) {
                res.status(500).json({ message: "An error occurred while fetching a greeting." });
            }
        });
    }
    getCounter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const greetCounter = yield this.greeter.greetCounter;
                res.status(200).json(greetCounter);
            }
            catch (error) {
                res.status(500).json({ message: "An error occurred while fetching a counter." });
            }
        });
    }
    addGreeting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { language, greeting } = req.body;
                if (language && greeting) {
                    yield this.greeter.addGreeting(language, greeting);
                    res.status(201).json({ message: "success" });
                }
                else {
                    res.status(400).json({ message: "Language and greeting are required." });
                }
            }
            catch (error) {
                res.status(400).json({ message: "An error occurred while creating a greeting." });
            }
        });
    }
}
exports.default = GreeterControllers;
