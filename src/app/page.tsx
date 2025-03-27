import { db } from "@/server/db";
import { HydrateClient } from "@/trpc/server";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
	const records = await db.query.record.findMany();

	return (
		<HydrateClient>
			<main>
				<div className="relative w-screen lg:min-h-screen min-h-96">
					<Image
						src={"/vinyl-background.jpg"}
						alt="vinyl"
						fill
						className="w-full h-1/4 object-cover border-b border-black"
						priority
					/>
				</div>

				<div className="flex items-center justify-center border border-black">
					<h1 className="text-4xl font-semibold text-black">VINYLS</h1>
				</div>
				
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
					{records
						// .sort((a, b) => (a.createdAt?.getTime() ?? 0) - (b.createdAt?.getTime() ?? 0))
						.map((record) => (
						<Link
							key={record.id}
							href={`/products/${record.id}`}
							className="flex flex-col border-r border-b border-black"
						>
							<div className="aspect-square relative">
								<Image
									src={record.cover}
									alt={record.title}
									fill
									className="object-cover"
								/>
							</div>
							<div className="mt-2 p-2">
								<h3 className="font-medium">{record.title}</h3>
								<p className="text-sm text-gray-600">{record.artist}</p>
								<p className="mt-1 font-medium">{record.price} kr</p>
							</div>
						</Link>
					))}
				</div>
			</main>
		</HydrateClient>
	);
}
