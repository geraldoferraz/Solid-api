import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAutehnticateUser";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest';
import { prisma } from "@/lib/prisma";

describe('Check-in History (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to list the history of Check-Ins', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const user = await prisma.user.findFirstOrThrow()

       const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -27.2092052,
                longitude: -49.6401091
            }
        })

        const checkIns = await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
                {
                    gym_id: gym.id,
                    user_id: user.id
                },
            ],
        })

        console.log(checkIns)

        const Response = await request(app.server)
            .get('/check-ins/history')
            .set('Authorization', `Bearer ${token}`)
            .send()
        

        expect(Response.statusCode).toEqual(200)
    })
})