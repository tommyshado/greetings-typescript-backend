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
class GreetableUsingDb {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.dbPool = dbPool;
    }
    greet(firstName, language) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "select greetings from language_greeting_map where language = $1";
            const results = yield this.dbPool.query(query, [language]);
            if (results) {
                return `${results.rows[0].greetings} ${firstName}`;
            }
            return "";
        });
    }
    addGreeting(language, greeting) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "insert into language_greeting_map (language, greetings) values ($1, $2) returning language";
            const results = yield this.dbPool.query(query, [language, greeting]);
            return results.rows[0].language;
        });
    }
    getLanguages() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "select language from language_greeting_map";
            const results = yield this.dbPool.query(query);
            return results.rows;
        });
    }
}
exports.default = GreetableUsingDb;
;
