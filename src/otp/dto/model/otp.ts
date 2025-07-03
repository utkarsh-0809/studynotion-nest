import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OtpDocument = Otp & Document;

@Schema({
  timestamps: true,
  expires: 300,  // 5 minutes in seconds
})
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: string;

  @Prop({
    type: Date,
    default: Date.now,
    expires: 300, // 5 minutes in seconds
  })
  createdAt: Date;
}

export const OtpSchema = SchemaFactory.createForClass(Otp);
