import "./App.css";
import { useState } from "react";
import BirthdayForm from "./components/BirthdayForm";
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
					<BirthdayForm onFormSubmit={forceListToRefresh} />
				</Card>
				<Card>
					<BirthdayList refresh={refreshList} />
				</Card>
			</main>
		</div>
	);
}

export default App;
