import Joi from "joi";

export const productSchema = Joi.object({
	name: Joi.string().min(2).required().messages({
		"string.empty": "Name is required",
		"string.min": "Name must be at least 2 characters",
	}),

	price: Joi.number().positive().required().messages({
		"number.base": "Price must be a number",
		"number.positive": "Price must be greater than 0",
		"any.required": "Price is required",
	}),

	category: Joi.string().min(2).required().messages({
		"string.empty": "Category is required",
		"string.min": "Category must be at least 2 characters",
	}),

	image: Joi.string().uri().allow("").messages({
		"string.uri": "Image must be a valid URL",
	}),

	details: Joi.string().allow(""),

	stock: Joi.number().integer().min(0).messages({
		"number.base": "Stock must be a number",
		"number.min": "Stock cannot be negative",
	}),

	featured: Joi.boolean(),

	rating: Joi.number().min(0).max(5).messages({
		"number.base": "Rating must be a number",
		"number.min": "Rating must be at least 0",
		"number.max": "Rating cannot exceed 5",
	}),
});