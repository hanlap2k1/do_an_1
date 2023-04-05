import { router } from "./site.js";

export function route(app){
    app.use('/',router);
}

