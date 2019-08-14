import mongoose, { Schema, Document } from 'mongoose';

export interface IServicios extends Document {
  fecha: string;
  vehiculo: string;
  trabajador: string;
  estado: string;
}

const ServiciosSchema: Schema = new Schema({
  fecha: {
    type: String,
    required: [true, 'El campo fecha es requerido']
  },
  vehiculo: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo vehiculo es requerido'],
    ref: 'Vehiculos'
  },
  estado: {
    type: String,
    required: [true, 'El campo estado es requerido']
  },
  trabajador: {
    type: Schema.Types.ObjectId,
    required: [true, 'El campo vehiculo es requerido'],
    ref: 'Trabajadores'
  }
});

export default mongoose.model<IServicios>('Servicios', ServiciosSchema);
