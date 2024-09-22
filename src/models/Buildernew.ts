// In your BuilderModel.ts file
import mongoose, { Document } from 'mongoose';


export interface BuilderDataDocument extends Document{}

const BuilderDataSchema = new mongoose.Schema({
  // Your schema definition here
});

const BuilderData = mongoose.model<BuilderDataDocument>('BuilderData', BuilderDataSchema);

export default BuilderData;