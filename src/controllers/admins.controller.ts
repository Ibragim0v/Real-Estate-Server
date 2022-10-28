import { Request, Response, NextFunction } from 'express';
import { dataSource } from '../config/ormconfig';
import { Admins } from '../entities/admins.entity';
import { CustomErrorHandler } from '../errors/CustomErrorHandler';
import { sign } from '../utils/jwt';
import { loginValidation } from '../validation/login.validation';

export default {
  GET: async (_: Request, res: Response, next: NextFunction) => {
    const allAdmins = await dataSource
      .getRepository(Admins)
      .find()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    res.json(allAdmins);
  },
  POST: async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const newAdmin = await dataSource
      .createQueryBuilder()
      .insert()
      .into(Admins)
      .values({ username, password })
      .returning(['id'])
      .execute()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (newAdmin) {
      res.json('User has been created successfully');
    }
  },
  LOGIN: async (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = loginValidation.validate(req.body);

    if (error) {
      next(new CustomErrorHandler(400, error.message));
    }

    let getOneAdmin: any;

    getOneAdmin = await dataSource
      .getRepository(Admins)
      .createQueryBuilder('admins')
      .where('admins.username = :username AND admins.password = :password', {
        username: value.username,
        password: value.password,
      })
      .getOne()
      .catch((err) => next(new CustomErrorHandler(503, err.message)));

    if (!getOneAdmin) {
      return res.status(404).json({
        message: 'This user is unavailable. Please try again!',
      });
    }

    return res.json({
      message: 'User has been logged in successfully',
      access_token: sign({ id: getOneAdmin.id }),
    });
  },
};
