import { Router } from 'express';
import banksController from '../../controllers/banks.controller';

const bankRouter = Router();

export default bankRouter
  .get('/banks', banksController.GET)
  .post('/createBank', banksController.POST);
