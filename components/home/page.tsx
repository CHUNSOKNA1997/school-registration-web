import { Button } from "@/components/ui/button";

const Home = () => {
	return (
		<div className="relative flex flex-col" style={{ minHeight: "calc(100vh - 65px)" }}>
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
				<Button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-6 text-base rounded-xl font-bold cursor-pointer">
					Start Your Application
				</Button>
			</div>
		</div>
	);
};

export default Home;