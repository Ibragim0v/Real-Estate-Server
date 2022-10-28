import joi from 'joi';

export const roomsPostFilter = joi.object().keys({
  rooms: joi.number().required(),
  square: joi.number().required(),
  complex: joi.string().required().uuid({
    version: 'uuidv4',
  }),
});

export const roomsPutFilter = joi.object().keys({
  rooms: joi.number(),
  square: joi.number(),
});
