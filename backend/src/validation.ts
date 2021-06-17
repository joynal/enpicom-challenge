import { celebrate, Joi, Segments } from 'celebrate';

const sequenceValidation = Joi.string().regex(/^[ACTG]+$/);

export const create = celebrate({
  [Segments.BODY]: Joi.object().keys({
    sequence: sequenceValidation.required(),
  }),
});

export const search = celebrate({
  [Segments.QUERY]: Joi.object().keys({
    sequence: Joi.when('fuzzyness', {
      is: Joi.exist(),
      then: sequenceValidation.required(),
      otherwise: sequenceValidation,
    }),
    fuzzyness: Joi.number(),
  }),
});
