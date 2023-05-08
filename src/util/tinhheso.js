const loaiLT = ['LT','DLT_TANH','TH nhóm 1','TH nhóm 2','TH nhóm 3','TH nhóm 4','DTH_TANH','ĐAMH','TTTN','ĐATN'];
const hesoLT = [1,2,1,1,1,1,2*6/10,3/10/45,3/10/45,11/10/45];
const hesoLT2 = [0.9,1];
const loaihe = ['CĐ','ĐH'];
const sotietTH = [5,6];
const hesoTH = [7/10,6/10];
const monTH = ['FE6001','FE6067'];
const sotiet_monTH = [2,2];
export default {
    tinhhesoTH:function (data){
        var index = loaihe.findIndex(elm=>elm===data.He);
        if(index>=0){
            var i = 0;
            var sotiet = 0;
            sotiet = sotietTH[index];
            var heso = hesoTH[index];
        }
        return sotiet;
    },
    tinhhesoLT:function (data){
        var heso = 0;
        var index = loaiLT.findIndex(elm=>elm===data.Hinhthuc);
        //console.log(index);
        if(index===0||index===1){
            var index2 = loaihe.findIndex(elm=>elm===data.He);
            if(index2>=0){
                heso  = hesoLT2[index2]*hesoLT[index];
                return heso;
            }
        }
        if(index>1 && index<6){
            var index3 = loaihe.findIndex(elm=>elm===data.He);
            if(index3>=0){
                heso  = hesoTH[index3];
                return heso;
            }
        }
        if(index===6){
            heso = hesoLT[index];
            return heso;
        }
        if(index>6){
            heso = hesoLT[index]*Number(data.SoSV);
            return heso;
        }
    },
    demtiet:function(user,dem){
        var tiet = 0;
        if(user.Phong_thu_2 !==null&&user.Ca_thu_2 !==null){
            if(user.Ca_thu_2 == 3){tiet += 5;}
            else{tiet = tiet + dem;}
        }
        if(user.Phong_thu_3 !==null&&user.Ca_thu_3 !==null){
            if(user.Ca_thu_3 == 3){tiet += 5;}
            else{tiet = tiet + dem;}
        }
        if(user.Phong_thu_4 !==null&&user.Ca_thu_4 !==null){
            if(user.Ca_thu_4 == 3){tiet += 5;}
            else{tiet = tiet + dem;}
        }
        if(user.Phong_thu_5 !==null&&user.Ca_thu_5 !==null){
            if(user.Ca_thu_5 == 3){tiet += 5;}
            else{tiet = tiet + dem;}
        }
        if(user.Phong_thu_6 !==null&&user.Ca_thu_6 !==null){
            if(user.Ca_thu_6 == 3){tiet += 5;}
            else{tiet = tiet + dem;}
        }
        if(user.Phong_thu_7 !==null&&user.Ca_thu_7 !==null){
            if(user.Ca_thu_7 == 3){tiet += 5;}
            else{tiet = tiet + dem;}
        }
        if(user.Phong_chu_nhat !==null&&user.Ca_chu_nhat !==null){
            if(user.Ca_chu_nhat == 3){tiet += 5;}
            else{tiet = tiet + dem;}
        }
        return tiet;
    },
    unique:function(a,fn){
        if (a.length === 0 || a.length === 1) {
            return a;
          }
          if (!fn) {
            return a;
          }
        var dem = a.length;
        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (fn(a[i], a[j])) {
                    a.splice(j, 1);
                    j--;
                }
            }
        }
        return a;
    }
}


