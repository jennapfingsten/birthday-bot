import React from "react";

import { useState } from "react";

const botId = "64209ad754a343796fe56235"; //Placeholder. This is a dummy botId for testing. This will move to the app state later
const birthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays";

const NewBirthday = () => {
	const [name, setName] = useState("");
	const [message, setMessage] = useState("");
	const [month, setMonth] = useState("");
	const [day, setDay] = useState("");

	const birthdayFormSubmitHandler = (e) => {
		e.preventDefault();
		//validate name + message

		const newBirthday = {
			name: name,
			month: month,
			day: day,
			message: message,
			bot: botId,
		};

		fetch(birthdayEndpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newBirthday),
		})
			.then((response) => response.json())
			.then((response) => console.log(response));
	};

	return (
		<div>
			<h1>Enter in a birthday!</h1>
			<form onSubmit={birthdayFormSubmitHandler}>
				<label>
					First Name
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>

				<br />

				<label>
					Custom message (optional)
					<input
						type="text"
						id="message"
						name="message"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						required={false}
					/>
				</label>

				<br />

				<label>
					Birthday
					<select onChange={(e) => setMonth(e.target.value)} defaultValue="">
						<option value="" disabled>
							Month
						</option>
						<option value="1">January</option>
						<option value="2">February</option>
						<option value="3">March</option>
						<option value="4">April</option>
						<option value="5">May</option>
						<option value="6">June</option>
						<option value="7">July</option>
						<option value="8">August</option>
						<option value="9">September</option>
						<option value="10">October</option>
						<option value="11">November</option>
						<option value="12">December</option>
					</select>
					<select onChange={(e) => setDay(e.target.value)} defaultValue="">
						<option value="" disabled>
							Day
						</option>
						{[...Array(31)].map((e, i) => {
							return (
								<option key={i} value={i + 1}>
									{i + 1}
								</option>
							);
						})}
					</select>
				</label>

				<br />

				<button>Submit</button>
			</form>
		</div>
	);
};

export default NewBirthday;
