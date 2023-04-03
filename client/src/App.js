import "./App.scss";
import { useState } from "react";
import NewBirthday from "./components/NewBirthday";
import BirthdayList from "./components/BirthdayList";
import Card from "./components/Shared/Card";

function App() {
	const [refreshList, setRefreshList] = useState("");

	const forceListToRefresh = () => {
		setRefreshList(Math.random());
	};

	return (
		<div className="App">
			<header>
				<h1>Groupme Birthday Bot</h1>
			</header>
			<main>
				<Card>
					<NewBirthday onFormSubmit={forceListToRefresh} />
				</Card>
				<Card>
					<BirthdayList refresh={refreshList} />
				</Card>
			</main>
		</div>
	);
}

export default App;
