import "@/styles/globals.css";

import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

import Navbar from "@/components/nav";

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
		<html lang="da">
			<body>
				<TRPCReactProvider>
					<Navbar />
					{children}
				</TRPCReactProvider>
			</body>
		</html>
	);
}
