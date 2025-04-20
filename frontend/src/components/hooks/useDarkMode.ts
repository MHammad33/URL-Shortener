import { useState, useEffect } from "react";

export function useDarkMode() {
	const [isDark, setIsDark] = useState<boolean>(() => {
		// Check localStorage for dark mode preference
		const savedMode = localStorage.getItem("darkMode");
		return savedMode ? JSON.parse(savedMode) : false;
	});

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("darkMode", "true");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("darkMode", "false");
		}
	}, [isDark]);

	return [isDark, setIsDark] as const;
}
