import { Expose, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserResDTO } from 'src/users/dto/responses/user-res.dto';
import { isValidObjectId } from 'mongoose';

export class RoomResDto {
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

  @Transform(({ value, key, obj }) => {
    if (isValidObjectId(value[0])) return value.map((v) => String(v));
    return value;
  })
  @Type(() => UserResDTO)
  users: UserResDTO[];

  constructor(partial: any) {
    Object.assign(this, partial);
  }
}
