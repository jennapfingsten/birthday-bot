import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import BirthdayForm from "../BirthdayForm";

const birthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays";

const NewBirthday = (props) => {
	const { user } = useContext(UserContext);

	const createNewBirthday = (newBirthday) => {
		newBirthday.user = user.userId;

		fetch(birthdayEndpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newBirthday),
		})
			.then((response) => response.json())
			.then((response) => {
				props.onFormSubmit();
			});
	};

	return (
		<div>
			<h1>Enter in a birthday!</h1>
			{user && <p>Welcome back, {user.name}!</p>}
			<BirthdayForm onSubmit={createNewBirthday} />
		</div>
	);
};

export default NewBirthday;
