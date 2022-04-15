import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ChatsGateway } from './chats.gateway';

@Module({
  providers: [ChatsGateway],
  imports: [UsersModule],
})
export class ChatsModule {}
