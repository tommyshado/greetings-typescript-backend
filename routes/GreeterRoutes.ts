import express from "express";
import GreetableUsingDb from "../GreetableUsingDb";
import MapUserGreetCounter from "../UserGreetCounterImpl";
import Greeter from "../Greeter";
import GreeterControllers from "../controllers/GreeterControllers";
import pool from "../model/Pool";

const router = express.Router();
const greetableWithDb = new GreetableUsingDb(pool);
const userGreetCounter = new MapUserGreetCounter(pool);
const greeter = new Greeter(greetableWithDb, userGreetCounter);
const greeterControllers = new GreeterControllers(greeter);

// Routes
router.get("/", greeterControllers.getLanguages);
router.get("/greeting", greeterControllers.getGreeting);
router.get("/counter", greeterControllers.getCounter);
router.post("/addGreeting", greeterControllers.addGreeting);

export default router;