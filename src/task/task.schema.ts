import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Task extends Document {
  @Prop()
  description: string;

  @Prop()
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
