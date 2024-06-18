import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
const port = 3000;
const apiKey =
	"db61d7ef17028f23a5a9cdb435c93198c9c1c0a8d6e9f31971641dd48ae3fbd9";

app.use(cors());
app.use(express.json());

app.post("/check-url", async (req, res) => {
	const url = req.body?.url;

	const requestBody = {
		apikey: apiKey,
		resource: url,
	};

	try {
		const response = await fetch(
			"https://www.virustotal.com/vtapi/v2/url/report",
			{
				method: "POST",
				body: new URLSearchParams(requestBody),
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`HTTP error! status: ${response.status}`
			);
		}

		const data = await response.json();
		res.json(data);
	} catch (error) {
		console.error("Error:", error);
		res.status(500).json({ error: "Error checking the URL" });
	}
});

app.listen(port, () => {
	console.log(
		`Proxy server listening at http://localhost:${port}`
	);
});
