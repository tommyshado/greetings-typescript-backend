import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import GreetableUsingDb from "./GreetableUsingDb";
import MapUserGreetCounter from "./UserGreetCounterImpl";
import Greeter from "./Greeter";
import pool from "./model/Pool";
import GreeterRoutes from "./routes/GreeterRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

const greetableWithDb = new GreetableUsingDb(pool);
const userGreetCounter = new MapUserGreetCounter(pool);
const greeter = new Greeter(greetableWithDb, userGreetCounter);
const routes = new GreeterRoutes(greeter);

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", routes.renderLanguages);
app.post("/greet", routes.renderGreet);
app.get("/greetCounter", routes.renderCounter);
app.post("/addGreeting", routes.addGreeting);

app.listen(PORT, () => console.log("🚀 Greetings started @:", PORT));