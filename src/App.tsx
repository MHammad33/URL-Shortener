import { UrlForm } from "@/components/UrlForm";

function App() {
	const handleUrlSubmit = (url: string) => {
		console.log("Shorten URL:", url);
		// Here, you can call the API to create the short URL
	};

	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold underline">URL Shortener</h1>
			<UrlForm onSubmit={handleUrlSubmit} />
		</div>
	);
}

export default App;
