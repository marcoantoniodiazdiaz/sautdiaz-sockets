import mongoose, { Schema, Document } from 'mongoose';
import { IProducto } from './producto.interface';

export interface IVenta extends Document {
  producto: IProducto;
  cantidad: string;
  servicio: string;
  isDiff: Boolean;
  precioDiferente: string;
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
  isDiff: {
    type: Boolean,
    default: false,
    required: false
  },
  precioDiferente: {
    type: String,
    default: "0.00",
    required: false
  },
  servicio: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo servicio es requerido'],
    ref: 'Servicios'
  }
});

export default mongoose.model<IVenta>('Ventas', VentaSchema);
