import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBody,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { User } from './user.document';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResDTO } from './dto/responses/user-res.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Create new user' })
  @ApiCreatedResponse({
    type: User,
    description: 'User created successfully',
  })
  @ApiBody({
    type: CreateUserDto,
  })
  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return new UserResDTO((await this.usersService.createUser(dto)) as any);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [User], description: 'User' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getUsers() {
    const users = await this.usersService.getUsers();

    const usersRes = users.map((u) => new UserResDTO(u as any));
    return usersRes;
  }

  @ApiOperation({ summary: 'Get user by email or id' })
  @ApiOkResponse({ type: User, description: 'User' })
  @ApiQuery({
    name: 'email',
    type: String,
    required: false,
  })
  @ApiQuery({
    name: 'id',
    type: String,
    required: false,
  })
  // @UseInterceptors(ClassSerializerInterceptor)
  @Get('find-by')
  async getUser(@Query('email') email: string, @Query('id') id: string) {
    if (email)
      return new UserResDTO(
        (await this.usersService.getUserByEmail(email)) as any,
      );
    if (id)
      return new UserResDTO((await this.usersService.getUserById(id)) as any);
    throw new BadRequestException('No search query param defined');
  }
}
