import mongoose, { Schema, Document } from 'mongoose';
import { ICliente } from './cliente.interface';

export interface IVehiculos extends Document {
  placa: string;
  nombre: string;
  marca: string;
  submarca: string;
  color: string;
  modelo: string;
  cliente: ICliente;
  motor: string;
}

const VehiculosSchema: Schema = new Schema({
  placa: {
    type: String,
    required: [true, 'El campo placa es requerida']
  },
  marca: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo marca es requerida'],
    ref: 'Marcas'
  },
  submarca: {
    type: String,
    required: [true, 'El campo submarca es requerida']
  },
  color: {
    type: String,
    required: [true, 'El campo color es requerido']
  },
  modelo: {
    type: String
  },
  cliente: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo cliente es requerido'],
    ref: 'Clientes'
  },
  motor: {
    type: String
  }
});

export default mongoose.model<IVehiculos>('Vehiculos', VehiculosSchema);
