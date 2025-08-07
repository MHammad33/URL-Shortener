import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UrlItem } from "@/types/url.types";

interface EditFormProps {
	url: UrlItem;
	onSave: (id: string, updatedUrl: string) => void;
	onCancel: () => void;
}

export function EditForm({ url, onSave, onCancel }: EditFormProps) {
	const [newUrl, setNewUrl] = useState<string>(url.originalUrl);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(url.id, newUrl);
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label
					htmlFor="url"
					className="text-sm font-medium text-muted-foreground"
				>
					Original URL
				</label>
				<input
					type="url"
					id="url"
					value={newUrl}
					onChange={(e) => setNewUrl(e.target.value)}
					className="w-full px-4 py-2 border rounded-lg bg-card"
					required
				/>
			</div>

			<div className="flex gap-2 justify-end">
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit" variant="default">
					Save Changes
				</Button>
			</div>
		</form>
	);
}
