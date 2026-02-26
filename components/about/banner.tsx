const AboutBanner = () => {
	return (
		<div className="relative flex flex-col items-center justify-center text-center h-[320px] bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: "url('/about/about.jpg')" }}
		>
			<div className="absolute inset-0 bg-slate-900/65" />
			<div className="relative z-10 px-4">
				<p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Welcome to</p>
				<h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
					Starlight Academy
				</h1>
				<p className="mt-4 text-white/80 text-base max-w-xl mx-auto">
					Empowering students to reach their full potential through quality education and community.
				</p>
			</div>
		</div>
	);
};

export default AboutBanner;
