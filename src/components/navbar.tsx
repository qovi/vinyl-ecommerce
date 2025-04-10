"use client";

import { ShoppingBag, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Hjem" },
        { href: "/butik", label: "Butik" },
        { href: "/om-os", label: "Om os" },
        { href: "/kontakt", label: "Kontakt" },
    ];

    return (
        <header className="w-full bg-white border-t">
            <AnimatePresence mode="wait">
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/35 z-40"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Menu overlay"
                    />
                )}
            </AnimatePresence>

            <div className="flex justify-between items-center border-b md:flex-row-reverse">
                <button
                    className="p-4 border-r cursor-pointer hover:bg-gray-100 md:hidden"
                    aria-label="Åbn menu"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-expanded={isMenuOpen}
                    aria-controls="mobile-menu"
                >
                    <Menu className="h-6 w-6" aria-hidden="true" />
                </button>

                <form role="search" className="p-4 hidden md:flex flex-1">
                    <input
                        type="search"
                        placeholder="Søg"
                        className="w-full bg-transparent focus:outline-none"
                        aria-label="Søg på siden"
                    />
                </form>

                <div className="flex items-center">
                    <Link href={"/cart"} className="p-4 md:border-r border-l flex items-center justify-center hover:bg-gray-100" aria-label="Indkøbskurv">
                        <ShoppingBag className="h-6 w-6" aria-hidden="true" />
                    </Link>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {isMenuOpen && (
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-110%" }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className="fixed top-0 left-0 w-full h-full bg-white z-50 md:w-1/3 md:left-5 md:top-5 md:h-[calc(100%-2.5rem)] overflow-y-auto"
                        id="mobile-menu"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex justify-between items-center border-b">
                                <span className="p-4">MENU</span>
                                <button
                                    className="p-4"
                                    onClick={() => setIsMenuOpen(false)}
                                    aria-label="Luk menu"
                                >
                                    <X className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            <nav className="flex-1 mt-4 overflow-hidden" aria-label="Mobil navigation">
                                <ul>
                                    {navLinks.map((link) => (
                                        <li key={link.href}>
                                            <Link
                                                href={link.href}
                                                className="flex justify-between items-center px-4 py-2"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="border-b w-full hidden md:block" aria-label="Hovednavigation">
                <ul className="flex text-center">
                    {navLinks.map((link, index) => (
                        <li key={link.href} className={cn("flex-1 p-4 hover:bg-gray-100", index > 0 && "border-l")}>
                            <Link href={link.href} className="block">
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <form role="search" className="flex-1 p-4 md:hidden border-b">
                <input
                    type="search"
                    placeholder="Søg"
                    className="w-full bg-transparent focus:outline-none"
                    aria-label="Søg på siden"
                />
            </form>
        </header>
    );
}
