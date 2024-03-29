import { useEffect, useState, useContext } from "react";
import BirthdayListItem from "../BirthdayListItem";
import { UserContext } from "../../context/UserContext";

const birthdayEndpoint = process.env.REACT_APP_SERVER_URL + "/birthdays/";

const BirthdayList = (props) => {
	const { user, setUser } = useContext(UserContext);
	const [birthdays, setBirthdays] = useState(null);

	const fetchBirthdays = async () => {
		//Need to also handle loading states
		//And errors, etc
		fetch(birthdayEndpoint + user.userId)
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
					<BirthdayListItem key={bday._id} birthday={bday} />
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
