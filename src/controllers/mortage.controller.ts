import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../config/ormconfig';
import { Companies } from '../entities/companies.entity';
import { Complexes } from '../entities/complexes.entity';
import { Rooms } from '../entities/rooms.entity';
import { Banks } from '../entities/banks.entity';
import { CustomErrorHandler } from '../errors/CustomErrorHandler';
import { uuidChecker } from '../utils/regexp';
import { mortageFilter } from '../validation/mortage.validation';

export default {
  GET_COMPANY_COMPLEX: async (req: Request, res: Response, next: NextFunction) => {
    const { companyId } = req.params;

    if (!companyId.match(uuidChecker)) {
      return next(new CustomErrorHandler(400, 'This id-format does not supported'));
    }

    const allCompanies = await dataSource
      .getRepository(Companies)
      .find({
        relations: {
          complexes: true,
        },
        where: {
          id: companyId,
        },
      })
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (!allCompanies) {
      return next(new CustomErrorHandler(404, 'Complex does not exist'));
    }

    res.json(allCompanies);
  },
  GET_COMPLEX_ROOM: async (req: Request, res: Response, next: NextFunction) => {
    const { complexId } = req.params;

    if (!complexId.match(uuidChecker)) {
      return next(new CustomErrorHandler(400, 'This id-format does not supported'));
    }

    const allComplexes = await dataSource
      .getRepository(Complexes)
      .find({
        relations: {
          rooms: true,
        },
        where: {
          id: complexId,
        },
      })
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (!allComplexes) {
      return next(new CustomErrorHandler(404, 'Complex does not exist'));
    }

    res.json(allComplexes);
  },
  GET_ROOM: async (req: Request, res: Response, next: NextFunction) => {
    const { roomId } = req.params;

    if (!roomId.match(uuidChecker)) {
      return next(new CustomErrorHandler(400, 'This id-format does not supported'));
    }

    const allRooms = await dataSource
      .getRepository(Rooms)
      .find({
        where: {
          id: roomId,
        },
      })
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (!allRooms) {
      return next(new CustomErrorHandler(404, 'Complex does not exist'));
    }

    res.json(allRooms);
  },
  CALCULATOR: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = mortageFilter.validate(req.params);

    if (error) {
      return next(new CustomErrorHandler(400, error.message));
    }

    const { price, square, duration } = value;

    const apartmentCost = price * square;

    const allBanks: any = await dataSource
      .getRepository(Banks)
      .find()
      .catch((err) => new CustomErrorHandler(503, err.message));

    const suitableBank = allBanks.find((bank) => Math.min(bank.finance - apartmentCost));

    const startingPayment = (apartmentCost / 100) * suitableBank.starting_payment;

    const monthlyPayment = Math.ceil((apartmentCost - startingPayment) / (duration * 12));

    res.json({
      suitableBank,
      apartmentCost,
      startingPayment,
      monthlyPayment,
      duration,
    });
  },
};
