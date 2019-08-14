import mongoose, { Schema, Document } from 'mongoose';

export interface IVentaMostrador extends Document {
  productos: string;
  cantidad: string;
  venta: string;
}

const VentaMostradorSchema: Schema = new Schema({
  producto: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo producto es requerido'],
    ref: 'Productos'
  },
  cantidad: {
    type: String,
    required: [true, 'El campo cantidad es requerido']
  },
  venta: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo venta es requerido'],
    ref: 'Mostrador'
  }
});

export default mongoose.model<IVentaMostrador>(
  'VentaMostrador',
  VentaMostradorSchema
);
