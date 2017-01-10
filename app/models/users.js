import mongoose from "mongoose";

let Schema = mongoose.Schema;

let UserSchema = new Schema({
	con_id : String,
	status : Number
});

module.exports = mongoose.model('user', UserSchema);
