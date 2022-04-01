import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'my-mail@gmail.com' })
  @IsEmail({}, { message: 'Is invalid email' })
  readonly email: string;

  @ApiProperty({ description: 'Password', example: 'password' })
  @IsString({ message: 'Must be a string' })
  @Length(4, 16, { message: 'not less and longer than 4 and 16 chars' })
  readonly password: string;
}
