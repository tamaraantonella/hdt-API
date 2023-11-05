import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const CreateUserSchema = z.object({
  firstName: z.string().min(3).max(255),
  lastName: z.string().min(3).max(255).nullish(),
  email: z.string().email(),
  password: z.string().min(3).max(255),
  phone: z.string().min(3).max(50).nullish(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
