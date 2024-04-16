import Greeter from "../Greeter";
import { Request, Response } from "express";

export default class GreeterControllers {
    constructor(private greeter: Greeter) {
        this.greeter = greeter;
    }

    async getLanguages(req: Request, res: Response): Promise<void> {
        try {
            const languages = await this.greeter.getLanguages();
            res.status(200).json(languages);
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching languages." });
        }
    }

    async getGreeting(req: Request, res: Response): Promise<void> {
        try {
            const { username, language } = req.body;
            if (username && language) {
                const greeting = await this.greeter.greet(username, language);
                res.status(200).json(greeting);
            }    
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching a greeting." });
        }
    }

    async getCounter(req: Request, res: Response): Promise<void> {
        try {
            const greetCounter = await this.greeter.greetCounter
            res.status(200).json(greetCounter)
        } catch (error) {
            res.status(500).json({ message: "An error occurred while fetching a counter." });
        }
    }

    async addGreeting(req: Request, res: Response): Promise<void> {
        try {
            const { language, greeting } = req.body;
            await this.greeter.addGreeting(language, greeting);
            res.status(201).json({ message: "success" });
        } catch (error) {
            res.status(400).json({ message: "An error occurred while creating a greeting." });
        }
    }
}
