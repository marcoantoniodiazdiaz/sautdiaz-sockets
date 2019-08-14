import mongoose, { Schema, Document } from 'mongoose';

export interface IMostrador extends Document {
  fecha: string;
}

const MostradorSchema: Schema = new Schema({
  fecha: {
    type: String,
    required: [true, 'El campo fecha es requerido']
  }
});

export default mongoose.model<IMostrador>('Mostrador', MostradorSchema);
