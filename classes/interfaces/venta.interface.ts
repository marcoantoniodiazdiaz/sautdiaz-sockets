import mongoose, { Schema, Document } from 'mongoose';
import { IProducto } from './producto.interface';

export interface IVenta extends Document {
  producto: IProducto;
  cantidad: string;
  servicio: string;
}

const VentaSchema: Schema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo producto es requerido'],
    ref: 'Productos'
  },
  cantidad: {
    type: String,
    required: [true, 'El campo cantidad es requerido']
  },
  servicio: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo servicio es requerido'],
    ref: 'Servicios'
  }
});

export default mongoose.model<IVenta>('Ventas', VentaSchema);
