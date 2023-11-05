import { CollectionCategory } from 'modules/collection-categories/entities/collection-category.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name: string;

  @Column('varchar', { length: 25, nullable: true })
  description: string;

  @Column('boolean', { default: true })
  stock: boolean;

  @Column('varchar', { length: 25, nullable: true })
  image: string;

  @OneToMany(
    () => CollectionCategory,
    (collectionCategory) => collectionCategory.products
  )
  collectionCategory: CollectionCategory;

  @Column({ type: 'int', nullable: false })
  collectionCategoryId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
