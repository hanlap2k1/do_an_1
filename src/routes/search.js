import express from 'express';
import check from '../util/phanquyen.js'
export const searchrouter = express.Router();
import SearchController from '../app/controllers/SearchController.js';
var searchController = new SearchController;

searchrouter.post('/thong-tin-thuc-hanh',check.checkName,searchController.search_thuchanh);
searchrouter.post('/giang-day',check.checkName,searchController.searchlessons);
searchrouter.get('/',searchController.search_home);