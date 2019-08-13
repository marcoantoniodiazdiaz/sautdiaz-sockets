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
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true }
});

// Export the model and return your IUser interface
export default mongoose.model<ICliente>('Clientes', ClienteSchema);
