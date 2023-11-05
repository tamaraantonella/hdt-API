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
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string;

  @Column({ nullable: false, type: 'int' })
  collectionId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(
    () => CollectionCategory,
    (collectionCategory) => collectionCategory.category
  )
  collectionCategories: CollectionCategory[];
}
