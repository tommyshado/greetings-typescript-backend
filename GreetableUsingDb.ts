import Greetable from "./Greetable";
import { Pool } from "pg";
/**
 * Implements the `Greetable` interface using a database.
 */
export default class GreetableUsingDb implements Greetable {
    /**
     * The database pool instance.
     */
    private dbPool: Pool;

    /**
     * Constructs a new instance of `GreetableUsingDb` with the provided database pool.
     * @param dbPool The database pool instance.
     */
    constructor(dbPool: Pool) {
        this.dbPool = dbPool;
    }

    /**
     * Greets the user with a language-specific greeting.
     * @param firstName The user's first name.
     * @param language The language code for the greeting.
     * @returns A string containing the greeting and the user's first name.
     */
    async greet(firstName: string, language: string): Promise<string> {
        const query = "select greetings from language_greeting_map where language = $1";
        const results = await this.dbPool.query(query, [language]);

        if (results) {
            return `${results.rows[0].greetings} ${firstName}`;
        }
        return "";
    }

    /**
     * Adds a new language-greeting mapping to the database.
     * @param language The language code for the new mapping.
     * @param greeting The greeting text for the new mapping.
     * @returns The language code of the newly added mapping.
     */
    async addGreeting(language: string, greeting: string): Promise<string> {
        const query = "insert into language_greeting_map (language, greetings) values ($1, $2) returning language";
        const results = await this.dbPool.query(query, [language, greeting]);
        return results.rows[0].language;
    }

    /**
     * Retrieves all language codes from the database.
     * @returns An array of language codes.
     */
    async getLanguages(): Promise<object[]> {
        const query = "select language from language_greeting_map";
        const results = await this.dbPool.query(query);
        return results.rows;
    }
};