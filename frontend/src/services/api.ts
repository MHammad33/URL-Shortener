import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function createShortUrl(longUrl: string) {
	const response = await axios.post(`${baseUrl}/api/urls/shorten`, {
		originalUrl: longUrl,
	});
	return response.data;
}

export async function getUrls() {
	const response = await axios.get(`${baseUrl}/api/urls`);
	return response.data;
}

export async function updateUrl(id: string, updatedUrl: string) {
	const response = await axios.patch(`${baseUrl}/api/urls/${id}`, {
		newOriginalUrl: updatedUrl,
	});
	return response.data;
}

export async function deleteUrl(id: string) {
	const response = await axios.delete(`${baseUrl}/api/urls/${id}`);
	return response.data;
}
