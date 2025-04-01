import { HydrateClient } from "@/trpc/server";

export default function Home() {
  return (
    <HydrateClient>
      <main className="w-screen h-screen p-4 md:p-8 text-neutral-900"></main>
    </HydrateClient>
  )
}