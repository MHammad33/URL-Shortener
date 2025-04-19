import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { UrlForm } from "@/components/UrlForm";
import { UrlList } from "@/components/UrlList";
import { createShortUrl, getUrls } from "@/services/api";

export default function Home() {
	const [urls, setUrls] = useState<any[]>([]);
	const [loading, setLoading] = useState(false);

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
		} catch (error) {
			console.error("Error creating short URL:", error);
		}
	};

	return (
		<Layout>
			<UrlForm onSubmit={handleUrlSubmit} />
			{loading ? <div>Loading...</div> : <UrlList urls={urls} />}
		</Layout>
	);
}
