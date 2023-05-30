import User2s from "../models/User2s.js";
import ExcelJS from 'exceljs';


const tieude = ['Bomon','Malop','He','Nganh','Khoa','Tenhocphan','Giangvien','SotietLT','SotietTH','TL_DA_BTL','SoSV','Hinhthuc','Ngay','Sotietday'];
export function writetodb2(){
    const wb = new ExcelJS.Workbook();
    const fileName = 'src/resouses/excel/ki1.xlsx';
    var dulieu_row = new Array();
    var dulieu_cuoi  = new Array();
    var ds_ngay  = new Array();
    var mang_sotiet  = new Array();
    wb.xlsx.readFile(fileName).then(() => {
        const ws = wb.getWorksheet('KHOA DIEN TU');
        for(var i = 9; i <= 2000; i++){
            var dulieu_col = new Array();
            for(var j = 2; j <= 18 ; j ++ ){
                if(typeof(ws.getCell(i, j).value)=='object'){
                    if(ws.getCell(i, j).value === null)
                    {   
                        dulieu_col[j-2]=null;
                        //console.log(null);
                    }else{
                        dulieu_col[j-2]=ws.getCell(i, j).result;
                        //console.log(ws.getCell(i, j).result);
                    }
                }else{
                    dulieu_col[j-2]=ws.getCell(i, j).value;
                    //console.log(ws.getCell(i, j).value);
                }
            }
            if(dulieu_col.some(el => el !== null)){
                dulieu_row[i-9] = dulieu_col;
            }else{
                break;
            }
            
        }
        //console.log(dulieu_row);
        for(var i = 19; i <= 150; i++){
            var v1 =new String;
            var data = ws.getCell(2,i).value;
            if(data === null){
                break;
            }else{
                if(data.hasOwnProperty('result')){
                    v1 = data.result;
                    v1 = v1.toJSON().slice(0,10);
                }else{
                    v1 = data;
                    v1 = v1.toJSON().slice(0,10);
                }
                ds_ngay.push(v1);
            }
        }
        //console.log(ds_ngay);

        for(var i = 9; i <= dulieu_row.length+9; i++){
            var mang_sotiet_elm = new Array();
            for(var j = 19; j <= ds_ngay.length+18; j++){
                if(ws.getCell(i, j).value != null){
                    mang_sotiet_elm.push({Ngay:ds_ngay[j-19],Sotietday:ws.getCell(i, j).value});
                }
            }
            mang_sotiet.push(mang_sotiet_elm);
        }
        //console.log(mang_sotiet);
        
        for(var i in dulieu_row){
            var dulieu_cuoi_con = new Array;
            for(var j=0;j<=9;j++){
                dulieu_cuoi_con[j] = [tieude[j],dulieu_row[i][j]];
            }
            dulieu_cuoi_con[10] = [tieude[10],dulieu_row[i][11]];
            dulieu_cuoi_con[11] = [tieude[11],dulieu_row[i][16]];
            dulieu_cuoi[i]=dulieu_cuoi_con;
        }
        //console.log(dulieu_cuoi);
        for(var i in dulieu_cuoi){
            dulieu_cuoi[i] = Object.fromEntries(dulieu_cuoi[i]);
        }
        //console.log(dulieu_cuoi);
        User2s.deleteMany({Ngay: { $in: ds_ngay }})
            .then(function(){
                    console.log('deleted!');
                    for(var i=0;i<mang_sotiet.length;i++){
                        var temp = mang_sotiet[i];
                        for(var j in temp){
                            var character = Object.assign(dulieu_cuoi[i], temp[j]);
                            User2s.create(character);
                            //console.log(character);
                        }
                    }
                })
            .catch(Error);
    }).catch(err => {
        res.status(500);
    });
}

