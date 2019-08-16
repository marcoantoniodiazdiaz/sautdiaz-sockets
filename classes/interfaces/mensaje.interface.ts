import mongoose, { Schema, Document } from 'mongoose';

export interface IMensajes extends Document {
  nombre: string;
}

const MensajesSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  }
});

export default mongoose.model<IMensajes>('Mensajes', MensajesSchema);
