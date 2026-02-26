import Link from "next/link";

const Footer = () => {

	const date = new Date();
	const year = date.getFullYear();

	return (
		<footer className="relative z-10">
			<div className="h-px bg-white/20 mx-6 md:mx-10" />
			<div className="flex flex-col items-center py-6 gap-3">
				<div className="flex flex-col md:flex-row items-center gap-3 md:gap-8">
					<Link href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
						Privacy Policy
					</Link>
					<Link href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
						Terms of Service
					</Link>
				</div>
				<p className="text-white/60 text-sm text-center px-4">© {year} Starlight Academy. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
