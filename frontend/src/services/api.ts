export async function createShortUrl(longUrl: string) {
	const response = await fetch("/api/shorten", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ longUrl }),
	});
	if (!response.ok) throw new Error("Failed to shorten URL");
	return response.json();
}

export async function getUrls() {
	const response = await fetch("/api/urls");
	if (!response.ok) throw new Error("Failed to fetch URLs");
	return response.json();
}
