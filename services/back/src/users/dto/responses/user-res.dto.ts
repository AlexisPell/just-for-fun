import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Exclude } from 'class-transformer';

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

  constructor(partial: UserResDTO) {
    Object.assign(this, partial);
  }
}
