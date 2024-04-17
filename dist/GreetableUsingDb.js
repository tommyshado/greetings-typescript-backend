export default class GreetableUsingDb {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.dbPool = dbPool;
    }
    async greet(firstName, language) {
        const query = "select greetings from language_greeting_map where language = $1";
        const results = await this.dbPool.query(query, [language]);
        if (results) {
            return `${results.rows[0].greetings} ${firstName}`;
        }
        return "";
    }
    async addGreeting(language, greeting) {
        const query = "insert into language_greeting_map (language, greetings) values ($1, $2) returning language";
        const results = await this.dbPool.query(query, [language, greeting]);
        return results.rows[0].language;
    }
    async getLanguages() {
        const query = "select language from language_greeting_map";
        const results = await this.dbPool.query(query);
        return results.rows;
    }
}
;
