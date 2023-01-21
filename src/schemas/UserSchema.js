//* Libraries
import Joi from "@hapi/joi"

export const UserCreationSchema = Joi.object({
    name: Joi.string().invalid("").required(),
    email: Joi.string().email().required(),
    password: Joi.string().invalid("").required()
})

export const UserLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().invalid("").required(),
})

export const UserUpdateSchema = Joi.object({
    name: Joi.string().invalid(""),
    email: Joi.string().email(),
    password: Joi.string().invalid("")
})