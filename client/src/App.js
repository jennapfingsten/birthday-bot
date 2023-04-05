import "./App.scss";
import { useState, useEffect } from "react";
import NewBirthday from "./components/NewBirthday";
import BirthdayList from "./components/BirthdayList";
import Card from "./components/Shared/Card";
import Login from "./components/Login";
import { UserContext } from "./context/UserContext";

function App() {
	const [refreshList, setRefreshList] = useState("");
	const [user, setUser] = useState(null);

	const forceListToRefresh = () => {
		setRefreshList(Math.random());
	};

	useEffect(() => {
		if (localStorage.birthdayUser != null) {
			setUser(JSON.parse(localStorage.birthdayUser));
		}
	}, [setUser]);

	return (
		<div className="App">
			<header>
				<h1>Groupme Birthday Bot</h1>
			</header>
			<main>
				<UserContext.Provider value={{ user, setUser }}>
					<Login />

					<Card>
						<NewBirthday onFormSubmit={forceListToRefresh} />
					</Card>
					<Card>
						<BirthdayList refresh={refreshList} />
					</Card>
				</UserContext.Provider>
			</main>
		</div>
	);
}

export default App;
