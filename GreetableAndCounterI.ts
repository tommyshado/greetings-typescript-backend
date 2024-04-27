import IGreetable from "./Greetable";
import IUserGreetCounter from "./UserGreetCounter";

export interface GreetableAndCounter extends IGreetable, IUserGreetCounter {};