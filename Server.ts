import express, { Response, Request } from "express";
import bodyParser from "body-parser";
import GreetableUsingDb from "./GreetableUsingDb";
import MapUserGreetCounter from "./UserGreetCounterImpl";
import Greeter from "./Greeter";
import pool from "./model/Pool";

const app = express();
const PORT = process.env.PORT || 8080;

const greetableWithDb = new GreetableUsingDb(pool);
const userGreetCounter = new MapUserGreetCounter(pool);
const greeter = new Greeter(greetableWithDb, userGreetCounter);

app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response) => {
    const languages = await greeter.getLanguages();
    res.render("index", {
        languages
    });
});

app.post("/greet", async (req: Request, res: Response) => {
    const { username, language } = req.body;
    if (username && language) {
        const greeting = await greeter.greet(username, language);
        res.render("index", {greeting});
    }    
});

app.get("/greetCounter", async (req: Request, res: Response) => {
    const greetCounter = await greeter.greetCounter
    res.render("index", {greetCounter});
})

app.post("/addGreeting", async (req: Request, res: Response) => {
    const { language, greeting } = req.body;
    await greeter.addGreeting(language, greeting);
});

app.listen(PORT, () => console.log("🚀 Greetings started @:", PORT));