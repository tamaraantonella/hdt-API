import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const RegisterSchema = z.object({
  firstName: z.string().trim().min(3).max(255),
  lastName: z.string().trim().min(3).max(255).nullish(),
  email: z.string().trim().email(),
  password: z.string().min(6).max(25),
  phone: z.string().min(3).max(50).nullish()
});

export class RegisterDto extends createZodDto(RegisterSchema) {}
