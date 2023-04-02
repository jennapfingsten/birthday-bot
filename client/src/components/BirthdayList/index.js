import { useEffect, useState } from "react";

const birthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays";

const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const BirthdayList = (props) => {
	const [birthdays, setBirthdays] = useState(null);

	const fetchBirthdays = async () => {
		//Need to also handle loading states
		//And errors, etc
		fetch(birthdayEndpoint)
			.then((res) => res.json())
			.then((data) => {
				setBirthdays(data);
			});
	};

	useEffect(() => {
		fetchBirthdays();
	}, [props.refresh]);

	let fetchedBirthdayContent = <p>Loading...</p>;
	if (birthdays) {
		fetchedBirthdayContent = (
			<div>
				{birthdays.map((bday) => (
					<p key={bday._id}>
						{bday.name}, {months[bday.month - 1]} {bday.day}
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
