import Greeter from "../Greeter";
import {Request, Response} from "express";

export default class GreeterRoutes {
    constructor(private greeter: Greeter) {
        this.greeter = greeter;
    }

    async renderLanguages(req: Request, res: Response): Promise<void> {
        const languages = await this.greeter.getLanguages();
        res.render("index", {
            languages
        });
    }

    async renderGreet (req: Request, res: Response): Promise<void> {
        const { username, language } = req.body;
        if (username && language) {
            const greeting = await this.greeter.greet(username, language);
            res.render("index", {greeting});
        }    
    }

    async renderCounter (req: Request, res: Response): Promise<void> {
        const greetCounter = await this.greeter.greetCounter
        res.render("index", {greetCounter});
    }

    async addGreeting(req: Request, res: Response): Promise<void> {
        const { language, greeting } = req.body;
        await this.greeter.addGreeting(language, greeting);
        res.redirect("index");
    }
}