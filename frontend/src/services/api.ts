import axios from "axios";

export async function createShortUrl(longUrl: string) {
	const response = await axios.post("/api/urls/shorten", {
		originalUrl: longUrl,
	});
	return response.data;
}

export async function getUrls() {
	const response = await axios.get("/api/urls");
	return response.data;
}

export async function updateUrl(id: string, updatedUrl: string) {
	const response = await axios.patch(`/api/urls/${id}`, {
		originalUrl: updatedUrl,
	});
	return response.data;
}

export async function deleteUrl(id: string) {
	const response = await axios.delete(`/api/urls/${id}`);
	return response.data;
}
