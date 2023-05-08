import mongoose from "mongoose";

const Schema = mongoose.Schema;
const User2s = new Schema({
    Bomon:String,
    Malop:String,
    He:String,
    Nganh:String,
    Khoa:String,
    Tenhocphan:String,
    Giangvien:String,
    SotietLT:String,
    SotietTH:String,
    TL_DA_BTL:String,
    SoSV:String,
    Hinhthuc:String,
    Ngay:String,
    Sotietday:String
},{
    collection:'test2'
});

export default mongoose.model('Test2', User2s);