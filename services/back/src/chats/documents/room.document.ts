import { User } from './../../users/user.document';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Type } from 'class-transformer';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true, versionKey: false })
export class Room extends Document {
  @ApiProperty({
    description: "Room's name",
    example: 'World environment discussion room',
  })
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty({
    description: "This is a room about planet's environment",
    example: 'We have a climat problems',
  })
  @Prop({ type: String, minlength: 6 })
  description: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  @Type(() => User)
  users: User;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
