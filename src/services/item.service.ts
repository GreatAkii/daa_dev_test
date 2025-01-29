import { Mutex } from "async-mutex";
import { Item, CreateItem, UpdateItem } from "../models/item.js";
import { nanoid } from "nanoid";

class ItemService {
  private static instance: ItemService;
  private mytex = new Mutex();
  private items: Item[] = [];
  private constructor() {}
  // Singleton
  public static getInstance(): ItemService {
    if (!ItemService.instance) {
      ItemService.instance = new ItemService();
    }
    return ItemService.instance;
  }

  private findItemOrThrow(id: string): Item {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new Error("Item not found");
    }
    return item;
  }

  // Create Item
  async addItem(item: CreateItem): Promise<Item> {
    await this.mytex.acquire();
    try {
      const isDuplicate = this.items.some((i) => i.name === item.name);
      if (isDuplicate) {
        throw new Error("Item already exists");
      }
      const new_item = { ...item, id: nanoid(4) };
      this.items = [...this.items, { ...new_item }];
      return new_item;
    } finally {
      this.mytex.release();
    }
  }

  // Read Items
  async getItems(): Promise<Item[]> {
    await this.mytex.acquire();
    try {
      return this.items;
    } finally {
      this.mytex.release();
    }
  }

  // Read Item by ID --Extra--
  async getItemById(id: string): Promise<Item> {
    await this.mytex.acquire();
    try {
      const item = this.findItemOrThrow(id);

      return item;
    } finally {
      this.mytex.release();
    }
  }

  // Delete Item
  async deleteItem(id: string): Promise<Item> {
    await this.mytex.acquire();
    try {
      const item = this.findItemOrThrow(id);

      this.items = this.items.filter((i) => i.id !== id);
      return item;
    } finally {
      this.mytex.release();
    }
  }

  // Update Item  --Extra
  async updateItem(id: string, item: UpdateItem): Promise<Item> {
    await this.mytex.acquire();
    try {
      const existingItem = this.findItemOrThrow(id);

      const updatedItem = { ...existingItem, ...item };
      this.items = this.items.map((i) => (i.id === id ? updatedItem : i));
      return updatedItem;
    } finally {
      this.mytex.release();
    }
  }
}

export default ItemService;
