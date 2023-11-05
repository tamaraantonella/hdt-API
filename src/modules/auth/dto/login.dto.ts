import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const LoginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(6).max(25)
});

export class LoginDto extends createZodDto(LoginSchema) {}
