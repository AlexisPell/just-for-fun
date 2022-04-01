import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserDocument } from 'src/users/user.document';
import { UsersService } from 'src/users/users.service';
import { Done } from '../auth.constants';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  // usersService here
  constructor(private usersService: UsersService) {
    super();
  }

  serializeUser(user: UserDocument, done: Done) {
    console.log('PASSPORT SERIALIZER:', user);
    done(null, user);
  }

  async deserializeUser(user: UserDocument, done: Done) {
    console.log('PASSPORT DESERIALIZER:', user);
    return user ? done(null, user) : done(null, null);
  }
}
