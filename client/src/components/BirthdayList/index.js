import { useEffect, useState } from "react";

const birthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays";

const BirthdayList = () => {
	const [birthdays, setBirthdays] = useState(null);

	const fetchBirthdays = async () => {
		//Need to also handle loading states
		//And errors, etc
		fetch(birthdayEndpoint)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setBirthdays(data);
			});
	};

	useEffect(() => {
		fetchBirthdays();
	}, []);

	let fetchedBirthdayContent = <p>Loading...</p>;
	if (birthdays) {
		fetchedBirthdayContent = (
			<div>
				{birthdays.map((bday) => (
					<p key={bday._id}>
						{bday.name}, {bday.month + 1}-{bday.day}
					</p>
				))}
			</div>
		);
	}

	return (
		<div>
			<h2>Your birthdays:</h2>
			{fetchedBirthdayContent}
		</div>
	);
};

export default BirthdayList;
