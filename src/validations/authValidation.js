import Joi from "joi";

export const loginSchema = Joi.object({
	email: Joi.string().trim().email({ tlds: false }).required().messages({
		"string.empty": "Email is required",
		"string.email": "Enter a valid email",
	}),

	password: Joi.string().trim().min(6).required().messages({
		"string.empty": "Password is required",
		"string.min": "Password must be at least 6 characters",
	}),
});
