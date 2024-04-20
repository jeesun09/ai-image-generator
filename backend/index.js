import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import cors from 'cors';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const app = express();
app.use(cors());
app.use(express.json());


const middleware = (req, res, next) => {
    console.log("This is the middleware");
    req.body.n = 1;

    if(req.body.model === "dall-e-2"){
        req.body.n = 2;
        req.body.size = "256x256";
    }
    else if(req.body.model !== "dall-e-2"){
        req.body.n = 1;
        req.body.size = "1024x1024";
    }

    next();
}


app.post('/image', middleware, async(req, res) => {
    try {
        const response = await openai.images.generate({
            prompt: req.body.prompt,
            model: req.body.model,
            n: req.body.n,
            size: req.body.size,
        });
        res.send(response.data);
        console.log(req.body.model);
        console.log(response.data);
    } catch (error) {
        console.log("The error is : ", error);
    }
})

app.listen(process.env.PORT, () => {
    console.log(`your server is running at ${process.env.PORT}`)
});