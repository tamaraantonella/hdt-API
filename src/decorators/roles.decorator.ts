import { SetMetadata } from '@nestjs/common';
import { Role } from 'modules/auth/enums/role.enum';

export const ROLES_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLES_KEY, role);
