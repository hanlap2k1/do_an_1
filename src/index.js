import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

import {route} from './routes/index.js';

import db from './config/db/index.js';

db.connect();

app.use(express.static(path.join(__dirname,'public')))

app.use(express.urlencoded({
      extended: true
}));
app.use(express.json());

app.use(morgan('combined'));

app.engine('hbs', engine({
    extname :".hbs",
    helpers: {
      fil:(context,options)=>{
          var ret = "";
          for(var i=0;i<context.length;i++){
            if(!ret.includes(options.fn(context[i]))){
              ret = ret + options.fn(context[i]);
            }
          }
          return ret;
        },
      sum:(a,b)=>{
        return a + b;
      }
        
  }
} ));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resouses','views'));
app.use(cookieParser())
route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
