import express from "express";
import GreeterControllers from "../controllers/GreeterControllers";
import greeter from "../utils/GreeterUtils";

const router = express.Router();
const greeterControllers = new GreeterControllers(greeter);

/**
 * @route GET /
 * @description Get supported languages.
 * @returns {Promise<void>}
 * 
 * ************************************************************************************************
 * 
 * @route POST /greeting
 * @description Get a greeting in a specific language.
 * @param {string} language - The language code.
 * @returns {Promise<string>}
 * 
 * ************************************************************************************************
 * 
 * @route GET /counter
 * @description Get the current greeting counter.
 * @returns {Promise<number>}
 * 
 * ************************************************************************************************
 * 
 * @route POST /addGreeting
 * @description Add a new greeting in a specific language.
 * @param {string} language - The language code.
 * @param {string} greeting - The greeting text.
 * @returns {Promise<void>}
 * 
 **/

router.get("/", greeterControllers.getLanguages);
router.post("/greeting", greeterControllers.getGreeting);
router.get("/counter", greeterControllers.getCounter);
router.post("/addGreeting", greeterControllers.addGreeting);

export default router;