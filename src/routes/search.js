import express from 'express';
export const searchrouter = express.Router();
import SearchController from '../app/controllers/SearchController.js';
var searchController = new SearchController;

searchrouter.post('/thong-tin-thuc-hanh',searchController.search_thuchanh);
searchrouter.post('/giang-day',searchController.searchlessons);
searchrouter.get('/',searchController.search_home);