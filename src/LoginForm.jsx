import { use, useEffect, useState } from "react";

function LoginForm() {
	const loadFromStorage = () => {
		if (localStorage.getItem("loginFormData")) {
			const savedData = localStorage.getItem("loginFormData");
			return JSON.parse(savedData);
		}
		return { login: "", email: "", password: "" };
	};
	const [info, setInfo] = useState(loadFromStorage);

	const handleInfo = (key, value) => {
		setInfo({ ...info, [key]: value });
	};

	const handleSave = () => {
		localStorage.setItem("loginFormData", JSON.stringify(info));
	};

	const isValidLogin = new RegExp("^[A-Z][A-Za-zd]{5,}$").test(info.login);

	const isValidEmail = new RegExp(
		"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"
	).test(info.email);

	const isValidPassword = new RegExp(
		"^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"
	).test(info.password);

	return (
		<div>
			<label htmlFor="login_id">Login</label>
			<input
				value={info.login}
				type="text"
				name="login"
				id="login_id"
				onChange={(e) => handleInfo("login", e.target.value)}
			/>
			<label htmlFor="email_id">Email</label>
			{!isValidLogin && (
				<div>
					Must be at least 6 characters <br /> Starts with a capital letter
				</div>
			)}
			<input
				value={info.email}
				type="email"
				name="email"
				id="email_id"
				onChange={(e) => handleInfo("email", e.target.value)}
			/>
			{!isValidEmail && <div>Wrong Email</div>}

			<label htmlFor="password_id">Password</label>
			<input
				value={info.password}
				type="password"
				onChange={(e) => handleInfo("password", e.target.value)}
			/>
			{!isValidPassword && (
				<div>
					At least 8 characters <br />
					At least one lowercase letter <br />
					At least one uppercase letter <br />
					At least one number <br /> At least one special character
				</div>
			)}
			{console.log(isValidPassword, info.password)}
			<button
				type="submit"
				disabled={!(isValidEmail && !isValidLogin)}
				onClick={handleSave}>
				Submit
			</button>
		</div>
	);
}

export default LoginForm;
