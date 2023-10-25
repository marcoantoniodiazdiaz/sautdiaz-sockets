import mongoose, { Schema, Document } from 'mongoose';

export interface ICliente extends Document {
  nombre: string;
  calle: string;
  numero: string;
  colonia: string;
  telefono: string;
  email: string;
  role: string;
  password: string;
  activated: boolean;
  devices: Object;
}

const ClienteSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  },
  calle: {
    type: String
  },
  numero: {
    type: String
  },
  colonia: {
    type: String
  },
  email: {
    type: String
  },
  telefono: {
    type: String,
    required: [true, 'El campo telefono es requerido']
  },
  role: {
    type: String,
    default: 'USER_ROLE'
  },
  password: {
    type: String,
    default: 'default'
  },
  activated: {
    type: Boolean,
    default: false
  },
  devices: {
    type: Array,
    default: []
  }
});

// Export the model and return your IUser interface
export default mongoose.model<ICliente>('Clientes', ClienteSchema);
