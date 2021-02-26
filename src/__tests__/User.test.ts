import request from 'supertest';
import { app } from '../server';

import createConnection from '../database'

describe("User", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.query(`DELETE FROM users`)
    await connection.query(`DELETE FROM surveys`)
    await connection.query(`DELETE FROM surveys_users`)
 

    await connection.runMigrations();
  });

  it('Should be able to create a new user', async () => {
    const response = await request(app).post("/users")
      .send({
        email: "user@example.com",
        name: "User Exemple"
      });

    expect(response.status).toBe(201)
  });

  it("Should not be able to create a user with exists email", async () => {
    const response = await request(app).post("/users")
      .send({
        email: "user@example.com",
        name: "User Example"
      });
      expect(response.status).toBe(400)
  });
});

