import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateProductSchema = z.object({
  name: z.string().min(3).max(50),
  collectionId: z.number().int(),
  categoryId: z.number().int(),
  description: z.string().min(3).max(255).nullish(),
  stock: z.boolean().default(true),
  image: z.string().min(3).max(255).nullish(),
});

export class CreateProductDto extends createZodDto(
  CreateProductSchema
) {}
