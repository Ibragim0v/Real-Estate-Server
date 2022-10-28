import { Router } from 'express';
const mortageRouter = Router();
import mortageController from '../../controllers/mortage.controller';

export default mortageRouter
  .get('/company/:companyId', mortageController.GET_COMPANY_COMPLEX)
  .get('/complex/:complexId', mortageController.GET_COMPLEX_ROOM)
  .get('/room/:roomId', mortageController.GET_ROOM)
  .get('/calculator/:price/:square/:duration', mortageController.CALCULATOR);
