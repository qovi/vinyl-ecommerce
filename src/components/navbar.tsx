"use client";

import { ShoppingBag, Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useDebounce } from 'use-debounce';
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchResults from "./searchresults";

type SearchResult = {
    id: number;
    name: string;
    artist: string;
    image: string;
    price: number;
};

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery] = useDebounce(searchQuery, 300);
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResultsVisible, setIsResultsVisible] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const navLinks = [
        { href: "/", label: "Hjem" },
        { href: "/butik", label: "Butik" },
        { href: "/om-os", label: "Om os" },
        { href: "/kontakt", label: "Kontakt" },
    ];

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (debouncedQuery.length < 2) {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/search?q=${encodeURIComponent(debouncedQuery)}`);
                const data = await response.json();
                setSearchResults(data.results);
                setIsResultsVisible(true);
            } catch (error) {
                console.error("Fejl ved søgning:", error);
                setSearchResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSearchResults();
    }, [debouncedQuery]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsResultsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

                <div ref={searchRef} className="p-4 hidden md:flex flex-1 relative">
                    <div className="flex w-full items-center">
                        <Search className="h-5 w-5 text-gray-400 mr-2" />
                        <input
                            type="text"
                            placeholder="Søg efter vinyl eller kunstner"
                            className="w-full bg-transparent focus:outline-none"
                            aria-label="Søg på siden"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => {
                                if (searchResults.length > 0) {
                                    setIsResultsVisible(true);
                                }
                            }}
                        />
                        {isLoading && (
                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full" />
                            </div>
                        )}
                    </div>
                    
                    <AnimatePresence mode="wait">
                        {isResultsVisible && (
                            <SearchResults 
                                results={searchResults} 
                                isVisible={isResultsVisible} 
                                onClose={() => setIsResultsVisible(false)} 
                            />
                        )}
                    </AnimatePresence>
                </div>

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
                        <Link key={link.href} href={link.href} className="flex-1">
                            <li className={cn("p-4 hover:bg-gray-100 bg-gray-50", index > 0 && "border-l")}>
                                {link.label}
                            </li>
                        </Link>
                    ))}
                </ul>
            </nav>

            <div ref={searchRef} className="flex-1 p-4 md:hidden border-b relative">
                <div className="flex w-full items-center">
                    <Search className="h-5 w-5 text-gray-400 mr-2" />
                    <input
                        type="search"
                        placeholder="Søg efter vinyl eller kunstner"
                        className="w-full bg-transparent focus:outline-none"
                        aria-label="Søg på siden"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onFocus={() => {
                            if (searchResults.length > 0) {
                                setIsResultsVisible(true);
                            }
                        }}
                    />
                    {isLoading && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                            <div className="animate-spin h-4 w-4 border-2 border-gray-500 border-t-transparent rounded-full" />
                        </div>
                    )}
                </div>
                
                <AnimatePresence mode="wait">
                    {isResultsVisible && (
                        <SearchResults 
                            results={searchResults} 
                            isVisible={isResultsVisible} 
                            onClose={() => setIsResultsVisible(false)} 
                        />
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}
