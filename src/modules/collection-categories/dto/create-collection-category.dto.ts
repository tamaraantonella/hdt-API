import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateCollectionCategorySchema = z.object({
  collectionId: z.number().int(),
  categoryId: z.number().int(),
});

export class CreateCollectionCategoryDto extends createZodDto(CreateCollectionCategorySchema) {}
