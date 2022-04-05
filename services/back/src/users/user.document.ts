import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
  @ApiProperty({ description: 'User email', example: 'my-mail@gmail.com' })
  @Prop({ type: String, required: true })
  email: string;

  @ApiProperty({ description: 'Password', example: 'my-password' })
  @Prop({ type: String, minlength: 6 })
  password: string;

  @ApiProperty({
    description: 'If verified locally or somewhere else',
    example: true,
  })
  @Prop({ type: Boolean, default: false })
  verified: boolean;

  @ApiProperty({ description: 'google account id' })
  @Prop({ type: String, unique: true, sparse: true }) // sparse to let uniqie while null
  googleId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
