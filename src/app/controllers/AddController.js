import formidable from 'formidable';
import fs from 'fs';
import {writetodb} from '../models/Writetodb.js';
import Users from "../models/Users.js"
export default class AddController{
    index(req,res,next){
        res.render('add');
    }
    addfile(req,res,next){
        // // var form = new formidable.IncomingForm();
        
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files)=> {
            if (err) {
                next(err);
                return;
            }
            Users.deleteMany({Ngay: fields.date})
                .then(function(){
                    var oldpath = files.excelfile.filepath;
                    var newpath = './src/resouses/excel/thang1.xlsx';
                    fs.rename(oldpath, newpath, function (err) {
                        if (err) throw err;
                        writetodb(fields);
                        console.log('File uploaded and moved!');
                        res.render('add');
                        });
                })
                .catch(next);
            
        });
        
    }
}