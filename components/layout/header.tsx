"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

const Header = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		<div className="fixed w-full top-0 z-50">
			<nav className={`relative z-10 flex items-center justify-between px-6 md:px-10 py-4 transition-colors duration-300 ${scrolled ? "bg-slate-900/80 backdrop-blur-sm" : "bg-transparent"}`}>
				<div className="flex items-center gap-2 text-white font-bold text-lg">
					<Image src="/starlight-logo.png" alt="Starlight Academy Logo" width={40} height={40} />
					<span>Starlight Academy</span>
				</div>
				<div className="flex items-center gap-8">
					{/* Nav links hidden on mobile */}
					<div className="hidden md:flex items-center gap-8">
						<Link href="/" className="text-white text-sm hover:text-blue-300 transition-colors">
							Home
						</Link>
						<Link href="/about" className="text-white text-sm hover:text-blue-300 transition-colors">
							About
						</Link>
						<Link href="/contact" className="text-white text-sm hover:text-blue-300 transition-colors">
							Contact
						</Link>
					</div>
					<Button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold cursor-pointer">
						Register Now
					</Button>
				</div>
			</nav>
			<div className={`relative z-10 h-px mx-6 md:mx-10 transition-colors duration-300 ${scrolled ? "bg-white/10" : "bg-white/20"}`} />
		</div>
	);
};

export default Header;
