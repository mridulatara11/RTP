async function checkUrl() {
	const url = document.getElementById("urlInput").value;
	if (!url) {
		alert("Please enter a URL.");
		return;
	}

	try {
		const response = await fetch(
			"http://localhost:3000/check-url",
			{
				method: "POST",
				body: JSON.stringify({ url: url }),
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error(
				`HTTP error! status: ${response.status}`
			);
		}

		const data = await response.json();
		console.log("API Response:", data);

		const resultDiv = document.getElementById("result");
		if (data.positives > 0) {
			resultDiv.innerHTML = `<p style="color: red;">The URL is malicious! Detected by ${data.positives} out of ${data.total} engines.</p>`;
		} else {
			resultDiv.innerHTML = `<p style="color: green;">The URL is safe.</p>`;
		}
	} catch (error) {
		console.error("Error:", error);
		document.getElementById(
			"result"
		).innerHTML = `<p style="color: red;">Error checking the URL.</p>`;
	}
}
