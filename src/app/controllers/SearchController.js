import Users from "../models/Users.js"
import User2s from "../models/User2s.js"
import mg from "../../util/mongoose.js"
import tinh from "../../util/tinhheso.js"
export default class SearchController{
    search_home(req,res,next){
        User2s.find()
            .then(users => {
                //teachers = teachers.map(teacher => teacher.toObject());
                users = mg.mutipleMongooseToOject(users);
                res.render('search/search', { users });
            })
            .catch(next);
    }
    searchlessons(req,res,next){
        User2s.find({Giangvien: req.body.ten, Ngay: { $in: req.body.check }})
        .then(user2=>{
            var users3 = new Array();
            var flag = 0;
            user2 = mg.mutipleMongooseToOject(user2);
            let uniqueLT = user2.map(data=>{
                return [data.He,data.Malop,data.Hinhthuc];
            });
            const uniqueMembers2 = tinh.unique(
                uniqueLT,
                (a, b) => (a[0] === b[0]) & (a[1] === b[1]) & (a[2] === b[2])
            );
            //console.log(uniqueMembers2);
            for(var i in uniqueMembers2){
                flag=0;
                var tongtiet_LT = 0;
                for(var j in user2){
                    if((uniqueMembers2[i][0]===user2[j].He) && (uniqueMembers2[i][1]===user2[j].Malop 
                        && (uniqueMembers2[i][2]===user2[j].Hinhthuc))){
                        if(flag === 0){
                            var temp = new Object;
                            temp = Object.assign({}, user2[j]);
                            delete temp.Sotietday; 
                            users3[i] =  temp;
                            flag=1;
                        }
                        
                        tongtiet_LT += Number(user2[j].Sotietday);
                    }
                }
                
                users3[i].Sotietday = tongtiet_LT;
                //console.log(tongtiet_LT);
            }
            //console.log(users3);
            
            users3 =  users3.map(data=>{
                var heso_LT = tinh.tinhhesoLT(data);
                data = Object.assign(data,{heso:Number((heso_LT*Number(data.Sotietday)).toFixed(2))});  
                return data;
            });
            
            //console.log(users3);
            res.render('search/search2', {
                    users3,
                    user2,
                    thang:req.body.thang,
                    nam:req.body.nam
                });
        })
        .catch(next);
    }
    search_thuchanh(req,res,next){
        Users.find({Giang_vien: req.body.ten, Ngay: { $in: req.body.check }})
            .then(user=>{
                var thuc_hanh = new Array();
                var mang_tiet = new Array();
                var mang_2_chieu_row = new Array();
                user = mg.mutipleMongooseToOject(user);
                let uniqueLT = user.map(data=>{
                    return [data.He,data.Ma_lop,data.Ten_nhom,data.Ngay];
                });
                const uniqueMembers2 = tinh.unique(
                    uniqueLT,
                    (a, b) => (a[0] === b[0]) & (a[1] === b[1]) & (a[2] === b[2]) & (a[3] === b[3])
                );
                let uniqueLT2 = user.map(data=>{
                    return [data.He,data.Ma_lop,data.Ten_nhom];
                });
                const uniqueMembers2_2 = tinh.unique(
                    uniqueLT2,
                    (a, b) => (a[0] === b[0]) & (a[1] === b[1]) & (a[2] === b[2])
                );
                for ( var y=0; y < uniqueMembers2_2.length; y++ ) {
                    var mang_2_chieu_col = new Array();
                    for ( var x=0; x< req.body.check.length; x++ ) { 
                        mang_2_chieu_col[x]=0;
                    }
                    mang_2_chieu_row.push(mang_2_chieu_col);
                }
                //console.log(mang_2_chieu_row);
                for(var i in uniqueMembers2){
                    var tongtiet_LT = 0;
                    var tiet = 0;
                    for(var j in user){
                        if((uniqueMembers2[i][0]===user[j].He) && (uniqueMembers2[i][1]===user[j].Ma_lop 
                            && (uniqueMembers2[i][2]===user[j].Ten_nhom) && (uniqueMembers2[i][3]===user[j].Ngay))){
                                tiet = tinh.tinhhesoTH(user[j]);
                                tongtiet_LT += tinh.demtiet(user[j],tiet);
                            } 
                    } 
                    mang_tiet[i] = tongtiet_LT;
                }
                for(var i in uniqueMembers2_2){
                    for(var j in uniqueMembers2){
                        if((uniqueMembers2[j][0]===uniqueMembers2_2[i][0]) && (uniqueMembers2[j][1]===uniqueMembers2_2[i][1]) 
                            && (uniqueMembers2[j][2]===uniqueMembers2_2[i][2])){
                                var vitri = req.body.check.indexOf(uniqueMembers2[j][3]);
                                mang_2_chieu_row[Number(i)][vitri]= mang_tiet[j];
                            }
                    }
                    for(var j in user){
                        if((uniqueMembers2_2[i][0]===user[j].He) && (uniqueMembers2_2[i][1]===user[j].Ma_lop) 
                            && (uniqueMembers2_2[i][2]===user[j].Ten_nhom)){
                                var infor = new Object;
                                infor.Ma_lop = user[j].Ma_lop;
                                infor.He = user[j].He;
                                infor.Khoa = user[j].Khoa;
                                infor.Ten_mon_hoc = user[j].Hocphan_Monhoc;
                                infor.Nhom_thuc_hanh = user[j].Ten_nhom;
                                thuc_hanh[i] = infor;
                                break;
                            }   
                    }
                }
                //console.log(mang_2_chieu_row);
                //console.log(mang_tiet);
                var tt=0;
                thuc_hanh.map(data=>{
                    data = Object.assign(data,{Tiet:mang_2_chieu_row[tt]});
                    tt++;
                });
                res.render('search/search3', {
                    thuc_hanh,
                    Ngay:req.body.check,
                }
                );
            })
        .catch(next);
    }
}