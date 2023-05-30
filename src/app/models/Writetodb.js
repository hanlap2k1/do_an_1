import excelToJson from'convert-excel-to-json';
import fs from 'fs';
import Users from "../models/Users.js";
import { throws } from 'assert';
export function writetodb(fields){
        const result = excelToJson({
            source: fs.readFileSync("src/resouses/excel/thang1.xlsx"),
            range:'A13:Z200',
            columnToKey: {
                A: "tt",
                B: "Bo_mon",
                C: "He",
                D: "Khoa",
                E: "Ma_lop",
                F: "Ten_nhom",
                G: "Tong_so_nhom",
                H: "SL_HS_SV",
                I: "Hocphan_Monhoc",
                J: "Ca_thu_2",
                K: "Phong_thu_2",
                L: "Ca_thu_3",
                M: "Phong_thu_3",
                N: "Ca_thu_4",
                O: "Phong_thu_4",
                P: "Ca_thu_5",
                Q: "Phong_thu_5",
                R: "Ca_thu_6",
                S: "Phong_thu_6",
                T: "Ca_thu_7",
                U: "Phong_thu_7",
                V: "Ca_chu_nhat",
                W: "Phong_chu_nhat",
                X: "Giang_vien",
                Y:"Ghi_chu",
                Z:"Tong_so_tiet",
            },
            includeEmptyLines:true,
            sheetStubs:true
        });
        var date = fields.date;
        var ngay = date;
        var thang = date.slice(5,7);
        var nam = date.slice(0,4);
        const User = Users;
        for (var key in result){
            result[key].map(function(data){
                var isEmpty = Object.values(data).every(x => x === null);
                if(isEmpty===true){
                    return
                }else{
                    var character = Object.assign(data, {Ngay:ngay});
                    character = Object.assign(data, {Thang:thang});
                    character = Object.assign(data, {Nam:nam});
                    User.create(character);
                }
            });
        }
    
}
