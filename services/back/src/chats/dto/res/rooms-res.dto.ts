import { plainToInstance, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserResDTO } from 'src/users/dto/responses/user-res.dto';

export class RoomResDto {
  @ApiProperty({ name: 'id' })
  @Expose({ name: '_id' })
  @Transform((params) => String(params.value))
  id: string;

  @Transform((params) => plainToInstance(UserResDTO, params.value))
  users: UserResDTO[];

  constructor(partial: any) {
    Object.assign(this, partial);
  }
}
