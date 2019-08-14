import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartamentos extends Document {
  nombre: string;
}

const DepartamentosSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El campo nombre es requerido']
  }
});

export default mongoose.model<IDepartamentos>(
  'Departamentos',
  DepartamentosSchema
);
