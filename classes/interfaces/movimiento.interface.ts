import mongoose, { Schema, Document } from 'mongoose';

export interface IMovimientos extends Document {
  fecha: string;
  cantidad: string;
  cuenta: string;
  descripcion: string;
  hidden: boolean;
}

const DepartamentosSchema: Schema = new Schema({
  fecha: {
    type: String,
    required: [true, 'El campo fecha es requerido']
  },
  cantidad: {
    type: String,
    required: [true, 'El campo cantidad es requerido']
  },
  cuenta: {
    type: String,
    required: [true, 'El campo cuenta es requerido']
  },
  descripcion: {
    type: String,
    required: [true, 'El campo descripcion es requerido']
  },
  hidden: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model<IMovimientos>('Movimientos', DepartamentosSchema);
