import mongoose from 'mongoose';

const COLLECTION_NAME = "SysHashParam";

const schema = new mongoose.Schema({
  key: {type: String, required: true},
  value: {type: String, required: true},
  desc: String,
  createDt: Date,
  updateDt: Date
}, {
  collection: COLLECTION_NAME,
  versionKey: false
});

const SysHashParamModel = mongoose.model(COLLECTION_NAME, schema);

export default SysHashParamModel;
