import mongoose, { Schema, Document } from 'mongoose';

export interface ITrabajadores extends Document {
  nombre: string;
}

const TrabajadoresSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  }
});

export default mongoose.model<ITrabajadores>(
  'Trabajadores',
  TrabajadoresSchema
);
