import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold">404</h1>
            <p className="text-lg">Siden blev ikke fundet</p>

            <Link
                href="/"
                className="bg-black text-white px-10 py-3 rounded-full mt-4 hover:bg-neutral-900 transition-colors duration-300"
            >
                <ChevronLeft className="w-6 h-6 inline-flex rotate-360" />
                Shop videre
            </Link>
        </main>
    )
}