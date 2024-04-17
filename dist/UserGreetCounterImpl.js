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
class MapUserGreetCounter {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.dbPool = dbPool;
    }
    countGreet(firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
                        insert into user_greet_counter (name, greet_count) values ($1, $2) 
                        on conflict (name) do update set greet_count = user_greet_counter.greet_count + 1
                    `;
            yield this.dbPool.query(query, [firstName, 1]);
        });
    }
    get greetCounter() {
        return (() => __awaiter(this, void 0, void 0, function* () {
            const query = "select count(*) from user_greet_counter";
            const results = yield this.dbPool.query(query);
            return results.rows[0].count;
        }))();
    }
    userGreetCount(firstName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "select greet_count from user_greet_counter where name = $1";
            const results = yield this.dbPool.query(query, [firstName]);
            return yield results.rows[0].greet_count;
        });
    }
}
exports.default = MapUserGreetCounter;
