import { User } from '../entities/user.entity';



export const parseUser = (user: User) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role
  };
};

export const parseUsers = (users: User[]) => {
  return users.map((user) => parseUser(user));
};
