import express from 'express';
export const router = express.Router();

import SiteController from '../app/controllers/SiteController.js';

var siteController = new SiteController;
router.post('/login',siteController.login_post);
router.get('/login',siteController.login);
router.get('/more',siteController.more);
router.get('/',siteController.home);