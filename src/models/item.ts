import Joi from "joi";

interface Item {
  id: string;
  name: string;
  price: number;
}

interface CreateItem {
  name: string;
  price: number;
}

interface UpdateItem {
  name?: string;
  price?: number;
}

const UpdateItemSchema = Joi.object({
  name: Joi.string().min(3),
  price: Joi.number().min(0),
});

const createItemSchema = Joi.object({
  name: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
});

const validateCreateItem = (item: CreateItem) => {
  return createItemSchema.validate(item);
};

const validateUpdateItem = (item: UpdateItem) => {
  return UpdateItemSchema.validate(item);
};
export { Item, CreateItem, validateCreateItem, UpdateItem, validateUpdateItem };
