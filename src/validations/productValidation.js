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


	// temporary solution
	image: Joi.string()
	.allow("")
	.custom((value, helpers) => {
		if (!value) return value;

		//  currently allow full URLs
		const isHttpUrl = /^https?:\/\/.+/i.test(value);

		// allow firebase-style paths like:
		// products/img13-pinapple-mattress.webp
		// img13-pinapple-mattress.webp
		const isFirebasePath = /^[a-zA-Z0-9-_\/]+\.(jpg|jpeg|png|webp|gif)$/i.test(value);

		if (isHttpUrl || isFirebasePath) {
			return value;
		}

		return helpers.error("any.invalid");
	})
	.messages({
		"any.invalid":
			"Image must be a valid URL or the storage file name",
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