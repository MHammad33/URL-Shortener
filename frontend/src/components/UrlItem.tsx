import { Button } from "@/components/ui/button";

export function UrlItem({
	shortUrl,
	longUrl,
	accesses,
}: {
	shortUrl: string;
	longUrl: string;
	accesses: number;
}) {
	return (
		<tr>
			<td className="p-2">
				<a
					href={shortUrl}
					className="text-blue-500"
					target="_blank"
					rel="noopener noreferrer"
				>
					{shortUrl}
				</a>
			</td>
			<td className="p-2">{longUrl}</td>
			<td className="p-2">{accesses}</td>
			<td className="p-2">
				<Button variant="outline" size="sm">
					Edit
				</Button>
				<Button variant="outline" size="sm" className="ml-2">
					Delete
				</Button>
			</td>
		</tr>
	);
}
