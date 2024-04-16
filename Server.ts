import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./routes/GreeterRoutes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.static("public"));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Routes middlewares
app.use("/api", router);

app.listen(PORT, () => console.log("🚀 Greetings started @:", PORT));