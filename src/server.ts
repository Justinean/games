import express from "express";
import * as e from "express";
import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "..", 'public')));

app.use

app.use(express.json());
app.use(express.urlencoded({ extended: true, parameterLimit: 50000 }));

app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", 'public', "index.html"));
})

app.get("/hangman/words", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "..", "public", "assets", "json", "hangmanWords.json"))
})

app.listen(port, () => {
    console.log(`Main server listening on port ${port}`);
})