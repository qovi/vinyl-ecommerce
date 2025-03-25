import { HydrateClient } from "@/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex flex-col items-center justify-center h-screen">
			</main>
		</HydrateClient>
	);
}
