import Joi from "joi";

export const singupChema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "name không được để trống",
    "any.required": "Trường 'name'là trường bắt buộc"
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "email không được để trống",
    "any.required": "Trường 'email'là trường bắt buộc"
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "password không được để trống",
    "any.required": "Trường 'password'là trường bắt buộc",
    "string.min": "password phải có ít nhất {#limit} ký tự"
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).when("password", {
    is: Joi.exist(),
    then: Joi.string().required().messages({
      "string.empty": "confirmPassword không được để trống",
      "any.required": "Trường 'confirmPassword' là trường bắt buộc",
      "any.only": "Mật khẩu không khớp"
    }),
    otherwise: Joi.forbidden().messages({
      "any.unknown": "Không tồn tại trường 'password'"
    })
  })
});

export const singinChema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email không được để trống",
    "any.required": 'Trường "Email" là bắt buộc',
    "string.email": "Email không đúng định dạng"
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Mật khẩu không được để trống",
    "any.required": "Trường 'Password'là trường bắt buộc",
    "string.min": "Mật khẩu phải có ít nhất {#limit} ký tự"
  })
});
