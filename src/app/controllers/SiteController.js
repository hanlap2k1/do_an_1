import { render } from "node-sass";
import Accounts from "../models/Accounts.js"
import jwt from 'jsonwebtoken';
export default class SiteController{
    home(req,res,next){
        res.render('home');
    }
    more(req,res,next){
        res.render('more');
    }
    login(req,res,next){
        res.render('login');
    }
    login_post(req,res,next){
        var username = req.body.username;
        var password = req.body.password;
        Accounts.findOne({username:username,password:password})
        .then(data=>{
            if(data){
                var token = jwt.sign({_id:data._id},'mk');
                res.render('home',{token})
            }else{
                var mess = "Đăng nhập thất bại"
                res.render('login',{mess});
            }
            
        })
        .catch(err=>{
            res.status(500).json("Lỗi server");
        });
    }
    infor(req,res,next){
        res.render('infor');
    }
    infor2(req,res,next){
        res.render('infor2');
    }
};
