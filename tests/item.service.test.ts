import ItemService from "../src/services/item.service";

describe("database operations", () => {
  let id = "";
  const itemService = ItemService.getInstance();
  beforeEach(async () => {
    id = (await itemService.addItem({ name: "item1", price: 100 })).id;
  });

  afterEach(async () => {
    try {
      await itemService.deleteItem(id);
    } catch (error) {
      // Ignore error
    }
  });

  it("should create a new item", async () => {
    const actual = await itemService.addItem({ name: "item2", price: 100 });
    expect(actual).toEqual({
      id: expect.any(String),
      name: "item2",
      price: 100,
    });
  });

  it("should get all items", async () => {
    const actual = await itemService.getItems();
    expect(actual).toEqual(
      expect.arrayContaining([
        { id: expect.any(String), name: "item1", price: 100 },
        { id: expect.any(String), name: "item2", price: 100 },
      ])
    );
  });

  it("should get an item by id", async () => {
    const actual = await itemService.getItemById(id);
    expect(actual).toEqual({
      id: expect.any(String),
      name: "item1",
      price: 100,
    });
  });

  it("should delete an item", async () => {
    const actual = await itemService.deleteItem(id);
    console.log();
    expect(actual).toEqual({
      id: expect.any(String),
      name: "item1",
      price: 100,
    });
  });

  // Exception handling test
  it("should throw exception when item not found", async () => {
    const actual = itemService.getItemById("invalid-id");
    expect(actual).rejects.toThrow("Item not found");
  });
});
