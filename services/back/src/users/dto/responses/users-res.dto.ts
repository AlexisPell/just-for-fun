import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { User } from 'src/users/user.document';
import { UserResDTO } from './user-res.dto';

export class UsersResDTO {
  @ApiProperty({ name: 'users', example: [User] })
  @Type(() => UserResDTO)
  users: UserResDTO[];
}
