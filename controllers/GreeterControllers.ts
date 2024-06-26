import Greeter from "../Greeter";
import { Request, Response } from "express";

/**
 * @classdesc A controller for handling requests related to greetings.
 */
export default class GreeterControllers {
    /**
     * @constructor
     * @param {Greeter} greeter - An instance of the Greeter class.
     */
    constructor(private greeter: Greeter) {
        this.getLanguages = this.getLanguages.bind(this);
        this.getGreeting = this.getGreeting.bind(this);
        this.getCounter = this.getCounter.bind(this);
        this.addGreeting = this.addGreeting.bind(this);
    }

    /**
     * Fetches all available languages.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getLanguages(req: Request, res: Response): Promise<void> {
        try {
            const languages = await this.greeter.getLanguages();
            res.status(200).json(languages);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching languages." });
        }
    }

    /**
     * Fetches a greeting for the specified username and language.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getGreeting(req: Request, res: Response): Promise<void> {
        try {
            const { username, language } = req.body;
            if (username && language) {
                const greeting = await this.greeter.greet(username, language);
                res.status(200).json(greeting);
            } else {
                res.status(400).json({ message: "Username and language are required." });
            }
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching a greeting." });
        }
    }

    /**
     * Fetches the current greeting counter.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async getCounter(req: Request, res: Response): Promise<void> {
        try {
            const greetCounter = await this.greeter.greetCounter;
            res.status(200).json(greetCounter);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching a counter." });
        }
    }

    /**
     * Adds a new greeting in the specified language.
     * @param {Request} req - The Express request object.
     * @param {Response} res - The Express response object.
     * @returns {Promise<void>} A promise that resolves when the response is sent.
     */
    async addGreeting(req: Request, res: Response): Promise<void> {
        try {
            const { language, greeting } = req.body;
            if (language && greeting) {
                await this.greeter.addGreeting(language, greeting);
                res.status(201).json({ message: "success" });
            } else {
                res.status(400).json({ message: "Language and greeting are required." });
            }
        } catch (error) {
            res.status(400).json({ message: "An error occurred while creating a greeting." });
        }
    }
}