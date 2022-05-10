import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Exclude, Type } from 'class-transformer';
import { RoomResDto } from 'src/chats/dto/res/rooms-res.dto';
import { isValidObjectId } from 'mongoose';

export class UserResDTO {
  // When class to plain. Expose's name targets to new key name
  @ApiProperty({ name: 'id' })
  @Expose({ name: 'id', toPlainOnly: true })
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  _id: string;

  // When plain to class. Expose's name targets to old key name
  @ApiProperty({ name: 'id' })
  @Expose({ name: '_id', toClassOnly: true })
  @Transform(({ value }) => String(value), { toClassOnly: true })
  id: string;

  @Exclude()
  password: string;

  // THIS SOLUTION HANDLES BOTH CASES:
  // If array of Ids - returns it.
  // If array of Objects - returns it.
  @Transform(({ value, key, obj }) => {
    console.log('\nTRANSFORM ROOMS:');
    console.log('Value: ', value); // array
    console.log('\nKey: ', key); // rooms
    console.log('\nObj: ', obj); // UserResDTO
    if (isValidObjectId(value[0])) return value.map((v) => String(v));
    return value;
  })
  @Type(() => RoomResDto)
  rooms: (RoomResDto | string)[];

  constructor(partial: UserResDTO) {
    Object.assign(this, partial);
  }
}
