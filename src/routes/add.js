import express from 'express';
export const addrouter = express.Router();
import AddController from '../app/controllers/AddController.js';
var addController = new AddController;

addrouter.get('/ly-thuyet',addController.index2);
addrouter.post('/ly-thuyet',addController.addfile2);
addrouter.get('/thuc-hanh',addController.index);
addrouter.post('/thuc-hanh',addController.addfile);