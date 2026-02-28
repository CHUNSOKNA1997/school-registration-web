import Link from "next/link";
import { Button } from "@/components/ui/button";

const Home = () => {
	const year = new Date().getFullYear();

	return (
		<div data-header-overlay="true" className="relative flex flex-col h-screen">
			{/* Background Image with Overlay */}
			<div
				className="absolute inset-0 bg-cover bg-center bg-no-repeat"
				style={{ backgroundImage: "url('/hero-section.jpeg')" }}
			>
				<div className="absolute inset-0 bg-slate-900/60" />
			</div>

			{/* Hero Content */}
			<div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 py-24">
				<h1 className="text-6xl font-extrabold text-white mb-6 max-w-4xl leading-tight">
					Begin Your Journey Here
				</h1>
				<p className="text-base text-white/90 mb-10 max-w-lg leading-relaxed">
					Register now to start your application and join our community of learners. Your future awaits.
				</p>
				<Link href="/register">
					<Button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-6 text-base rounded-xl font-bold cursor-pointer">
						Start Your Application
					</Button>
				</Link>
			</div>

			{/* Footer inside hero */}
			<div className="relative z-10 pb-6">
				<div className="h-px bg-white/20 mx-6 md:mx-10 mb-5" />
				<div className="flex flex-col items-center gap-2">
					<div className="flex gap-8">
						<Link href="/privacy" className="text-white/70 hover:text-white transition-colors text-sm">
							Privacy Policy
						</Link>
						<Link href="/terms" className="text-white/70 hover:text-white transition-colors text-sm">
							Terms of Service
						</Link>
					</div>
					<p className="text-white/60 text-sm">© {year} Starlight Academy. All Rights Reserved.</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
