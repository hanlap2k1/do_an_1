import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Accounts = new Schema({
    username:String,
    password:String,
    role:String
  },{
    collection:'accounts'
  });

export default mongoose.model('Account', Accounts);
