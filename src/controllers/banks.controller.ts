import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../config/ormconfig';
import { Banks } from '../entities/banks.entity';
import { CustomErrorHandler } from '../errors/CustomErrorHandler';

export default {
  GET: async (_: Request, res: Response, next: NextFunction) => {
    const allBanks = await dataSource
      .getRepository(Banks)
      .find()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allBanks);
  },
  POST: async (req: Request, res: Response, next: NextFunction) => {
    const { name, finance, starting_payment, img_url } = req.body;

    const newBank = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Banks)
      .values({ name, finance, starting_payment, img_url })
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (newBank) {
      res.json('Bank has been created successfully');
    }
  },
};
