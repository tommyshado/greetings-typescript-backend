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
class GreeterRoutes {
    constructor(greeter) {
        this.greeter = greeter;
        this.greeter = greeter;
    }
    renderLanguages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const languages = yield this.greeter.getLanguages();
            res.render("index", {
                languages
            });
        });
    }
    renderGreet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, language } = req.body;
            if (username && language) {
                const greeting = yield this.greeter.greet(username, language);
                res.render("index", { greeting });
            }
        });
    }
    renderCounter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const greetCounter = yield this.greeter.greetCounter;
            res.render("index", { greetCounter });
        });
    }
    addGreeting(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { language, greeting } = req.body;
            yield this.greeter.addGreeting(language, greeting);
            res.redirect("index");
        });
    }
}
exports.default = GreeterRoutes;
