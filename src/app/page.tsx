import { HydrateClient } from "@/trpc/server";

export default async function Home() {
	return (
		<HydrateClient>
			<main className="flex flex-col items-center justify-center min-h-screen p-10 mt-[25vh] lg:mt-[50vh]">
			</main>
		</HydrateClient>
	);
}
