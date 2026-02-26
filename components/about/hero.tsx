import Image from "next/image";

const AboutHero = () => {
	return (
		<section className="px-6 md:px-24 py-16 border-b border-gray-100">
			<p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-3">Our Team</p>
			<h1 className="text-3xl md:text-4xl font-extrabold text-slate-800 mb-10 max-w-xl leading-snug">
				Meet the team behind Starlight Academy
			</h1>
			<div className="w-full rounded-2xl overflow-hidden">
				<Image
					src="/hero-section.jpeg"
					alt="Starlight Academy campus"
					width={1400}
					height={600}
					className="w-full object-cover max-h-[420px]"
				/>
			</div>
		</section>
	);
};

export default AboutHero;
