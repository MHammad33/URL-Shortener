import { useState } from "react";
import { Button } from "@/components/ui/button";
import { EditForm } from "./EditForm";
import { UrlItem } from "@/types/url.types";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"; // Assuming ShadCN has Table components

interface UrlListProps {
	urls: UrlItem[];
	onDelete: (id: string) => void;
	onEdit: (url: UrlItem) => void;
}

const baseUrl = "http://localhost:5173"; // Or move to .env later

export function UrlList({ urls, onDelete, onEdit }: UrlListProps) {
	const [editingUrl, setEditingUrl] = useState<UrlItem | null>(null);

	const handleEdit = (url: UrlItem) => {
		setEditingUrl(url); // Set the selected URL to edit
	};

	const handleSave = (updatedUrl: UrlItem) => {
		console.log("Saving updated URL", updatedUrl);
		setEditingUrl(null); // Close the form after saving
	};

	const handleCancel = () => {
		setEditingUrl(null); // Close the form if cancel is clicked
	};

	if (editingUrl) {
		return (
			<div className="max-w-2xl mx-auto mt-8">
				<EditForm
					url={editingUrl}
					onSave={handleSave}
					onCancel={handleCancel}
				/>
			</div>
		);
	}

	if (!urls.length) {
		return (
			<p className="text-muted-foreground text-center mt-8">
				No URLs shortened yet.
			</p>
		);
	}

	return (
		<div className="w-full max-w-7xl mx-auto mt-8">
			<Table className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md">
				<TableHeader className="text-gray-500">
					<TableRow>
						<TableHead>Original URL</TableHead>
						<TableHead>Short URL</TableHead>
						<TableHead>Access Count</TableHead>
						<TableHead className="text-center">Actions</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{urls.map((url) => (
						<TableRow key={url.id}>
							<TableCell>
								<a
									href={url.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary font-medium break-words hover:underline"
								>
									{url.url}
								</a>
							</TableCell>
							<TableCell>
								<a
									href={`${baseUrl}/${url.shortCode}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-green-600 font-semibold break-words hover:underline"
								>
									{`${baseUrl}/${url.shortCode}`}
								</a>
							</TableCell>
							<TableCell>{url.accessCount}</TableCell>
							<TableCell>
								<div className="flex gap-2 justify-end">
									<Button
										variant="outline"
										size="sm"
										onClick={() => handleEdit(url)}
									>
										Edit
									</Button>
									<Button
										variant="outline"
										size="sm"
										onClick={() => onDelete(url.id)}
									>
										Delete
									</Button>
									<Button
										variant="secondary"
										size="sm"
										onClick={() =>
											navigator.clipboard.writeText(
												`${baseUrl}/${url.shortCode}`
											)
										}
									>
										Copy
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
