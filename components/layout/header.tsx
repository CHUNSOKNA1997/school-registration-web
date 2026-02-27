"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	if (pathname === "/register") return null;

	return (
		<div className="fixed w-full top-0 z-50">
			<nav className={`relative z-10 flex items-center justify-between px-6 md:px-10 py-4 transition-colors duration-300 ${scrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"}`}>
				<Link href="/" className="flex items-center gap-2 text-slate-800 font-bold text-lg">
					<Image src="/starlight-logo.png" alt="Starlight Academy Logo" width={40} height={40} />
					<span>Starlight Academy</span>
				</Link>
				<div className="flex items-center gap-8">
					<div className="hidden md:flex items-center gap-8">
						<Link href="/" className={`text-sm transition-colors ${pathname === "/" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"}`}>
							Home
						</Link>
						<Link href="/about" className={`text-sm transition-colors ${pathname === "/about" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"}`}>
							About
						</Link>
						<Link href="/contact" className={`text-sm transition-colors ${pathname === "/contact" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-600"}`}>
							Contact
						</Link>
					</div>
					<Link href="/register">
						<Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer">
							Register Now
						</Button>
					</Link>
				</div>
			</nav>
			<div className="relative z-10 h-px mx-6 md:mx-10 bg-gray-200" />
		</div>
	);
};

export default Header;
