import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateCategorySchema = z.object({
  name: z.string().min(3).max(50),
  color: z.string().min(3).max(50).nullish(),
});

export class CreateCategoryDto extends createZodDto(CreateCategorySchema) {}
