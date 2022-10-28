import { Router } from 'express';
const router = Router();
import adminRouter from './admins/admins.routes';
import companyRouter from './companies/companies.routes';
import complexRouter from './complexes/complexes.routes';
import roomRouter from './rooms/rooms.routes';
import bankRouter from './banks/banks.routes';
import mortageRouter from './mortage/mortage.routes';

export default router.use([
  adminRouter,
  companyRouter,
  complexRouter,
  roomRouter,
  bankRouter,
  mortageRouter,
]);
