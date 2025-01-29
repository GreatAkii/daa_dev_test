import request from "supertest";
import server from "../src/index";
import ItemService from "../src/services/item.service";

describe("/api/items", () => {
  describe("GET /", () => {
    beforeAll(async () => {
      await request(server)
        .post("/api/items")
        .send({ name: "item1", price: 100 });
    });

    afterAll(async () => {
      await request(server).delete("/api/items");
      server.close();
    });

    it("should return an empty array", async () => {
      const response = await request(server).get("/api/items");
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("items");
      expect(response.body.items).toEqual([
        { id: expect.any(String), name: "item1", price: 100 },
      ]);
    });
  });

  describe("POST /", () => {
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
  });

  describe("DELETE /", () => {
    it("should delete an item", async () => {
      const items = await ItemService.getInstance().getItems();
      const response = await request(server).delete(
        `/api/items/${items[0].id}`
      );
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("deletedItem");
      expect(response.body.deletedItem).toEqual({
        id: expect.any(String),
        name: "item1",
        price: 100,
      });
    });
  });

  describe("PATCH /", () => {
    it("should update an item", async () => {
      const items = await ItemService.getInstance().getItems();
      const response = await request(server)
        .patch(`/api/items/${items[0].id}`)
        .send({ name: "item3", price: 200 });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("updatedItem");
      expect(response.body.updatedItem).toEqual({
        id: expect.any(String),
        name: "item3",
        price: 200,
      });
    });
  });
});
