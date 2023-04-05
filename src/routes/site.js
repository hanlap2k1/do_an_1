import express from 'express';
export const router = express.Router();

import SiteController from '../app/controllers/SiteController.js';
import AddController from '../app/controllers/AddController.js';
var siteController = new SiteController;
var addController = new AddController;

router.get('/more',siteController.more);
router.get('/add',addController.index);
router.post('/add',addController.addfile);
router.get('/search',siteController.search_home);
router.post('/search',siteController.searchlessons);
router.get('/',siteController.home);