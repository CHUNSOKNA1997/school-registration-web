"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const [hasOverlayHero, setHasOverlayHero] = useState(false);
	const pathname = usePathname();
	const isFloating = hasOverlayHero && !scrolled;

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const frameId = window.requestAnimationFrame(() => {
			setHasOverlayHero(Boolean(document.querySelector('[data-header-overlay="true"]')));
		});

		return () => window.cancelAnimationFrame(frameId);
	}, [pathname]);

	if (pathname === "/register") return null;

	return (
		<div className="fixed w-full top-0 z-50">
			<nav className={`relative z-10 transition-all duration-300 ${isFloating ? "bg-transparent" : "bg-white/95 shadow-sm backdrop-blur-sm"}`}>
				<div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
					<Link href="/" className={`flex items-center gap-2 font-bold text-lg transition-colors ${isFloating ? "text-white" : "text-slate-800"}`}>
						<Image src="/starlight-logo.png" alt="Starlight Academy Logo" width={40} height={40} />
						<span>Starlight Academy</span>
					</Link>
					<div className="hidden md:flex items-center gap-8">
						<Link href="/" className={`text-sm transition-colors ${pathname === "/" ? (isFloating ? "text-white font-semibold" : "text-blue-600 font-semibold") : isFloating ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>
							Home
						</Link>
						<Link href="/about" className={`text-sm transition-colors ${pathname === "/about" ? (isFloating ? "text-white font-semibold" : "text-blue-600 font-semibold") : isFloating ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>
							About
						</Link>
						<Link href="/contact" className={`text-sm transition-colors ${pathname === "/contact" ? (isFloating ? "text-white font-semibold" : "text-blue-600 font-semibold") : isFloating ? "text-white/80 hover:text-white" : "text-slate-600 hover:text-blue-600"}`}>
							Contact
						</Link>
					</div>
				</div>
			</nav>
			{!isFloating && <div className="relative z-10 mx-auto h-px max-w-7xl bg-gray-200" />}
		</div>
	);
};

export default Header;
