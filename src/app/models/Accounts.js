import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Accounts = new Schema({
    username:String,
    password:String,
    role:String,
    name:String,
  },{
    collection:'accounts'
  });

export default mongoose.model('Account', Accounts);
