import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAutehnticateUser";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest';

describe('Create Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to create gym', async () => {
        const { token } = await createAndAuthenticateUser(app)

        const Response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'js gym',
                description: 'Some description',
                phone: '1199988866',
                latitude: -27.2092052,
                longitude: -49.6401091
            })

        expect(Response.statusCode).toEqual(200)
    })
})