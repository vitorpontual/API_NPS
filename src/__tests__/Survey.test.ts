import request from 'supertest';
import { app } from '../server';

import createConnection from '../database'
import { getConnection } from 'typeorm';

describe("Surveys", () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

 

  it('Should be able to create a new survey', async () => {
    const response = await request(app).post("/surveys")
      .send({
        title: "Title Exemple",
        description: "Description Exemple"
      });

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty("id");
  });
  it("Should be able to get all surveys", async () => {
    await request(app).post("/surveys").send({
      title: "Title Exemple 2",
      description: "Description Exemple 2"
    });

    const response = await request(app).get("/surveys");

    expect(response.body.length).toBe(2)
    
  } )

});

