import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../config/ormconfig';
import { Companies } from '../entities/companies.entity';
import { CustomErrorHandler } from '../errors/CustomErrorHandler';
import { companiesPostFilter, companiesPutFilter } from '../validation/companies.validation';
import { uuidChecker } from '../validation/uuidChecker.validation';

export default {
  GET_WITH_COMPLEX: async (_: Request, res: Response, next: NextFunction) => {
    const allCompanies = await dataSource
      .getRepository(Companies)
      .find({
        relations: {
          complexes: true,
        },
      })
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allCompanies);
  },
  GET: async (_: Request, res: Response, next: NextFunction) => {
    const allCompanies = await dataSource
      .getRepository(Companies)
      .find()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allCompanies);
  },
  POST: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = companiesPostFilter.validate(req.body);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    const newCompany = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Companies)
      .values(value)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (newCompany) {
      res.status(201).json({ status: 201, message: 'Company has been created successfully' });
    }
  },
  PUT: async (req: Request, res: Response, next: NextFunction) => {
    const { error: uuidError, value: uuidValue } = uuidChecker.validate(req.params);

    if (uuidError) {
      return next(new CustomErrorHandler(400, uuidError.message));
    }

    const { error, value } = companiesPutFilter.validate(req.body);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const updatedCompany = await dataSource
      .createQueryBuilder()
      .update(Companies)
      .set(value)
      .where('id = :id', uuidValue)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (updatedCompany) {
      return res.json({ status: 200, message: 'Company has been updated successfully' });
    }
  },
  DELETE: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = uuidChecker.validate(req.params);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    const removedCompany = await dataSource
      .createQueryBuilder()
      .delete()
      .from(Companies)
      .where('id = :id', value)
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (removedCompany) {
      return res.json({ status: 200, message: 'Company has been removed successfully' });
    }
  },
};
