import React from "react";
import { useState, useId } from "react";
import styles from "./birthdayForm.module.scss";
import InputRow from "./InputRow";

const BirthdayForm = (props) => {
	const id = useId();

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
		};

		props.onSubmit(newBirthday);
		resetForm();
	};

	const cancelFormHandler = (e) => {
		resetForm();
		props.onCancel?.();
	};

	const resetForm = () => {
		setName("");
		setMonth("");
		setDay("");
		setMessage("");
	};

	return (
		<div>
			<form className={styles.form} onSubmit={birthdayFormSubmitHandler}>
				<InputRow labelMessage="Name" labelFor={`name_${id}`}>
					<input
						type="text"
						id={`name_${id}`}
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
							<label htmlFor={`month_${id}`} className="srOnly">
								Month
							</label>
							<select
								onChange={(e) => setMonth(e.target.value)}
								id={`month_${id}`}
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

							<label htmlFor={`day_${id}`} className="srOnly">
								Day
							</label>
							<select
								onChange={(e) => setDay(e.target.value)}
								id={`day_${id}`}
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

				<InputRow labelFor={`message_${id}`} labelMessage="Custom message">
					<textarea
						id={`message_${id}`}
						name="message"
						value={message}
						placeholder="Message"
						onChange={(e) => setMessage(e.target.value)}
					/>
				</InputRow>

				<button className={`${styles.button} ${styles.submit}`} type="submit">
					Submit
				</button>
				<button
					className={`${styles.button} ${styles.cancel}`}
					type="button"
					onClick={cancelFormHandler}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};

export default BirthdayForm;
