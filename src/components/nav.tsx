"use client";

import { 
    MenuIcon,
    UserRound,
    SearchIcon,
    X,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Cart from "./cart";
import { ModeToggle } from "./mode-toggle";
import { useTheme } from "next-themes";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();

    return (
        <>
            <header className="flex flex-col w-full">
            <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuOpen(false)} />
            
            <div className={`fixed left-0 top-0 h-full w-full md:w-1/3 bg-neutral-950 z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-white">
                    <span className="text-lg font-medium text-white">MENU</span>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-neutral-400 hover:text-neutral-200">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex flex-col">
                    <Link href="/" className="px-4 py-3 hover:bg-neutral-900 text-white">Home</Link>
                    <Link href="/shop" className="px-4 py-3 hover:bg-neutral-900 flex justify-between items-center text-white">
                        Shop
                        <span className="text-white">
                            <ChevronRight className="w-4 h-4" />
                        </span>
                    </Link>
                    <Link href="/about" className="px-4 py-3 hover:bg-neutral-900 text-white">About</Link>
                    <Link href="/contact" className="px-4 py-3 hover:bg-neutral-900 text-white">Contact</Link>
                </nav>
                <div className="border-t border-white">
                    <nav className="flex flex-col text-xs">
                        <Link href="/shop/lp-vinyls" className="px-4 py-2 hover:bg-neutral-900 text-white">LP Vinyls</Link>
                        <Link href="/shop/12-inch-maxi" className="px-4 py-2 hover:bg-neutral-900 text-white">12" Maxi</Link>
                        <Link href="/shop/7-inch-singles" className="px-4 py-2 hover:bg-neutral-900 text-white">7" Singles</Link>
                        <Link href="/shop/cd-singles" className="px-4 py-2 hover:bg-neutral-900 text-white">CD Singles</Link>
                        <Link href="/shop/cd-albums" className="px-4 py-2 hover:bg-neutral-900 text-white">CD Albums</Link>
                    </nav>
                </div>
            </div>
            <div className="flex items-center justify-between h-12 border-b dark:border-neutral-800 border-black">
                    <div 
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center border-r dark:border-neutral-800 border-black h-full px-4 dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer"
                    >
                        <div className="h-full w-full flex items-center justify-center">
                            <MenuIcon className="w-5 h-5" />
                        </div>
                    </div>
                    <div className="hidden md:flex items-center h-full w-full">
                        <div className="relative flex items-center w-full">
                            <input
                                type="text"
                                placeholder="Søg efter titel eller artist"
                                className="h-8 w-full px-10 focus:outline-none black:bg-neutral-950 dark:text-white placeholder:text-neutral-400"
                            />
                            <SearchIcon className="absolute left-4 w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-center border-l dark:border-neutral-800 border-black h-full">
                        <Link 
                            href="/user" 
                            className="h-full flex items-center justify-center border-r dark:border-neutral-800 border-black px-4 dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer"
                        >
                            <UserRound className="w-5 h-5" />
                        </Link>
                        <div className="h-full w-16 flex items-center justify-center border-r dark:border-neutral-800 border-black px-4 dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer">
                            <Cart />
                        </div>
                        <div 
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="h-full w-16 flex items-center justify-center px-4 dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer"
                        >
                            <ModeToggle />
                        </div>
                    </div>
                </div>
                <nav className="hidden md:grid w-full grid-cols-4 border-b dark:border-neutral-800 border-black">
                    <Link href="/" className="flex items-center justify-center h-12 border-r dark:border-neutral-800 border-black dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer">
                        Home
                    </Link>
                    <Link href="/shop" className="flex items-center justify-center h-12 border-r dark:border-neutral-800 border-black dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer">
                        Shop
                    </Link>
                    <Link href="/about" className="flex items-center justify-center h-12 border-r dark:border-neutral-800 border-black dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer">
                        About
                    </Link>
                    <Link href="/contact" className="flex items-center justify-center h-12 dark:hover:bg-neutral-900 hover:bg-neutral-100 cursor-pointer">
                        Contact
                    </Link>
                </nav>
                <div className="md:hidden relative flex items-center w-full border-b dark:border-neutral-800 p-2">
                    <input
                        type="text"
                        placeholder="Søg efter titel eller artist"
                        className="h-8 w-full px-8 focus:outline-none dark:bg-neutral-950 dark:text-white placeholder:text-neutral-400"
                    />
                    <SearchIcon className="absolute left-4 w-4 h-4" />
                </div>
            </header>  
        </>
    );
}