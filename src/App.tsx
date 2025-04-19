import { UrlForm } from "@/components/UrlForm";
import { Layout } from "./components/Layout";

function App() {
	const handleUrlSubmit = (url: string) => {
		console.log("Shorten URL:", url);
		// Here, you can call the API to create the short URL
	};

	return (
		<Layout>
			<UrlForm onSubmit={handleUrlSubmit} />
		</Layout>
	);
}

export default App;
