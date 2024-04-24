import Greetable from "./Greetable";
import { Pool } from "pg";

export default class GreetableUsingDb implements Greetable {
    constructor(private dbPool: Pool) {}

    async greet(firstName: string, language: string): Promise<string> {
        const query = "select greetings from language_greeting_map where language = $1";
        const results = await this.dbPool.query(query, [language]);

        if (results) {
            return `${results.rows[0].greetings} ${firstName}`;
        }
        return "";
    }

    async addGreeting(language: string, greeting: string): Promise<string> {
        const query = "insert into language_greeting_map (language, greetings) values ($1, $2) returning language";
        const results = await this.dbPool.query(query, [language, greeting]);
        return results.rows[0].language;
    }

    async getLanguages(): Promise<object[]> {
        const query = "select language from language_greeting_map";
        const results = await this.dbPool.query(query);
        return results.rows;
    }
};