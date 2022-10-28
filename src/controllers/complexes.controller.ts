import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../config/ormconfig';
import { Complexes } from '../entities/complexes.entity';
import { CustomErrorHandler } from '../errors/CustomErrorHandler';
import { uuidChecker } from '../validation/uuidChecker.validation';
import { complexesPostFilter, complexesPutFilter } from '../validation/complexes.validation';

export default {
  GET_WITH_COMPANY: async (_: Request, res: Response, next: NextFunction) => {
    const allComplexes = await dataSource
      .getRepository(Complexes)
      .find({
        relations: {
          company: true,
        },
      })
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allComplexes);
  },
  GET_WITH_ROOM: async (_: Request, res: Response, next: NextFunction) => {
    const allComplexes = await dataSource
      .getRepository(Complexes)
      .find({
        relations: {
          rooms: true,
        },
      })
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allComplexes);
  },
  GET: async (_: Request, res: Response, next: NextFunction) => {
    const allComplexes = await dataSource
      .getRepository(Complexes)
      .find()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allComplexes);
  },
  POST: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = complexesPostFilter.validate(req.body);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    console.log(value);

    const newComplex = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Complexes)
      .values(value)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (newComplex) {
      res.status(201).json({ status: 201, message: 'Complex has been created successfully' });
    }
  },
  PUT: async (req: Request, res: Response, next: NextFunction) => {
    const { error: uuidError, value: uuidValue } = uuidChecker.validate(req.params);

    if (uuidError) {
      next(new CustomErrorHandler(400, uuidError.message));
    }

    const { error, value } = complexesPutFilter.validate(req.body);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    const updatedComplex = await dataSource
      .createQueryBuilder()
      .update(Complexes)
      .set(value)
      .where('id = :id', uuidValue)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (updatedComplex) {
      return res.json({ status: 200, message: 'Complex has been updated successfully' });
    }
  },
  DELETE: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = uuidChecker.validate(req.params);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    const removedComplex = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Complexes)
      .where('id = :id', value)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (removedComplex) {
      return res.json({ status: 200, message: 'Complex has been removed successfully' });
    }
  },
};
