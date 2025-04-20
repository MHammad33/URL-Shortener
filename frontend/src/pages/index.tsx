import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { UrlForm } from "@/components/UrlForm";
import { UrlList } from "@/components/UrlList";
import { createShortUrl, getUrls } from "@/services/api";
import { UrlItem } from "@/types/url.types";

const testUrls = [
	{
		id: "1",
		url: "https://www.example.com/some/long/url",
		shortCode: "abc123",
		createdAt: "2021-09-01T12:00:00Z",
		updatedAt: "2021-09-01T12:00:00Z",
		accessCount: 10,
	},
	{
		id: "2",
		url: "https://www.anotherexample.com/longer/url/with/params?query=123&value=test",
		shortCode: "xyz456",
		createdAt: "2021-10-12T09:30:00Z",
		updatedAt: "2021-10-12T09:30:00Z",
		accessCount: 25,
	},
	{
		id: "3",
		url: "https://www.yetanotherexample.com/very/long/url/path/to/content",
		shortCode: "def789",
		createdAt: "2022-01-22T15:00:00Z",
		updatedAt: "2022-01-22T15:00:00Z",
		accessCount: 42,
	},
	{
		id: "4",
		url: "https://www.shorturl.com/example/path",
		shortCode: "ghi101",
		createdAt: "2022-03-15T11:00:00Z",
		updatedAt: "2022-03-15T11:00:00Z",
		accessCount: 56,
	},
	{
		id: "5",
		url: "https://www.longwebsite.com/articles/technology/understanding-url-shortening",
		shortCode: "jkl112",
		createdAt: "2022-06-10T08:45:00Z",
		updatedAt: "2022-06-10T08:45:00Z",
		accessCount: 15,
	},
];

export default function Home() {
	const [urls, setUrls] = useState<UrlItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUrls() {
			setLoading(true);
			const delay = (ms: number) =>
				new Promise((resolve) => setTimeout(resolve, ms));

			try {
				await delay(3000);
				// const data = await getUrls();
				// setUrls(data);
				setUrls(testUrls);
			} catch (error) {
				console.error("Error fetching URLs:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchUrls();
	}, []);

	const handleUrlSubmit = async (url: string) => {
		try {
			const newUrl = await createShortUrl(url);
			setUrls((prevUrls) => [...prevUrls, newUrl]);
			setMessage("URL successfully shortened!");
		} catch (error) {
			console.error("Error creating short URL:", error);
			setMessage("Failed to shorten URL. Please try again.");
		}
	};

	return (
		<Layout>
			<UrlForm onSubmit={handleUrlSubmit} />
			{message && <div className="mt-4 text-center">{message}</div>}
			{loading ? (
				<div className="text-center">
					<span>Loading...</span>
				</div>
			) : (
				<UrlList urls={urls} onEdit={() => {}} onDelete={() => {}} />
			)}
		</Layout>
	);
}
