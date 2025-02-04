import express from "express"
import { prisma } from "./utils/db";
import { Request, Response } from "express";

export const app = express();
export const port = 4000;

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
    res.json({ message: "This is the home route in the backend server" })
});


app.post("/sum", async (req: Request, res: Response) => {
    // get the data from a client
    const { a, b } = req.body;
    const result = a + b;

    if (a > 100000 || b > 1000000) {
        res.status(422).json({
            message: "Sorry we don't support big numbers."
        })
    }

    const request = await prisma.request.create({
        data: {
            a,
            b,
            answer: result,
            type: "sum"
        }
    })

    res.json({ answer: result, id: request.id })
});


app.post("/multiply", async (req, res) => {
    const {a, b} = req.body;

    const result = a * b;

    const request = await prisma.request.create({
        data: {
            a,
            b,
            answer: result,
            type: "multiplication"
        }
    })

    res.json({answer: result, id: request.id})
})