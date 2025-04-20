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
} from "@/components/ui/table";
import { toast } from "sonner";

interface UrlListProps {
	urls: UrlItem[];
	onDelete: (id: string) => void;
	onEdit: (id: string, updatedUrl: string) => void;
}

const baseUrl = "http://localhost:3000";

export function UrlList({ urls, onDelete, onEdit }: UrlListProps) {
	const [editingUrl, setEditingUrl] = useState<UrlItem | null>(null);

	const handleEdit = (url: UrlItem) => {
		setEditingUrl(url);
	};

	const handleSave = (urlId: string, updatedUrl: string) => {
		console.log("Saving updated URL", updatedUrl);
		onEdit(urlId, updatedUrl);
		setEditingUrl(null);
	};

	const handleCancel = () => {
		setEditingUrl(null);
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
									href={url.originalUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="text-primary font-medium break-words hover:underline"
								>
									{url.originalUrl}
								</a>
							</TableCell>
							<TableCell>
								<a
									href={`${baseUrl}/${url.shortUrl}`}
									target="_blank"
									rel="noopener noreferrer"
									className="text-green-600 font-semibold break-words hover:underline"
								>
									{`${baseUrl}/${url.shortUrl}`}
								</a>
							</TableCell>
							<TableCell>{url.accessCount}</TableCell>
							<TableCell>
								<div className="flex gap-2 justify-end">
									<Button
										className="cursor-pointer"
										variant="outline"
										size="sm"
										onClick={() => handleEdit(url)}
									>
										Edit
									</Button>
									<Button
										className="cursor-pointer"
										variant="outline"
										size="sm"
										onClick={() => {
											toast("Are you sure you want to delete this URL?", {
												action: {
													label: "Delete",
													onClick: () => onDelete(url.id),
												},
												cancel: {
													label: "Cancel",
													onClick: () => console.log("Delete action canceled"),
												},
											});
										}}
									>
										Delete
									</Button>
									<Button
										className="cursor-pointer"
										variant="secondary"
										size="sm"
										onClick={() => {
											navigator.clipboard.writeText(
												`${baseUrl}/${url.shortUrl}`
											);
											toast.message("Link copied to clipboard!");
										}}
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
