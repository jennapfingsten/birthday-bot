import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import BirthdayForm from "../BirthdayForm";

const botId = "64209ad754a343796fe56235"; //Placeholder. This is a dummy botId for testing. This will move to the app state later
const birthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays";

const NewBirthday = (props) => {
	const { user } = useContext(UserContext);

	const createNewBirthday = (newBirthday) => {
		newBirthday.bot = botId;

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
