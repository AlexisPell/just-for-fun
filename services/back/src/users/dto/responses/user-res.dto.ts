import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform, Exclude } from 'class-transformer';

export class UserResDTO {
  @ApiProperty({ name: 'id' })
  @Expose({ name: 'id' })
  @Transform(({ value }) => String(value), { toPlainOnly: true })
  _id: string;

  @Exclude()
  password: string;

  constructor(partial: UserResDTO) {
    Object.assign(this, partial);
  }
}
