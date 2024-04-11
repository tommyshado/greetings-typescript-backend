import UserGreetCounter from "./UserGreetCounterInt";
import { Pool } from "pg";

export default class MapUserGreetCounter implements UserGreetCounter {
    constructor(private dbPool: Pool) {
        this.dbPool = dbPool;
    }

    async countGreet(firstName: string): Promise<void> {
        const query = `
                        insert into user_greet_counter (name, greet_count) values ($1, $2) 
                        on conflict (name) do update set greet_count = user_greet_counter.greet_count + 1
                    `;
        await this.dbPool.query(query, [firstName, 1]);
    }

    get greetCounter(): Promise<number> {
        return (async () => {
            const query = "select count(*) from user_greet_counter";
            const results = await this.dbPool.query(query);
            return results.rows[0].count;
        })();
    }

    async userGreetCount(firstName: string): Promise<number> {
        const query = "select greet_count from user_greet_counter where name = $1";
        const results = this.dbPool.query(query, [firstName]);
        return (await results).rows[0].greet_count;
    }
}