import joi from 'joi';

export const mortageFilter = joi.object().keys({
  price: joi.number().required(),
  square: joi.number().required(),
  duration: joi.number().required(),
});
