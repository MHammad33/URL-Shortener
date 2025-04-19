import { UrlItem } from "@/components/UrlItem";

export function UrlList({
	urls,
}: {
	urls: { shortUrl: string; longUrl: string; accesses: number }[];
}) {
	return (
		<div className="overflow-x-auto py-2">
			<table className="min-w-full bg-white dark:bg-gray-800 text-left">
				<thead>
					<tr>
						<th className="p-2">Short URL</th>
						<th className="p-2">Long URL</th>
						<th className="p-2">Accesses</th>
						<th className="p-2">Actions</th>
					</tr>
				</thead>
				<tbody>
					{urls.map((url, index) => (
						<UrlItem key={index} {...url} />
					))}
				</tbody>
			</table>
		</div>
	);
}
