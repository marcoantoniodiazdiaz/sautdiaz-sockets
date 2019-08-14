import mongoose, { Schema, Document } from 'mongoose';

export interface ICliente extends Document {
  nombre: string;
  calle: string;
  numero: string;
  colonia: string;
  telefono: string;
  email: string;
}

const ClienteSchema: Schema = new Schema({
  nombre: { type: String, required: [true, 'El nombre es un campo requerido'] },
  calle: { type: String, required: false },
  numero: { type: String, required: false },
  colonia: { type: String, required: false },
  telefono: {
    type: String,
    required: [true, 'El telefono es un campo requerido']
  },
  email: { type: String, required: false }
});

// Export the model and return your IUser interface
export default mongoose.model<ICliente>('Clientes', ClienteSchema);
