const path = require("path");
const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors());

// Handle GET requests to /api route
app.get("/api", (req, res) => {
	res.json({ message: "Hello from server!" });
});

// All other GET requests not handled before will return a basic page
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../server", "index.html"));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
