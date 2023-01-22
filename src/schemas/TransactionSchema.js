//* Libraries
import Joi from "@hapi/joi"

export const TransactionSchema = Joi.object({
    date: Joi.string().min(10).required(), //! Minimum of 10, because of DD/MM/YYYY format
    description: Joi.string().min(1).required(),
    type: Joi.string().valid("entry", "output").required(),
    value: Joi.number().invalid(0).required()
})

export const TransactionPutSchema = Joi.object({
    updatedDate: Joi.array(), //! Minimum of 10, because of DD/MM/YYYY format
    description: Joi.string().min(1),
    value: Joi.number().invalid(0),
})