import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { validateUrl } from "@/utils/validators";

interface UrlFormProps {
	onSubmit: (url: string) => void;
}

export function UrlForm({ onSubmit }: UrlFormProps) {
	const [url, setUrl] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateUrl(url)) {
			setError("Please enter a valid URL.");
			return;
		}

		setError("");
		onSubmit(url);
		setUrl("");
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-2xl mx-auto bg-card border rounded-2xl shadow-sm p-6 md:p-8 space-y-4"
		>
			<h2 className="text-2xl font-bold text-center text-primary tracking-tight">
				🔗 Shorten Your URL
			</h2>

			<div className="flex flex-col md:flex-row gap-3">
				<Input
					type="url"
					placeholder="https://example.com"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="flex-1"
				/>
				<Button type="submit" className="w-full md:w-auto cursor-pointer">
					Shorten
				</Button>
			</div>

			{error && <p className="text-sm text-destructive text-center">{error}</p>}
		</form>
	);
}
