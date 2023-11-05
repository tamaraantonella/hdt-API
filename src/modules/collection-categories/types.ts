import { Category } from "modules/categories/entities/category.entity";
import { Collection } from "modules/collections/entities/collection.entity";

export type GetCollectionAndCategoryArgs = {
  collectionId?: number;
  categoryId?: number;
};

export type GetCollectionAndCategoryOutput = {
  collection: Collection | null;
  category: Category | null;
};
