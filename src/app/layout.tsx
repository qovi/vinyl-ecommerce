import "@/styles/globals.css";

import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

import Navbar from "@/components/nav";
import { ThemeProvider } from "@/providers/theme-provider";

export const metadata: Metadata = {
	title: "Vinyl | Brorbrun's Vinyl Butik",
	description: "Brorbrun's Vinyl Butik",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="da" suppressHydrationWarning>
			<body className="dark:bg-neutral-900 bg-neutral-50">
				<TRPCReactProvider>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						<Navbar />
						{children}
					</ThemeProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
