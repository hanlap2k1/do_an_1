import mongoose from "mongoose";

// import { createRequire } from "https://deno.land/std/node/module.ts";
// const require = createRequire(import.meta.url);
// const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
var db= {
    connect:async function (){
        try {
             //await mongoose.connect('mongodb://127.0.0.1:27017/test');
             await mongoose.connect('mongodb+srv://giangviendata:giangviendata@cluster0.kugglbr.mongodb.net/?retryWrites=true&w=majority/test');
            console.log('connect successfully!!!');
        } catch (error) {
            console.log('connect fail!!!');
        }
    }
} 
export default db;
