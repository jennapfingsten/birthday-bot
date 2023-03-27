import "./App.css";
import { useState } from "react";
import BirthdayForm from "./components/BirthdayForm";
import BirthdayList from "./components/BirthdayList";

//The fetchResponse and sendTodayHandler is only for demo purposes

const sendEndpoint = process.env.REACT_APP_SERVER_URL + "/messages";

function App() {
	const [fetchResponse, setFetchResponse] = useState("");

	const sendTodayHandler = () => {
		fetch(sendEndpoint, {
			method: "POST",
		})
			.then((response) => response.json())
			.then((response) => setFetchResponse(response.message));
	};

	return (
		<div className="App">
			<header className="App-header">
				<button onClick={sendTodayHandler}>Send messages for today!</button>
				{fetchResponse && <p>{fetchResponse}</p>}
				<BirthdayForm />
				<BirthdayList />
			</header>
		</div>
	);
}

export default App;
