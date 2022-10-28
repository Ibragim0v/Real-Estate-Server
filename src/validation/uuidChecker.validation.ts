import joi from 'joi';

export const uuidChecker = joi.object().keys({
  id: joi
    .string()
    .uuid({
      version: 'uuidv4',
    })
    .required(),
});
