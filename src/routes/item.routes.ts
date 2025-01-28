import express, { Router, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import ItemController from "../controllers/item.controller.js";

const ItemRouter = Router();
ItemRouter.use(express.json())
const itemController = new ItemController();

// Create item
ItemRouter.post("/", itemController.addItem);

// Get all items
ItemRouter.get("/", itemController.getItems);

// Get item by id
ItemRouter.get("/:id", itemController.getItemById); 

// Delete item by id
ItemRouter.delete("/:id", itemController.deleteItem);

// Update item details by id 
ItemRouter.patch("/:id", itemController.updateItem);
export default ItemRouter   