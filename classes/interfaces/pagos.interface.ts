import mongoose, { Schema, Document } from 'mongoose';
import { IServicios } from './servicios.interface';

export interface IPagos extends Document {
  movimiento: string;
  servicio: IServicios;
}

const PagosSchema: Schema = new Schema({
  movimiento: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo movimiento es requerido'],
    ref: 'Movimientos'
  },
  servicio: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo servicio es requerido'],
    ref: 'Servicios'
  }
});

export default mongoose.model<IPagos>('Pagos', PagosSchema);
