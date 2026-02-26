const ContactBanner = () => {
	return (
		<div
			className="relative flex flex-col items-center justify-center text-center h-[345px] -mt-[65px] pt-[100px] bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: "url('/hero-section.jpeg')" }}
		>
			<div className="absolute inset-0 bg-slate-900/65" />
			<div className="relative z-10 px-4">
				<p className="text-sm font-semibold text-white/60 uppercase tracking-widest mb-3">Get in Touch</p>
				<h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">Contact Us</h1>
				<p className="mt-4 text-white/80 text-base max-w-xl mx-auto">
					We'd love to hear from you. Reach out and our team will get back to you shortly.
				</p>
			</div>
		</div>
	);
};

export default ContactBanner;
