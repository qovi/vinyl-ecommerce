import "@/styles/globals.css";

import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
	title: "Vinyl Ecommerce",
	description: "Vinyl Ecommerce made by @qovi",
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
					<SessionProvider>
						{children}
					</SessionProvider>
				</TRPCReactProvider>
			</body>
		</html>
	);
}
