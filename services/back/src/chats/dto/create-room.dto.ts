import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, IsOptional } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'Room name', example: 'my-room-name' })
  @IsString({ message: 'Name is required' })
  readonly name: string;

  @ApiProperty({ description: 'Description', example: 'Some chat room descr' })
  @IsOptional({ message: 'Not required field' })
  @IsString({ message: 'Must be a string' })
  @Length(6, null, { message: 'Not less than 6 chars' })
  readonly description: string;
}
