import { Router } from 'express';
import roomsController from '../../controllers/rooms.controller';

const roomRouter = Router();

export default roomRouter
  .get('/roomComplexes', roomsController.GET_WITH_COMPLEX)
  .get('/rooms', roomsController.GET)
  .post('/createRoom', roomsController.POST)
  .put('/updateRoom/:id', roomsController.PUT)
  .delete('/deleteRoom/:id', roomsController.DELETE);
