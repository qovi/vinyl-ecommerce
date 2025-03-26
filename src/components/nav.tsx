"use client";

import { 
    MenuIcon,
    UserRound,
    ShoppingBag,
    SearchIcon,
    X,
    ChevronRight,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <div className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setMenuOpen(false)} />
            
            <div className={`fixed left-0 top-0 h-full w-full md:w-1/3 bg-white z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex justify-between items-center p-4 border-b border-neutral-950">
                    <span className="text-lg font-medium">MENU</span>
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-neutral-500 hover:text-neutral-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <nav className="flex flex-col">
                    <Link href="/" className="px-4 py-3 hover:bg-neutral-100">Home</Link>
                    <Link href="/shop" className="px-4 py-3 hover:bg-neutral-100 flex justify-between items-center">
                        Shop
                        <span className="text-neutral-950">
                            <ChevronRight className="w-4 h-4" />
                        </span>
                    </Link>
                    <Link href="/about" className="px-4 py-3 hover:bg-neutral-100">About</Link>
                    <Link href="/contact" className="px-4 py-3 hover:bg-neutral-100">Contact</Link>
                </nav>
                <div className="border-t border-neutral-950">
                    <nav className="flex flex-col text-xs">
                        <Link href="/shop/lp-vinyls" className="px-4 py-2 hover:bg-neutral-100">LP Vinyls</Link>
                        <Link href="/shop/12-inch-maxi" className="px-4 py-2 hover:bg-neutral-100">12" Maxi</Link>
                        <Link href="/shop/7-inch-singles" className="px-4 py-2 hover:bg-neutral-100">7" Singles</Link>
                        <Link href="/shop/cd-singles" className="px-4 py-2 hover:bg-neutral-100">CD Singles</Link>
                        <Link href="/shop/cd-albums" className="px-4 py-2 hover:bg-neutral-100">CD Albums</Link>
                    </nav>
                </div>
            </div>

            <header className="flex flex-col w-full">
                <div className="flex items-center justify-between h-12 border-b border-neutral-950">
                    <div 
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="flex items-center border-r border-neutral-950 h-full px-4 hover:bg-neutral-100 cursor-pointer"
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
                                className="h-8 w-full px-10 focus:outline-none"
                            />
                            <SearchIcon className="absolute left-4 w-4 h-4" />
                        </div>
                    </div>
                    <div className="flex items-center border-l border-neutral-950 h-full">
                        <Link 
                            href="/user" 
                            className="h-full flex items-center justify-center border-r border-neutral-950 px-4 hover:bg-neutral-100"
                        >
                            <UserRound className="w-5 h-5" />
                        </Link>
                        <Link 
                            href="/cart" 
                            className="h-full flex items-center justify-center px-4 hover:bg-neutral-100"
                        >
                            <ShoppingBag className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
                <nav className="hidden md:grid w-full grid-cols-4 border-b border-neutral-950">
                    <Link href="/" className="flex items-center justify-center h-12 border-r border-neutral-950 hover:bg-neutral-100">
                        Home
                    </Link>
                    <Link href="/shop" className="flex items-center justify-center h-12 border-r border-neutral-950 hover:bg-neutral-100">
                        Shop
                    </Link>
                    <Link href="/about" className="flex items-center justify-center h-12 border-r border-neutral-950 hover:bg-neutral-100">
                        About
                    </Link>
                    <Link href="/contact" className="flex items-center justify-center h-12 hover:bg-neutral-100">
                        Contact
                    </Link>
                </nav>
                <div className="md:hidden relative flex items-center w-full border-b border-neutral-950 p-2">
                    <input
                        type="text"
                        placeholder="Søg efter titel eller artist"
                        className="h-8 w-full px-8 focus:outline-none"
                    />
                    <SearchIcon className="absolute left-4 w-4 h-4" />
                </div>

                <div className="flex items-center justify-between absolute top-1/10 left-0 right-0 lg:h-full h-1/2">
                    <Image
                        src={"/vinyl-background.jpg"}
                        alt="vinyl"
                        fill
                        className="w-full h-1/4 object-cover"
                        priority
                    />
                </div>
            </header>  
        </>
    );
}