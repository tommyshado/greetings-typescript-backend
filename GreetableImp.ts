import Greetable from "./GreetableInt";
import { Language } from "./Language";
import { Pool } from "pg";

export default class MapLangAndGreeting implements Greetable {
    constructor(private dbPool: Pool) {
        this.dbPool = dbPool;
    }

    async greet(firstName: string, language: Language): Promise<string> {
        const query = "select greetings from language_greeting_map where language = $1";
        const results = await this.dbPool.query(query, [language]);

        if (results) {
            return `${results.rows[0]} ${firstName}`;
        }
        return "";
    }
};