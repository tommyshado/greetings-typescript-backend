import UserGreetCounter from "./UserGreetCounterInt";
import { Pool } from "pg";

export default class MapUserGreetCounter implements UserGreetCounter {
    private dbPool: Pool;

    constructor(dbPool: Pool) {
        this.dbPool = dbPool;
    };

    async countGreet(firstName: string): Promise<void> {

        await this.dbPool.query(
            `
                insert into user_greet_counter (name, greet_count) values ($1, $2) 
                on conflict (name) do update set greet_count = user_greet_counter.greet_count + 1
            `, [firstName, 1])
    };

    get greetCounter(): Promise<number> {
        return (async () => {

            const results = await this.dbPool.query("select count(*) from user_greet_counter");
            return results.rows[0].count;

        })()
    };

    async userGreetCount(firstName: string): Promise<number> {
        const results = this.dbPool.query("select greet_count from user_greet_counter where name = $1", [firstName]);
        return (await results).rows[0].greet_count;
    }
}