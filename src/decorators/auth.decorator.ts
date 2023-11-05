import { UseGuards, applyDecorators } from '@nestjs/common';
import { Role } from 'modules/auth/enums/role.enum';
import { Roles } from './roles.decorator';
import { AuthGuard, RolesGuard } from 'modules/auth/guards';

/** This decorator receives
 * a `role` as a parameter and
 * applies the Roles decorator, that adds the role
 * then the guards will identify if the user has the role to access
 * to the route handler.
 */
export const Auth = (role: Role) => {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
};
