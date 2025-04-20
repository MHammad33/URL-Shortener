import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { UrlForm } from "@/components/UrlForm";
import { UrlList } from "@/components/UrlList";
import { createShortUrl, deleteUrl, getUrls } from "@/services/api";
import { UrlItem } from "@/types/url.types";

export default function Home() {
	const [urls, setUrls] = useState<UrlItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	useEffect(() => {
		async function fetchUrls() {
			setLoading(true);
			try {
				const data = await getUrls();
				setUrls(data);
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

	const handleDeleteUrl = async (urlId: string) => {
		try {
			await deleteUrl(urlId);
			setUrls((prev) => prev.filter((url) => url.id !== urlId));
			setMessage("URL deleted successfully.");
		} catch (error) {
			console.error("Error deleting URL:", error);
			setMessage("Failed to delete URL.");
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
				<UrlList urls={urls} onEdit={() => {}} onDelete={handleDeleteUrl} />
			)}
		</Layout>
	);
}
