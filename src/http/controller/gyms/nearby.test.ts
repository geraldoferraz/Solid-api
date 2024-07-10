import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/createAndAutehnticateUser";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest';
import { title } from "process";

describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('Should be able to nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'typescript gym',
                description: 'Some description',
                phone: '1199988800',
                latitude: -27.0610928,
                longitude: -49.5229501
        })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'javascript gym',
                description: 'Some description',
                phone: '1199988866',
                latitude: -27.2092052,
                longitude: -49.6401091
        })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -27.2092052,
                longitude: -49.6401091,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
    })
})
