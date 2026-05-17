import { useState, useRef } from "react";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router";
import { Link } from 'react-router'
import { loginSchema } from "../validations/authValidation";

const Login = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	// messages under inputs
	const [errors, setErrors] = useState("");

	// Form validation using Joi schema
	const [serverError, setServerError] = useState("");

	const [shake, setShake] = useState(false);
	// use ref to focus on the field when page reloads
	const emailRef = useRef(null); // cursor inside email input
	const passwordRef = useRef(null);

	const handleChange = (e) => {
		const { name, value } = e.target;

		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		// stop the form from submitting defaut behaviour too early
		e.preventDefault();

		setServerError("");

		// run validation only on submit
		const { error } = loginSchema.validate(formData, {
			// to get all errors at once
			abortEarly: false,
		});

		if (error) {
			const validationErrors = {};

			error.details.forEach((err) => {
				validationErrors[err.path[0]] = err.message;
			});

			setErrors(validationErrors);
			// shake animation
			setShake(true);
			setTimeout(() => setShake(false), 250);

			// auto focus logic
			const firstErrorField = error.details[0].path[0];

			if (firstErrorField === "email") {
				emailRef.current?.focus();
			} else if (firstErrorField === "password") {
				passwordRef.current?.focus();
			}
			return;
		}

		// clear old errors if valid
		setErrors({});

		try {
			await loginUser(formData.email.trim(), formData.password.trim());

			navigate("/admin");
		} catch (error) {
			setServerError("Wrong email or password");
			console.error(error);
		}
	};

	return (
		<div className="login-page">
			<h2>Admin Login</h2>

			<div>
				<form
					className={`login-controls ${shake ? "form-shake" : ""}`}
					onSubmit={handleSubmit}
				>
					<div>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={formData.email}
							onChange={handleChange}
						/>

						{errors.email && (
							<p className="error-message">{errors.email}</p>
						)}
					</div>

					<div>
						<input
							type="password"
							name="password"
							placeholder="Password"
							value={formData.password}
							onChange={handleChange}
						/>

						{errors.password && (
							<p className="error-message">{errors.password}</p>
						)}
					</div>

					<button className="login-submit" type="submit">
						Log in
					</button>

					<Link className="link-go-back" to="/products">
						Back to products
					</Link>
				</form>

				{serverError && <p className="error-message">{serverError}</p>}
			</div>
		</div>
	);
};

export default Login;
