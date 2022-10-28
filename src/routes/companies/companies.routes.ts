import { Router } from 'express';
import companiesController from '../../controllers/companies.controller';

const companyRouter = Router();

export default companyRouter
  .get('/companyComplexes', companiesController.GET_WITH_COMPLEX)
  .get('/companies', companiesController.GET)
  .post('/createCompany', companiesController.POST)
  .put('/updateCompany/:id', companiesController.PUT)
  .delete('/deleteCompany/:id', companiesController.DELETE);
