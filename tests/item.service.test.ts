import { after, afterEach } from "node:test";
import ItemService from "../src/services/item.service";
import exp from "constants";

describe("database operations", () => {
  it("should create a new item", async () => {
    const itemService = ItemService.getInstance();
    const actual = await itemService.addItem({ name: "item1", price: 100 });
    expect(actual).toEqual({
      id: expect.any(String),
      name: "item1",
      price: 100,
    });
  });

  it("should get all items", async () => {
    const itemService = ItemService.getInstance();
    const actual = await itemService.getItems();
    expect(actual).toEqual([
      { id: expect.any(String), name: "item1", price: 100 },
    ]);
  });

  it("should get an item by id", async () => {
    const itemService = ItemService.getInstance();
    const items = await itemService.getItems();
    const actual = await itemService.getItemById(items[0].id);
    expect(actual).toEqual({
      id: expect.any(String),
      name: "item1",
      price: 100,
    });
  });

  it("should delete an item", async () => {
    const itemService = ItemService.getInstance();
    const items = await itemService.getItems();
    const actual = await itemService.deleteItem(items[0].id);
    expect(actual).toEqual({
      id: expect.any(String),
      name: "item1",
      price: 100,
    });
  });

  // Exception handling test
  it("should throw exception when item not found", async () => {
    const itemService = ItemService.getInstance();
    const actual = () => itemService.getItemById("invalid-id");
    expect(actual).rejects.toThrow("Item not found");
  });
});
