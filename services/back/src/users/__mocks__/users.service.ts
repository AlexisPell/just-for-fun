import { userStub } from '../test/stubs/user.stub';

export const UsersService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockReturnValue(userStub()),
  getUsers: jest.fn().mockReturnValue([userStub()]),
  getUserByEmail: jest.fn().mockReturnValue(userStub()),
  getUserById: jest.fn().mockReturnValue(userStub()),
});
