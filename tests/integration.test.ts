import request from "supertest";
import server from "../src/index";
import { error } from "console";

describe("/api/items", () => {
  let createdItemId: string; // Store the id of the mock item
  // Create mock item before each test
  beforeEach(async () => {
    const response = await request(server)
      .post("/api/items")
      .send({ name: "item1", price: 100 });
    createdItemId = response.body.item.id;
  });

  // Remove the mock item after each test
  afterEach(async () => {
    await request(server).delete(`/api/items/${createdItemId}`);
    server.close();
  });

  // Creat test
  it("should create a new item", async () => {
    const response = await request(server)
      .post("/api/items")
      .send({ name: "item2", price: 100 });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("item");
    expect(response.body.item).toEqual({
      id: expect.any(String),
      name: "item2",
      price: 100,
    });
  });

  // Create exception handling test
  it("should throw exception when name is missing", async () => {
    const response = await request(server)
      .post("/api/items")
      .send({ price: 100 });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe('"name" is required');
  });

  // Read test
  it("should return item1 object", async () => {
    const response = await request(server).get("/api/items");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("items");
    expect(response.body.items).toEqual(
      expect.arrayContaining([
        // Order of items may vary
        { id: expect.any(String), name: "item1", price: 100 },
        { id: expect.any(String), name: "item2", price: 100 },
      ])
    );
  });

  // Update test
  it("should update an item", async () => {
    const response = await request(server)
      .patch(`/api/items/${createdItemId}`)
      .send({ name: "item3", price: 200 });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("updatedItem");
    expect(response.body.updatedItem).toEqual({
      id: expect.any(String),
      name: "item3",
      price: 200,
    });
  });

  // Delete test
  it("should delete an item", async () => {
    const response = await request(server).delete(
      `/api/items/${createdItemId}`
    );
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("deletedItem");
    expect(response.body.deletedItem).toEqual({
      id: expect.any(String),
      name: "item1",
      price: 100,
    });
  });

  // Delete exception handling test
  it("should throw exception when invalid id is passed", async () => {
    const response = await request(server).delete(`/api/items/invalid-id`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Item not found");
  });
});
