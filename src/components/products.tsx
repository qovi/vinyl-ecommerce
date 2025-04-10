import { db } from "@/server/db";
import { vinyls } from "@/server/db/schema";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsGrid() {
	const data = await db.select().from(vinyls);
	console.log(data);

	return (
		<section className="border-t">
			<h2 className="text-3xl md:text-4xl font-bold text-center p-2">
				VINYLER
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 border">
				{data.map((d) => {
					return (
						<article key={d.id} className="border-r">
							<Link key={d.id} href={`/product/${d.id}`}>
								<figure>
									<Image
										src={d.image}
										alt={d.name}
										width={500}
										height={50}
										loading="lazy"
										className="w-full object-cover"
									/>
								</figure>
							</Link>
							<div>
								<Link href={`/product/${d.id}`}>
									<h3 className="text-lg font-bold">
										{d.name}
									</h3>
								</Link>
								<p className="text-sm">{d.price}</p>
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}
