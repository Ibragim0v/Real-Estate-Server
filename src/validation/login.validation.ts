import joi from 'joi';

export const loginValidation = joi.object().keys({
  username: joi.string().required().max(64),
  password: joi.string().required().max(64),
});
