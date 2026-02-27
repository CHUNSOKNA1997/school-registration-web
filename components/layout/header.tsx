"use client";
import Link from "next/link";
import Image from "next/image";
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

	return (
		<div className="fixed w-full top-0 z-50">
			<nav className={`relative z-10 flex items-center justify-between px-6 md:px-10 py-4 transition-colors duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-sm" : "bg-transparent"}`}>
				<Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
					<Image src="/starlight-logo.png" alt="Starlight Academy Logo" width={40} height={40} />
					<span>Starlight Academy</span>
				</Link>
				<div className="flex items-center gap-8">
					<div className="hidden md:flex items-center gap-8">
						<Link href="/" className={`text-sm transition-colors ${pathname === "/" ? "text-blue-300 font-semibold" : "text-white hover:text-blue-300"}`}>
							Home
						</Link>
						<Link href="/about" className={`text-sm transition-colors ${pathname === "/about" ? "text-blue-300 font-semibold" : "text-white hover:text-blue-300"}`}>
							About
						</Link>
						<Link href="/contact" className={`text-sm transition-colors ${pathname === "/contact" ? "text-blue-300 font-semibold" : "text-white hover:text-blue-300"}`}>
							Contact
						</Link>
					</div>
				</div>
			</nav>
			<div className={`relative z-10 h-px mx-6 md:mx-10 transition-colors duration-300 ${scrolled ? "bg-white/10" : "bg-white/20"}`} />
		</div>
	);
};

export default Header;
