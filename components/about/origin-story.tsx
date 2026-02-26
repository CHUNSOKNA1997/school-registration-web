import Image from "next/image";

const OriginStory = () => {
	return (
		<section className="py-16 border-b border-gray-100">
			<div className="max-w-screen-lg mx-auto px-4">
				<div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
				<div className="flex-1">
					<h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">Our Story</h2>
					<p className="text-slate-500 leading-relaxed mb-4">
						Starlight Academy was founded in 1999 from a simple belief: that every child deserves a
						world-class education regardless of background. A small group of passionate educators
						came together with one shared vision — to build a school that truly puts students first.
					</p>
					<p className="text-slate-500 leading-relaxed">
						Over 25 years, we have grown from a single campus into a thriving institution of 5,000+
						students, continuously evolving our programs to meet the demands of a rapidly changing
						world — while staying true to our founding values.
					</p>
				</div>
				<div className="flex-1 w-full rounded-2xl overflow-hidden">
					<Image
						src="/about/our-story.jpg"
						alt="Starlight Academy story"
						width={700}
						height={460}
						className="w-full object-cover rounded-2xl"
					/>
				</div>
			</div>
			</div>
		</section>
	);
};

export default OriginStory;
