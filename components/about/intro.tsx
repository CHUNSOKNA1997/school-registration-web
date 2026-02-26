import Image from "next/image";

const AboutIntro = () => {
	return (
		<section className="py-16 border-b border-gray-100">
			<div className="max-w-screen-lg mx-auto px-4">
				<div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
				<div className="flex-1">
					<h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-6">
						About Starlight Academy
					</h2>
					<p className="text-slate-500 leading-relaxed mb-4">
						At Starlight Academy, we are dedicated to empowering the next generation of scholars,
						leaders, and innovators through quality education, character development, and
						forward-thinking academic programs.
					</p>
					<p className="text-slate-500 leading-relaxed">
						Our expert faculty blends rigorous academics with real-world application, equipping
						students with both the knowledge and the confidence to excel — in the classroom and beyond.
					</p>
				</div>
				<div className="flex-1 w-full rounded-2xl overflow-hidden">
					<Image
						src="/about/about.jpg"
						alt="Students at Starlight Academy"
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

export default AboutIntro;
