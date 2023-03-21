import React from "react";
import { useEffect } from "react";
import "./App.css";

//TODO: switch between these
const prodUrl = "https://api.birthdaybot.dev/api";
const devUrl = "http://localhost:3001/api";

function App() {
	const [data, setData] = React.useState(null);

	useEffect(() => {
		fetch(prodUrl)
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
