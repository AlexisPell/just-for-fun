import { UsersController } from './../users.controller';
import { Test } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { ITestUserResDto, userStub } from './stubs/user.stub';

jest.mock('../users.service');
// jest.mock('./../__mocks__/users.service')

describe('users.controller', () => {
  let usersContoller: UsersController;
  let usersService: UsersService;

  // BeforeEach
  beforeEach(async () => {
    // Test Module
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersContoller = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  // GET /users/find-by?{id || email}=
  describe('getUser', () => {
    // Get by email
    describe('when getUser by email', () => {
      // CALL ENDPOINT AND SET USER TO user before tests
      let user: ITestUserResDto;
      beforeEach(async () => {
        user = (await usersContoller.getUser(
          userStub().email,
          undefined,
        )) as any;
      });

      test('then it should call usersService.getUserByEmail', () => {
        expect(usersService.getUserByEmail).toBeCalledWith(userStub().email);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });

    // Get by id
    describe('when getUser by ID', () => {
      // CALL ENDPOINT AND SET USER TO user before tests
      let user: ITestUserResDto;
      beforeEach(async () => {
        user = (await usersContoller.getUser(undefined, userStub().id)) as any;
      });

      test('then it should call usersService.getUserById', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().id);
      });

      test('then it should return a user', () => {
        expect(user).toEqual(userStub());
      });
    });

    // Get
  });
});
