import { Category } from 'modules/categories/entities/category.entity';
import { Collection } from 'modules/collections/entities/collection.entity';
import { Product } from 'modules/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class CollectionCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Collection, (collection) => collection.collectionCategories)
  collection: Collection;

  @Column({ nullable: false, type: 'int' })
  collectionId: number;

  @ManyToOne(() => Category, (category) => category.collectionCategories)
  category: Category;

  @Column({ nullable: false, type: 'int' })
  categoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne(() => Product, (product) => product.collectionCategory)
  products: Product[];
}
