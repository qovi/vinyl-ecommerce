import { HydrateClient } from "@/trpc/server";
import Image from "next/image";

export default async function Home() {
	return (
		<HydrateClient>
			<main>
				<div className="relative w-screen lg:min-h-screen min-h-96">
					<Image
						src={"/vinyl-background.jpg"}
						alt="vinyl"
						fill
						className="w-full h-1/4 object-cover border-0"
						priority
					/>
				</div>
			</main>
		</HydrateClient>
	);
}
