import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Users = new Schema({
    tt: Number,
    Bo_mon: String,
    He: String,
    Khoa: String,
    Ma_lop: String,
    Ten_nhom: String,
    Tong_so_nhom: String,
    SL_HS_SV: String,
    Hocphan_Monhoc: String,
    Ca_thu_2: Number,
    Phong_thu_2: String,
    Ca_thu_3: Number,
    Phong_thu_3: String,
    Ca_thu_4: Number,
    Phong_thu_4: String,
    Ca_thu_5: Number,
    Phong_thu_5: String,
    Ca_thu_6: Number,
    Phong_thu_6: String,
    Ca_thu_7: Number,
    Phong_thu_7: String,
    Ca_chu_nhat: Number,
    Phong_chu_nhat: String,
    Giang_vien: String,
    Ngay:String,
    Thang:String,
    Nam:String
  },{
    collection:'users'
  });

export default mongoose.model('User', Users);
