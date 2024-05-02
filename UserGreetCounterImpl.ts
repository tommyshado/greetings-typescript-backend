import UserGreetCounter from "./UserGreetCounter";
import { Pool } from "pg";

/**
 * Implements the UserGreetCounter interface using a PostgreSQL database.
 */
export default class MapUserGreetCounter implements UserGreetCounter {
    /**
     * The database pool used for interacting with the database.
     */
    constructor(private dbPool: Pool) {}

    /**
     * Increments the greet count for the specified user in the database.
     * @param firstName The first name of the user.
     * @returns A Promise that resolves when the greet count has been updated.
     */
    async countGreet(firstName: string): Promise<void> {
        const query = `
                        insert into user_greet_counter (name, greet_count) values ($1, $2) 
                        on conflict (name) do update set greet_count = user_greet_counter.greet_count + 1
                    `;
        await this.dbPool.query(query, [firstName, 1]);
    }

    /**
     * Retrieves the total greet count for all users in the database.
     * @returns A Promise that resolves with the total greet count.
     */
    get greetCounter(): Promise<number> {
        return (async () => {
            const query = "select count(*) from user_greet_counter";
            const results = await this.dbPool.query(query);
            return results.rows[0].count;
        })();
    }

    /**
     * Retrieves the greet count for the specified user in the database.
     * @param firstName The first name of the user.
     * @returns A Promise that resolves with the greet count for the specified user.
     */
    async userGreetCount(firstName: string): Promise<number> {
        const query = "select greet_count from user_greet_counter where name = $1";
        const results = await this.dbPool.query(query, [firstName]);
        return await results.rows[0].greet_count;
    }
}