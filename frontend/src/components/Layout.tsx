import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { useDarkMode } from "./hooks/useDarkMode";

export function Layout({ children }: { children: ReactNode }) {
	const [isDark, setIsDark] = useDarkMode();

	return (
		<div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<header className="p-4 flex justify-between items-center">
				<h1 className="text-2xl font-bold">URL Shortener</h1>
				<Button onClick={() => setIsDark(!isDark)} variant="outline">
					{isDark ? "Light Mode" : "Dark Mode"}
				</Button>
			</header>
			<main className="px-16 py-8">{children}</main>
			<footer className="p-4 text-center">
				<p>&copy; 2025 URL Shortener</p>
			</footer>
		</div>
	);
}
