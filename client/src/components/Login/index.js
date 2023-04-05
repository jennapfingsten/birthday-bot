import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const defaultUser = {
	name: "Jenna",
	botId: "1234",
};

const Login = () => {
	const { user, setUser } = useContext(UserContext);

	const loginClickHandler = () => {
		//TODO: async call to actually get the user

		setUser(defaultUser);
		localStorage.setItem("birthdayUser", JSON.stringify(defaultUser));
	};

	const logoutHandler = () => {
		setUser(null);
		localStorage.removeItem("birthdayUser");
	};

	return (
		<div>
			<button onClick={loginClickHandler}>Log in</button>
			<br />
			<button onClick={logoutHandler}>Log out</button>
		</div>
	);
};

export default Login;
