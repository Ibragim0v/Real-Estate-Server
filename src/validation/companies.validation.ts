import joi from 'joi';

export const companiesPostFilter = joi.object().keys({
  name: joi.string().required().max(64),
  img_url: joi.string().required(),
});

export const companiesPutFilter = joi.object().keys({
  name: joi.string().max(64),
  img_url: joi.string(),
});
