import request from 'supertest';
import { app } from '../../app';

describe('testing currentUser application', () => {
    it('responds with details about the current user', async () => {
        const cookie = await global.signin();

        const response = await request(app)
            .post('/api/users/currentUser')
            .set('Cookie', cookie)
            .send({
                email: 'test@test.com',
                password: '123456'
            })
            .expect(201);

        expect(response.body.currentUser.email).toEqual('test@test.com');
    });

    it('responds with null if not authenticated', async () => {
        const response = await request(app)
            .post('/api/users/currentUser')
            .send()
            .expect(200);
        
    expect(response.body.currentUser).toEqual(null);
    });
});