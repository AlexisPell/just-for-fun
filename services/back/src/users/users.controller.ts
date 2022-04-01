import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
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
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({ type: [User], description: 'User' })
  @Get()
  getUsers() {
    return this.usersService.getUsers();
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
  @Get('find-by')
  getUser(@Query('email') email: string, @Query('id') id: string) {
    if (email) return this.usersService.getUserByEmail(email);
    if (id) return this.usersService.getUserById(id);
    throw new BadRequestException('No search query param defined');
  }
}
