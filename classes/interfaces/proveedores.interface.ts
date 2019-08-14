import mongoose, { Schema, Document } from 'mongoose';

export interface IProveedores extends Document {
  nombre: string;
}

const ProveedoresSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  }
});

export default mongoose.model<IProveedores>('Proveedores', ProveedoresSchema);
