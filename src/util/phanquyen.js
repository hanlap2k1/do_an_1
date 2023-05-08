import jwt from 'jsonwebtoken';
import Accounts from "../app/models/Accounts.js"
var checkLogin = (req,res,next)=>{
        try {
            var token = req.cookies.token;
            var idUser = jwt.verify(token,'mk');
            Accounts.findOne({_id:idUser})
            .then(data=>{
                if(data){
                    req.data = data;
                    next()
                }
            })
            .catch(err=>{
    
            });;
        } catch (error) {
            var mess = "Vui lòng đăng nhập";
            res.render('login',{mess})
        }
    }
var checkAdmin = (req,res,next)=>{
    var role = req.data.role;
    if(role == "admin"){
        next()
    }else{
        var mess = "Bạn không được cấp quyền";
        res.render('home', {mess});
    }

}
export default {checkLogin,checkAdmin};