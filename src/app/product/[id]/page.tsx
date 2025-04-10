import { MessageCircleQuestionIcon } from "lucide-react";
import { vinyls } from "@/server/db/schema";
import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export default async function ProductPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;
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
					className="w-full object-cover"
				/>
			</figure>
			<article className="border-r border-b col-span-2">
				<header>
					<h1 className="text-4xl font-medium border-b px-4 py-2">
						{product.name}
					</h1>
				</header>
				<section className="px-4 py-2 border-b">
					<p className="text-xl font-medium">{product.price} kr</p>
					<p className="text-sm">Tax included</p>
				</section>
				<section className="px-4 py-2 border-b">
					<button
						className="bg-blue-700 hover:bg-blue-600 transition-colors duration-500 text-white px-5 py-2"
						aria-label="Tilføj produkt til kurv"
					>
						Tilføj til kurv
					</button>
				</section>
				<section className="px-4 py-4 border-b flex justify-center items-center group">
					<Link href="/contact" className="flex items-center">
						<MessageCircleQuestionIcon className="w-5 h-5 inline-flex mr-2 transition-transform duration-300 group-hover:translate-x-1" />
						<h2 className="text-base relative overflow-hidden">
							<span className="relative inline-block after:content-[''] after:absolute after:w-full after:h-[0.5px] after:bottom-0 after:left-0 after:bg-black after:origin-left after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100">
								Har du et spørgsmål om dette produkt?
							</span>
						</h2>
					</Link>
				</section>
				<section className="px-4 py-2 border-b">
                    <h2 className="text-2xl font-medium">BESKRIVELSE</h2>
                    <p>{product.description || "Der er ingen beskrivelse tilgængelig"}</p>
                </section>
                <section className="px-4 py-2 border-b">
                    <h2 className="text-2xl font-medium mb-4">INFORMATION</h2>
                    <dl className="space-y-4">
                        <div className="flex items-center justify-between border-b pb-2">
                            <dt className="font-medium text-gray-700">Udgivelsesdato</dt>
                            <dd className="text-gray-600">{product.release}</dd>
                        </div>
                        <div className="flex items-center justify-between border-b pb-2">
                            <dt className="font-medium text-gray-700">Media Condition</ dt>
                            <dd className="text-gray-600">{product.media_condition}</dd>
                        </div>
                        <div className="flex items-center justify-between pb-2">
                            <dt className="font-medium text-gray-700">Sleeve Condition</dt>
                            <dd className="text-gray-600">{product.sleeve_condition}</dd>
                        </div>
                    </dl>
                </section>
			</article>
		</main>
	);
}
