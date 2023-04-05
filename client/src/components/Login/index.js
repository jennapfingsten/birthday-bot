import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import InputRow from "../BirthdayForm/InputRow";
import styles from "./login.module.scss";

const loginEndpoint = process.env.REACT_APP_SERVER_URL + "/login";

const Login = () => {
	const { user, setUser } = useContext(UserContext);
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [showError, setShowError] = useState(false);

	const loginHandler = (loggedInUser) => {
		setUser(loggedInUser);
		localStorage.setItem("user", JSON.stringify(loggedInUser));
	};

	const logoutHandler = () => {
		setUser(null);
		localStorage.removeItem("user");
	};

	const submitFormHandler = (e) => {
		e.preventDefault();

		const loginInfo = { username: username, password: password };

		fetch(loginEndpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(loginInfo),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response.userId) {
					loginHandler(response);
					setShowError(false);
					setUserName("");
					setPassword("");
				} else {
					setShowError(true);
				}
			});
	};

	return (
		<div className={styles.login}>
			{!user && (
				<form>
					<InputRow>
						<input
							type="text"
							name="username"
							value={username}
							placeholder="Username"
							onChange={(e) => setUserName(e.target.value)}
						/>
					</InputRow>
					<InputRow>
						<input
							type="password"
							name="password"
							value={password}
							placeholder="Password"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</InputRow>
					<button onClick={submitFormHandler}>Login</button>
					{showError && <p style={{ color: "red" }}>Please try again</p>}
				</form>
			)}

			{user && <button onClick={logoutHandler}>Log out</button>}
		</div>
	);
};

export default Login;
