import mongoose, { Schema, Document } from 'mongoose';

export interface IMarcas extends Document {
  nombre: string;
}

const MarcasSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  }
});

export default mongoose.model<IMarcas>('Marcas', MarcasSchema);
