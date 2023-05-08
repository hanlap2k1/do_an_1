import { router } from "./site.js";
import { addrouter } from "./add.js";
import { searchrouter } from "./search.js";
import check from '../util/phanquyen.js'
export function route(app){
    app.use('/search',check.checkLogin,searchrouter);
    app.use('/add',check.checkLogin,check.checkAdmin,addrouter);
    app.use('/',router);
}

