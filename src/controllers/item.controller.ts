import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { validateCreateItem } from "../models/item";

import ItemService from "../services/item.service";
class ItemController {
  private itemService = ItemService.getInstance();
  constructor() {}

  // Create item
  public addItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const item = req.body;
      const { error } = validateCreateItem(item);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
        return;
      }
      const newItem = await this.itemService.addItem(item);
      res.status(StatusCodes.CREATED).json({ item: newItem });
    } catch (error) {
      if (error instanceof Error) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }
  };

  // Get all items
  public getItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const items = await this.itemService.getItems();
      res.status(StatusCodes.OK).json({ items });
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }
  };

  // Get item by id --Extra--
  public getItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const item = await this.itemService.getItemById(id);
      res.status(StatusCodes.OK).json({ item: item });
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }
  };

  // Delete item by id
  public deleteItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const deletedItem = await this.itemService.deleteItem(id);
      res.status(StatusCodes.OK).json({ deletedItem: deletedItem });
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.NOT_FOUND).json({ error: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }
  };

  // Update item details by id --Extra--
  public updateItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = req.params.id;
      const item = req.body;
      const updatedItem = await this.itemService.updateItem(id, item);
      res.status(StatusCodes.OK).json({ updatedItem: updatedItem });
    } catch (error) {
      if (error instanceof Error) {
        res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error });
      }
    }
  };
}

export default ItemController;
