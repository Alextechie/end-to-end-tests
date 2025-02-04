import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import request from "supertest";
import { app } from "..";
import resetDb from "./helpers/reset-db";

describe('Addition', () => {
    beforeAll(async () => {
        console.log("Clearing the DB ...")
        await resetDb();
    });

    it('should add 2 postive numbers', async () => {
        const { body, status } = await request(app).post("/sum").send({
            a: 1,
            b: 2
        })

        expect(status).toBe(200)
        expect(body).toEqual({ answer: 3, id: expect.any(Number) })
    })

    it('should add a positive and negative number', async () => {
        const { status, body } = await request(app).post("/sum").send({
            a: 4,
            b: -2
        })

        expect(status).toBe(200)
        expect(body).toEqual({ answer: 2, id: expect.any(Number) })
    })

    it('should add two negative numbers', async () => {
        const { body, status } = await request(app).post("/sum").send({
            a: -2,
            b: -1
        })

        expect(status).toBe(200)
        expect(body).toEqual({ answer: -3, id: expect.any(Number) })
    })
});


describe("/POST /multiply", () => {
    beforeAll(async () => {
        console.log("Clearing the Database ...")
        await resetDb();
    })


    it('should return corretlt for two positive numbers', async () => {
        const response = await request(app).post("/multiply").send({
            a: 2,
            b: 3
        })

        expect(response.status).toBe(200)
        expect(response.body).toEqual({answer: 6, id: expect.any(Number)})
    })

    it('should return correctly for a postive and negative number', async () => {
        const {status, body} = await request(app).post("/multiply").send({
            a: 2,
            b: -3
        })

        expect(status).toBe(200)
        expect(body).toEqual({answer: -6, id: expect.any(Number)})
    })

    it('should return correctly for negative numbers', async () => {
        const {status, body} = await request(app).post("/multiply").send({
            a: -2,
            b: -3
        })

        expect(status).toBe(200)
        expect(body).toEqual({answer: 6, id: expect.any(Number)})
    })
})