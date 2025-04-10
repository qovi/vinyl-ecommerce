import { db } from "@/server/db";
import { vinyls } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import Tracklist from "@/components/tracklist";

export default async function ProductPage({
    params,
}: {
    params: { id: string }
}) {
    const { id } = params;
    const data = await db.select().from(vinyls).where(eq(vinyls.id, parseInt(id)));

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
                    <h1 className="text-4xl font-medium border-b px-4 py-2">{product.name}</h1>
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
                {product.tracklist && product.tracklist !== '' ? (
                    <Tracklist product={product} />
                ) : (
                    <section className="px-4 py-2 border-b">
                        <h2 className="text-lg font-medium">Sporliste</h2>
                        <ul className="list-disc pl-5 space-y-1" role="list">
                            <li>Ingen sporliste tilgængelig</li>
                        </ul>
                    </section>
                )}
                {product.description && (
                    <section className="px-4 py-2 border-b">
                        <p>{product.description}</p>
                    </section>
                )}
            </article>
        </main>
    )
}