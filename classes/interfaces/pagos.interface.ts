import mongoose, { Schema, Document } from 'mongoose';

export interface IPagos extends Document {
  movimiento: string;
  servicio: string;
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
