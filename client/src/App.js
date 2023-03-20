import React from "react";
import { useEffect } from "react";
import "./App.css";

function App() {
	const [data, setData] = React.useState(null);

	useEffect(() => {
		fetch("birthdaybot.dev/api")
			.then((res) => res.json())
			.then((data) => setData(data.message));
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<p>{!data ? "Loading..." : data}</p>
			</header>
		</div>
	);
}

export default App;
