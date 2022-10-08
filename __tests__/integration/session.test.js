const request = require('supertest');
const app = require('../../app');
const Usuario = require('../../models/usuario.model');

describe('Authentication', () => {
    it('should create user', async () => {

        const response = await Usuario.create({
            email: 'keithsarate.info2@gmail.com',
            password: 'testesenha'
        })

        console.log(response);

        expect(response._id).not.toBeNull();
    });

    it('should authenticate with valid credentials', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'keithsarate.info2@gmail.com',
                password: 'testesenha'
            });
        expect(response.status).toBe(200);
    });

    it('should not authenticate with ivalid credentials', async () => {

        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'keithsarate.info@gmail.com',
                password: 'dsfdsf'
            });
        expect(response.status).toBe(401);
    });

    it("should return jwt token when authenticated", async () => {
    
        const response = await request(app)
          .post("/auth/login")
          .send({
            email: 'keithsarate.info2@gmail.com',
            password: 'testesenha'
          });
    
        expect(response.body).toHaveProperty("token");
    });

    it("should not be able to access private routes without jwt token", async () => {
        const response = await request(app)
            .post('/curso')
            .send({
                nome: 'Fisioterapia'
            });
    
        expect(response.status).toBe(401);
    });

    it("should not be able to access private routes with invalid jwt token", async () => {
        const response = await request(app)
            .post('/curso')
            .send({
                nome: 'Fisioterapia'
            })
            .set("Authorization", `Bearer 123123`);
    
        expect(response.status).toBe(401);
    });
})
