import joi from 'joi';

export const complexesPostFilter = joi.object().keys({
  name: joi.string().required().max(64),
  address: joi.string().required().max(64),
  price: joi.number().required().max(2147483647), // price of a square
  company: joi.string().required().uuid({
    version: 'uuidv4',
  }),
});

export const complexesPutFilter = joi.object().keys({
  name: joi.string().max(64),
  address: joi.string().max(64),
  price: joi.number().max(2147483647),
});
