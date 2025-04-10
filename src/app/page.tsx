import { HydrateClient } from "@/trpc/server";
import ProductsGrid from "@/components/products";
import Image from "next/image";

export default function Home() {
  return (
    <HydrateClient>
      <main className="w-screen h-screen text-neutral-900">
        <Image
          src={"/vinyl_background.jpg"}
          alt="vinyl background"
          width={1000}
          height={1000}
          className="w-full h-1/2 md:h-full object-cover"
        />
        <ProductsGrid />
      </main>
    </HydrateClient>
  )
}