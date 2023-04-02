import React from "react";
import { useState } from "react";
import styles from "./birthdayForm.module.scss";
import InputRow from "./Input";

const botId = "64209ad754a343796fe56235"; //Placeholder. This is a dummy botId for testing. This will move to the app state later
const birthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays";

const BirthdayForm = (props) => {
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
			.then((response) => {
				resetForm();
			});
	};

	const resetForm = () => {
		setName("");
		setMonth("");
		setDay("");
		setMessage("");
		props.onFormSubmit();
	};

	return (
		<div>
			<h1>Enter in a birthday!</h1>

			<form className={styles.form} onSubmit={birthdayFormSubmitHandler}>
				<InputRow labelMessage="Name" labelFor="name">
					<input
						type="text"
						id="name"
						name="name"
						value={name}
						placeholder="First Name"
						onChange={(e) => setName(e.target.value)}
						style={{ height: "30px", width: "200px" }}
					/>
				</InputRow>

				<InputRow>
					<fieldset>
						<legend>Birthday</legend>

						<div className={styles.fieldsetRow}>
							<label htmlFor="month" className="srOnly">
								Month
							</label>
							<select
								onChange={(e) => setMonth(e.target.value)}
								id="month"
								value={month}
							>
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

							<label htmlFor="day" className="srOnly">
								Day
							</label>
							<select
								onChange={(e) => setDay(e.target.value)}
								id="day"
								value={day}
							>
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
						</div>
					</fieldset>
				</InputRow>

				{/* <InputRow
					label="Custom Message (optional)"
					type="text"
					id="message"
					name="message"
					value={message}
					placeholder="Message"
					onChange={(e) => setMessage(e.target.value)}
				/> */}
				<InputRow labelFor="message" labelMessage="Custom message">
					<textarea
						id="message"
						name="message"
						value={message}
						placeholder="Message"
						onChange={(e) => setMessage(e.target.value)}
					/>
				</InputRow>

				<button className={styles.submitBtn} type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default BirthdayForm;
