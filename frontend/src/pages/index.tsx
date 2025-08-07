import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { UrlForm } from "@/components/UrlForm";
import { UrlList } from "@/components/UrlList";
import { createShortUrl, deleteUrl, getUrls, updateUrl } from "@/services/api";
import { UrlItem } from "@/types/url.types";
import { toast } from "sonner";

export default function Home() {
	const [urls, setUrls] = useState<UrlItem[]>([]);
	const [loading, setLoading] = useState(false);
	const [message] = useState<string | null>(null);

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
			toast.success("URL successfully shortened!");
		} catch (error) {
			console.error("Error creating short URL:", error);
			toast.error("Failed to shorten URL. Please try again.");
		}
	};

	const handleDeleteUrl = async (urlId: string) => {
		try {
			await deleteUrl(urlId);
			setUrls((prev) => prev.filter((url) => url.id !== urlId));
			toast.success("URL deleted successfully.");
		} catch (error) {
			console.error("Error deleting URL:", error);
			toast.error("Failed to delete URL.");
		}
	};

	const handleEditUrl = async (id: string, updatedUrl: string) => {
		try {
			const updated = await updateUrl(id, updatedUrl);
			setUrls((prevUrls) =>
				prevUrls.map((url) =>
					url.id === id ? { ...url, originalUrl: updated.originalUrl } : url
				)
			);
			toast.success("URL updated successfully!");
		} catch (error) {
			console.error("Error updating URL:", error);
			toast.error("Failed to update URL.");
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
				<UrlList
					urls={urls}
					onEdit={handleEditUrl}
					onDelete={handleDeleteUrl}
				/>
			)}
		</Layout>
	);
}
