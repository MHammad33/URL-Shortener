import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function UrlForm({ onSubmit }: { onSubmit: (url: string) => void }) {
	const [url, setUrl] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (url) {
			onSubmit(url);
			setUrl("");
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Input
				type="url"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				placeholder="Enter a long URL"
				className="w-full"
			/>
			<Button type="submit" className="w-full">
				Shorten URL
			</Button>
		</form>
	);
}
