import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAutehnticateUser";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest';
import { prisma } from "@/lib/prisma";

describe('Create Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to create Check-In', async () => {
        const { token } = await createAndAuthenticateUser(app)

       const gym = await prisma.gym.create({
            data: {
                title: 'JavaScript Gym',
                latitude: -27.2092052,
                longitude: -49.6401091
            }
        })

        const Response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                latitude: -27.2092052,
                longitude: -49.6401091
            })
        

        expect(Response.statusCode).toEqual(200)
    })
})