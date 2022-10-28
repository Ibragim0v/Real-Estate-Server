import { Router } from 'express';
import adminsController from '../../controllers/admins.controller';

const adminRouter = Router();

export default adminRouter
  .get('/admins', adminsController.GET)
  .post('/admins', adminsController.POST)
  .post('/login', adminsController.LOGIN);
