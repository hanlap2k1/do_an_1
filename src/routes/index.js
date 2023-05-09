import { router } from "./site.js";
import { addrouter } from "./add.js";
import { searchrouter } from "./search.js";
import check from '../util/phanquyen.js'
import User2s from "../app/models/User2s.js"
import mg from "../util/mongoose.js"
export function route(app){
    // User2s.find().then(data=>{
    //     global.dulieuhome = mg.mutipleMongooseToOject(data);
    // });
    app.use('/search',check.checkLogin,searchrouter);
    app.use('/add',check.checkLogin,check.checkAdmin,addrouter);
    app.use('/',router);
}

