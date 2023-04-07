import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message:
            "This is ChatGPT AI APP server url, please visit https://chatgpt-api-p4n2.onrender.com",
    });
});

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
    try {
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: req.body.input,
            max_tokens: 2000
           
        });
        console.log("PASSED: ", req.body.input);

        res.status(200).send({
            bot: response.data.choices[0].text,
        });
    } catch (error) {
        console.log("FAILED:", req.body.input);
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(4000, () => console.log("Server is running on port 4000"));