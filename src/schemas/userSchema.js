//* Libraries
import Joi from "@hapi/joi"

export const UserSchema = Joi.object({
    name: Joi.string().invalid("").required(),
    email: Joi.string().email().required(),
    password: Joi.string().invalid("").required()
})

export const TransactionSchema = Joi.object({
    date: Joi.string().min(10).required(),
    descrption: Joi.string().min(1).required(),
    type: Joi.string().valid("entry", "output").required(),
    value: Joi.number().invalid(0).required()
})
