import express from "express";
import GreeterControllers from "../controllers/GreeterControllers";
import greeter from "../utils/GreeterUtils";
const router = express.Router();
const greeterControllers = new GreeterControllers(greeter);
// Routes
router.get("/", greeterControllers.getLanguages);
router.get("/greeting", greeterControllers.getGreeting);
router.get("/counter", greeterControllers.getCounter);
router.post("/addGreeting", greeterControllers.addGreeting);
export default router;
