import { Router } from 'express';
import complexesController from '../../controllers/complexes.controller';

const complexRouter = Router();

export default complexRouter
  .get('/complexCompanies', complexesController.GET_WITH_COMPANY)
  .get('/complexRooms', complexesController.GET_WITH_ROOM)
  .get('/complexes', complexesController.GET)
  .post('/createComplex', complexesController.POST)
  .put('/updateComplex/:id', complexesController.PUT)
  .delete('/deleteComplex/:id', complexesController.DELETE);
