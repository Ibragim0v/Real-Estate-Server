import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../config/ormconfig';
import { Rooms } from '../entities/rooms.entity';
import { CustomErrorHandler } from '../errors/CustomErrorHandler';
import { roomsPostFilter, roomsPutFilter } from '../validation/rooms.validation';
import { uuidChecker } from '../validation/uuidChecker.validation';

export default {
  GET_WITH_COMPLEX: async (_: Request, res: Response, next: NextFunction) => {
    const allRooms = await dataSource
      .getRepository(Rooms)
      .find({
        relations: {
          complex: true,
        },
      })
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allRooms);
  },
  GET: async (_: Request, res: Response, next: NextFunction) => {
    const allRooms = await dataSource
      .getRepository(Rooms)
      .find()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allRooms);
  },
  POST: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = roomsPostFilter.validate(req.body);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    const newRoom = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Rooms)
      .values(value)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (newRoom) {
      res.status(201).json({ status: 201, message: 'Room has been created successfully' });
    }
  },
  PUT: async (req: Request, res: Response, next: NextFunction) => {
    const { error: uuidError, value: uuidValue } = uuidChecker.validate(req.params);

    if (uuidError) {
      next(new CustomErrorHandler(400, uuidError.message));
    }

    const { error, value } = roomsPutFilter.validate(req.body);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    const updatedRoom = await dataSource
      .createQueryBuilder()
      .update(Rooms)
      .set(value)
      .where('id = :id', uuidValue)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (updatedRoom) {
      return res.json({ status: 200, message: 'Room has been updated successfully' });
    }
  },
  DELETE: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = uuidChecker.validate(req.params);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    const removedRoom = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Rooms)
      .where('id = :id', value)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (removedRoom) {
      return res.json({ status: 200, message: 'Room has been removed successfully' });
    }
  },
};
