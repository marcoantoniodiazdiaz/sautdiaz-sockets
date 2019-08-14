import mongoose, { Schema, Document } from 'mongoose';
import { IDepartamentos } from './departamentos.interface';

export interface IProducto extends Document {
  nombre: string;
  departamento: IDepartamentos;
  codigo: string;
  precio: string;
  compra: string;
  existencia: string;
}

const ProductoSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  },
  departamento: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo departamento es requerido'],
    ref: 'Departamentos'
  },
  codigo: {
    type: String,
    required: [true, 'El campo codigo es requerido']
  },
  precio: {
    type: String,
    required: [true, 'El campo precio es requerido']
  },
  compra: {
    type: String,
    required: [true, 'El campo compra es requerido']
  },
  existencia: {
    type: Number,
    required: [true, 'El campo existencia es requerido']
  }
});

export default mongoose.model<IProducto>('Productos', ProductoSchema);
