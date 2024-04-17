import GreetableUsingDb from "../GreetableUsingDb";
import MapUserGreetCounter from "../UserGreetCounterImpl";
import Greeter from "../Greeter";
import pool from "../model/Pool";
const greetableWithDb = new GreetableUsingDb(pool);
const userGreetCounter = new MapUserGreetCounter(pool);
const greeter = new Greeter(greetableWithDb, userGreetCounter);
export default greeter;
