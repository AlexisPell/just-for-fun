import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Exclude } from 'class-transformer';
import { CreateUserDto } from '../create-user.dto';

export class UserResDTO {
  @ApiProperty({ name: 'id' })
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  _id: string;

  @Exclude()
  password: string;

  constructor(userDTO: CreateUserDto) {
    Object.assign(this, userDTO);
  }
}
