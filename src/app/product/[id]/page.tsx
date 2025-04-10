import { vinyls } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import Image from "next/image";

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = (await params);
	const data = await db
		.select()
		.from(vinyls)
		.where(eq(vinyls.id, parseInt(id)));

	const product = data[0];

	if (!product) {
		return <section role="alert">Produkt ikke fundet</section>;
	}

	return (
		<main className="grid grid-cols-1 md:grid-cols-3">
			<figure className="w-full h-full border-r border-b">
				<Image
					src={product.image}
					alt={product.name}
					width={400}
					height={400}
					className="w-full h-full xl:object-cover p-4"
				/>
			</figure>
			<article className="border-r border-b col-span-2">
				<header>
					<h1 className="text-4xl font-medium border-b px-4 py-2 flex flex-col">
						{product.name}
						<span className="text-sm font-normal text-black/60">
							{product.artist}
						</span>
					</h1>
				</header>
				<section className="px-4 py-2 border-b">
					<p className="text-xl font-medium">{product.price} kr</p>
				</section>
				<section className="px-4 py-2 border-b flex items-center">
					<button
						className="bg-neutral-800 hover:bg-neutral-950 transition-colors duration-500 text-white px-8 py-4"
						aria-label="Tilføj produkt til kurv"
					>
						Tilføj til kurv
					</button>
				</section>
				{product.description && (
					<section className="px-4 py-2">
						<p className="text-sm font-normal text-black/60">
							{product.description}
						</p>
					</section>
				)}
			</article>
		</main>
	);
}
