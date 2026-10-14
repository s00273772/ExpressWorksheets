import request from "supertest";
import { app } from "../../src/app";


describe('GET / cars', () => {

    it('returns all cars', async () => {
         
        const response = await request(app)
        .get('/api/v1/cars');

        expect(response.status).toBe(200);
    });

   /* it('returns 200 for valid car ID', async () => {
        const car = {
            make: 'Toyota',
            model: 'Camry',
            year: 2020,
        }

        const response = await request(app)
        .get(`/api/v1/cars/${carId}`);

        expect(response.status).toBe(200);
    })*/
});